// lib/deepseekClient.ts
import OpenAI from "openai";

export interface DeepseekRequest {
  prompt: string;
  maxTokens?: number;
}

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY!, // make sure this is set in Netlify env vars
  baseURL: "https://api.deepseek.com",   // adjust if Deepseek has a different endpoint
});

export async function deepseekGenerate(req: DeepseekRequest): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model: "deepseek-chat", // or the exact model name you want
      messages: [{ role: "user", content: req.prompt }],
      max_tokens: req.maxTokens ?? 300,
    });

    return completion.choices[0].message?.content ?? "";
  } catch (error) {
    console.error("Deepseek API error:", error);
    throw new Error("Failed to generate response from Deepseek");
  }
}
