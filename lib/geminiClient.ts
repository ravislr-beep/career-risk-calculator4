// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export const textModel = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate text from the model.");
  }
};
