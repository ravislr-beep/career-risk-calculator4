// lib/geminiClient.ts
import { GoogleGenerativeAI, GenerateTextRequest } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

// Initialize the client once
export const geminiClient = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Optional helper function to call the model
export async function generateText(prompt: string) {
  const request: GenerateTextRequest = {
    model: "text-bison-001", // model name
    prompt,
  };

  const response = await geminiClient.generateText(request);
  return response.outputText;
}
