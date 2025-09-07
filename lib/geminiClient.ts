// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY environment variable not set.");
}

export const geminiGenerate = new GoogleGenerativeAI({
  apiKey
});
