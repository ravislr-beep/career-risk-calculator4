// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Pass the API key as a string directly
const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const textModel = geminiClient.model("text-bison-001");

export const generateText = async (prompt: string): Promise<string> => {
  const response = await textModel.generateContent({
    contents: [{ content: prompt }], // Correct property name
  });
  return response.text;
};
