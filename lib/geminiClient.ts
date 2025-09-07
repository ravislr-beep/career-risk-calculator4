// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export const textModel = geminiClient.model("text-bison-001");

export const generateText = async (prompt: string): Promise<string> => {
  const response = await textModel.generateContent({
    contents: [{ content: prompt }],
  });
  return response.text;
};
