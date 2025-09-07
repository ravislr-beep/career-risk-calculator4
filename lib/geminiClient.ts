// lib/geminiClient.ts
import { GoogleGenerativeAI, GenerateContentRequest } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

// Initialize the client
export const geminiClient = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Helper function to generate text using the AI
export async function generateText(prompt: string) {
  const request: GenerateContentRequest = {
    model: "text-bison-001", // official model name
    input: prompt,
  };

  const response = await geminiClient.generateContent(request);
  return response.output[0].content[0].text; // extract the generated text
}
