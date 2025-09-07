// pages/api/score.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { geminiGenerate } from "../../lib/geminiClient";

interface RiskPayload {
  age: number;
  // add other fields
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: RiskPayload = req.body;
  try {
    const result = await geminiGenerate.generateText({
      prompt: `Calculate risk for age ${data.age}`,
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
