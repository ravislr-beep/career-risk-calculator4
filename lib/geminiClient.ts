// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY environment variable not set.");
}

// Fix: pass apiKey as string, not object
export const geminiGenerate = new GoogleGenerativeAI(apiKey);
