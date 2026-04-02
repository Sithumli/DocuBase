import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Index } from '@upstash/vector';
import type { ContentChunk, Frontmatter, ChunkSection, IndexManifest } from '../template/src/types/chat';
import { INDEXING } from '../template/src/types/constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'template', 'src', 'content');
const manifestPath = path.join(rootDir, '.index-manifest.json');

let vectorIndex: Index;

function loadManifest(): IndexManifest {
  if (fs.existsSync(manifestPath)) {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  }
  return {};
}

function saveManifest(manifest: IndexManifest): void {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

function hashContent(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];

  function walkDir(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  if (fs.existsSync(dir)) {
    walkDir(dir);
  }
  return files;
}

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

async function processFile(filePath: string): Promise<ContentChunk[]> {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  const cleanContent = stripMdxComponents(content);
  const url = getUrlFromPath(filePath);
  const collection = getCollection(filePath);
  const title = (frontmatter.title as string) || path.basename(filePath, path.extname(filePath));

  const chunks = chunkByHeadings(cleanContent, frontmatter as Frontmatter);

  return chunks.map((chunk, index) => ({
    id: `${url}-${index}`,
    content: chunk.content,
    metadata: {
      title,
      section: chunk.section,
      url,
      collection,
      description: frontmatter.description as string | undefined,
    },
  }));
}

async function main() {
  console.log('Starting content indexing...\n');

  if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
    console.error('Error: Upstash Vector credentials are not set');
    console.error('Make sure you have a .env file with UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN');
    process.exit(1);
  }

  vectorIndex = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  const manifest = loadManifest();
  const newManifest: IndexManifest = {};

  const collections = INDEXING.COLLECTIONS;
  const allFiles: string[] = [];

  for (const collection of collections) {
    const collectionDir = path.join(contentDir, collection);
    const files = getAllMdxFiles(collectionDir);
    allFiles.push(...files);
    console.log(`Found ${files.length} files in ${collection}/`);
  }

  console.log(`\nTotal files to process: ${allFiles.length}\n`);

  const allChunks: ContentChunk[] = [];
  const changedChunks: ContentChunk[] = [];

  for (const file of allFiles) {
    const chunks = await processFile(file);
    allChunks.push(...chunks);

    for (const chunk of chunks) {
      const hash = hashContent(chunk.content);
      newManifest[chunk.id] = hash;

      if (manifest[chunk.id] !== hash) {
        changedChunks.push(chunk);
      }
    }

    console.log(`Processed: ${path.relative(contentDir, file)} (${chunks.length} chunks)`);
  }

  const deletedIds = Object.keys(manifest).filter((id) => !newManifest[id]);

  console.log(`\nTotal chunks: ${allChunks.length}`);
  console.log(`Changed/New: ${changedChunks.length}`);
  console.log(`Deleted: ${deletedIds.length}\n`);

  if (changedChunks.length === 0 && deletedIds.length === 0) {
    console.log('No changes detected. Skipping upload.\n');
    return;
  }

  if (deletedIds.length > 0) {
    console.log('Removing deleted content...');
    for (const id of deletedIds) {
      await vectorIndex.delete(id);
    }
    console.log(`Removed ${deletedIds.length} vectors\n`);
  }

  if (changedChunks.length > 0) {
    console.log('Uploading changed content...\n');

    for (let i = 0; i < changedChunks.length; i += INDEXING.BATCH_SIZE) {
      const batch = changedChunks.slice(i, i + INDEXING.BATCH_SIZE);

      const vectors = batch.map((chunk) => ({
        id: chunk.id,
        data: chunk.content,
        metadata: chunk.metadata as unknown as Record<string, unknown>,
      }));

      await vectorIndex.upsert(vectors);
      console.log(`Uploaded batch ${Math.floor(i / INDEXING.BATCH_SIZE) + 1}/${Math.ceil(changedChunks.length / INDEXING.BATCH_SIZE)}`);

      if (i + INDEXING.BATCH_SIZE < changedChunks.length) {
        await new Promise((resolve) => setTimeout(resolve, INDEXING.BATCH_DELAY_MS));
      }
    }
  }

  saveManifest(newManifest);
  console.log('\nContent indexing complete!');
}

main().catch(console.error);
