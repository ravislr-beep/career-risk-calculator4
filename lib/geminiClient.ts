// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) throw new Error("GOOGLE_API_KEY environment variable not set.");

// Initialize the client
export const geminiClient = new GoogleGenerativeAI(apiKey);

// Optional: choose a model, e.g., "text-bison-001"
export const textModel = geminiClient.model("text-bison-001");
