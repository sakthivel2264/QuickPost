import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GENERATIVE_AI_API_KEY;
if (!apiKey) {
  throw new Error('Generative AI API key is not defined');
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await model.generateContentStream(prompt);

    // Create a ReadableStream to stream the content back to the client
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText)); // Stream each chunk
          }
          controller.close(); // Close the stream when done
        } catch (error) {
          console.error('Error in stream:', error);
          controller.error(error); // Close the stream with an error
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: 'Failed to generate AI content' }, { status: 500 });
  }
}
