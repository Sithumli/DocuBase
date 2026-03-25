import type { APIRoute } from 'astro';
import { Index } from '@upstash/vector';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatContext, VectorMetadata, GeminiMessage } from '@/types/chat';
import { CHAT, SITE_TITLE } from '@/types/constants';

export const prerender = false;

const vectorIndex = new Index({
  url: import.meta.env.UPSTASH_VECTOR_REST_URL,
  token: import.meta.env.UPSTASH_VECTOR_REST_TOKEN,
});

async function searchSimilarContent(query: string, topK: number = CHAT.VECTOR_TOP_K): Promise<ChatContext[]> {
  const results = await vectorIndex.query({
    data: query,
    topK,
    includeMetadata: true,
    includeData: true,
  });

  return results.map((result) => {
    const metadata = result.metadata as VectorMetadata;
    return {
      content: `Title: ${metadata.title}\nSection: ${metadata.section}\nURL: ${metadata.url}`,
      title: metadata.title,
      section: metadata.section,
      url: metadata.url,
    };
  });
}

function buildSystemPrompt(contexts: ChatContext[]): string {
  const contextText = contexts
    .map((ctx, i) => `[${i + 1}] ${ctx.title} - ${ctx.section}\nURL: ${ctx.url}`)
    .join('\n\n');

  return `You are a helpful documentation assistant for ${SITE_TITLE}, a documentation template built with Astro.
Your role is to answer questions based on the documentation content provided.

Guidelines:
- Be concise and helpful
- Reference specific documentation sections when relevant
- If the answer isn't in the provided context, say so honestly
- Include relevant URLs when they would be helpful
- Format responses using markdown for readability
- For code examples, use proper code blocks with language tags

Relevant documentation sections:
${contextText}

Answer the user's question based on the above context. If the question cannot be answered from the provided context, let them know and suggest they check the documentation directly.`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({
        error: 'GOOGLE_GENERATIVE_AI_API_KEY is not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contexts = await searchSimilarContent(message);
    const systemPrompt = buildSystemPrompt(contexts);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: CHAT.MODEL,
      systemInstruction: systemPrompt,
    });

    const chatHistory: GeminiMessage[] = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
            }
          }
          controller.close();
        } catch (streamError) {
          console.error('Stream error:', streamError);
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred processing your request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
