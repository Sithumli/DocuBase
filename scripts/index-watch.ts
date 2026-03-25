import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Index } from '@upstash/vector';
import type { Frontmatter, ChunkSection, VectorMetadata } from '../template/src/types/chat';
import { INDEXING } from '../template/src/types/constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'template', 'src', 'content');

let vectorIndex: Index;
const debounceTimers = new Map<string, NodeJS.Timeout>();

function getUrlFromPath(filePath: string): string {
  const relativePath = path.relative(contentDir, filePath);
  const parts = relativePath.split(path.sep);
  const collection = parts[0];

  let urlPath = parts.slice(1).join('/');
  urlPath = urlPath.replace(/\/index\.(mdx?|md)$/, '').replace(/\.(mdx?|md)$/, '');

  if (!urlPath) {
    return `/${collection}`;
  }

  return `/${collection}/${urlPath}`;
}

function getCollection(filePath: string): string {
  const relativePath = path.relative(contentDir, filePath);
  return relativePath.split(path.sep)[0];
}

function chunkByHeadings(content: string, frontmatter: Frontmatter): ChunkSection[] {
  const chunks: ChunkSection[] = [];
  const lines = content.split('\n');

  let currentSection = frontmatter.title || 'Introduction';
  let currentContent: string[] = [];

  const contextPrefix = frontmatter.description
    ? `Document: ${frontmatter.title}\nDescription: ${frontmatter.description}\n\n`
    : `Document: ${frontmatter.title}\n\n`;

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      if (currentContent.length > 0) {
        const text = currentContent.join('\n').trim();
        if (text.length > INDEXING.MIN_CHUNK_LENGTH) {
          chunks.push({
            section: currentSection,
            content: contextPrefix + `Section: ${currentSection}\n\n` + text,
          });
        }
      }
      currentSection = h2Match[1];
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    const text = currentContent.join('\n').trim();
    if (text.length > INDEXING.MIN_CHUNK_LENGTH) {
      chunks.push({
        section: currentSection,
        content: contextPrefix + `Section: ${currentSection}\n\n` + text,
      });
    }
  }

  if (chunks.length === 0 && content.trim().length > INDEXING.MIN_CHUNK_LENGTH) {
    chunks.push({
      section: currentSection,
      content: contextPrefix + content.trim(),
    });
  }

  return chunks;
}

function stripMdxComponents(content: string): string {
  content = content.replace(/^import\s+.+from\s+['"].+['"];?\s*$/gm, '');
  content = content.replace(/<[A-Z][a-zA-Z]*[^>]*>/g, '');
  content = content.replace(/<\/[A-Z][a-zA-Z]*>/g, '');
  content = content.replace(/```[\s\S]*?```/g, '[code example]');
  content = content.replace(/\n{3,}/g, '\n\n');

  return content.trim();
}

async function indexFile(filePath: string): Promise<void> {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  const cleanContent = stripMdxComponents(content);
  const url = getUrlFromPath(filePath);
  const collection = getCollection(filePath);
  const title = (frontmatter.title as string) || path.basename(filePath, path.extname(filePath));

  const chunks = chunkByHeadings(cleanContent, frontmatter as Frontmatter);

  const vectors = chunks.map((chunk, index) => ({
    id: `${url}-${index}`,
    data: chunk.content,
    metadata: {
      title,
      section: chunk.section,
      url,
      collection,
      description: frontmatter.description as string | undefined,
    } as VectorMetadata,
  }));

  if (vectors.length > 0) {
    await vectorIndex.upsert(vectors);
  }

  console.log(`[${new Date().toLocaleTimeString()}] Indexed: ${path.relative(contentDir, filePath)} (${vectors.length} chunks)`);
}

async function deleteFileFromIndex(filePath: string): Promise<void> {
  const url = getUrlFromPath(filePath);

  for (let i = 0; i < 20; i++) {
    try {
      await vectorIndex.delete(`${url}-${i}`);
    } catch {
      break;
    }
  }

  console.log(`[${new Date().toLocaleTimeString()}] Removed from index: ${path.relative(contentDir, filePath)}`);
}

function handleFileChange(filePath: string, eventType: string): void {
  if (!filePath.endsWith('.mdx') && !filePath.endsWith('.md')) return;

  const existingTimer = debounceTimers.get(filePath);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(async () => {
    debounceTimers.delete(filePath);

    try {
      if (eventType === 'rename' && !fs.existsSync(filePath)) {
        await deleteFileFromIndex(filePath);
      } else {
        await indexFile(filePath);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }, INDEXING.DEBOUNCE_MS);

  debounceTimers.set(filePath, timer);
}

function watchDirectory(dir: string): void {
  if (!fs.existsSync(dir)) return;

  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    const filePath = path.join(dir, filename);
    handleFileChange(filePath, eventType);
  });
}

async function main(): Promise<void> {
  console.log('Starting content index watcher...\n');

  if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
    console.error('Error: Upstash Vector credentials are not set');
    process.exit(1);
  }

  vectorIndex = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  const collections = INDEXING.COLLECTIONS;

  for (const collection of collections) {
    const collectionDir = path.join(contentDir, collection);
    watchDirectory(collectionDir);
    console.log(`Watching: ${collection}/`);
  }

  console.log('\nWaiting for file changes... (Ctrl+C to stop)\n');

  process.on('SIGINT', () => {
    console.log('\nStopping watcher...');
    process.exit(0);
  });
}

main().catch(console.error);
