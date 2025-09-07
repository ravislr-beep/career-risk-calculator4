// lib/geminiClient.ts
import { GoogleGenerativeAI, GenerateContentRequest } from '@google/generative-ai';

// Pass the API key directly as a string
const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const textModel = geminiClient.getGenerativeModel({
  model: 'gemini-2.5-flash',
});

export const geminiGenerate = {
  generateText: async (prompt: string) => {
    const request: GenerateContentRequest = {
      contents: [{ text: prompt }],
    };
    const response = await textModel.generateContent(request);
    return response.text;
  },
};
