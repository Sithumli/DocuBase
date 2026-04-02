import type { ChatRole } from './constants';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  error?: string;
  details?: string;
}

export interface VectorMetadata {
  title: string;
  section: string;
  url: string;
  collection: string;
  description?: string;
}

export interface VectorSearchResult {
  id: string;
  score: number;
  metadata: VectorMetadata;
}

export interface ChatContext {
  content: string;
  title: string;
  section: string;
  url: string;
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ContentChunk {
  id: string;
  content: string;
  metadata: VectorMetadata;
}

export interface Frontmatter {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ChunkSection {
  section: string;
  content: string;
}

export interface IndexManifest {
  [id: string]: string;
}
