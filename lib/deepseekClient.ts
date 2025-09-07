// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY; // make sure you set this in Netlify environment variables
if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Define the request type
export interface GeminiRequest {
  prompt: string;
}

// Main helper function
export async function geminiGenerate(request: GeminiRequest): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(request.prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate content with Gemini");
  }
}
