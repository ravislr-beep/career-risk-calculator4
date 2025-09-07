import type { NextApiRequest, NextApiResponse } from "next";
import { textModel } from "../../lib/geminiClient";

interface RiskPayload {
  age: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: RiskPayload = req.body;

  try {
    // Use the model's generateText method
    const result = await textModel.generateText({
      prompt: `Calculate risk for age ${data.age}`,
    });

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate risk." });
  }
}
