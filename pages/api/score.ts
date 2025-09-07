// pages/api/score.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { deepseekGenerate } from "../../lib/deepseekClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body;

    // === Calculate Risk Score (dummy example, adjust to your logic) ===
    let total = 0;
    if (payload.experienceYears) total += payload.experienceYears * 2;
    if (payload.skills?.length) total += payload.skills.length * 5;

    const riskCategory =
      total > 80 ? "High Risk" : total > 50 ? "Medium Risk" : "Low Risk";

    // === Generate narrative with Deepseek ===
    const narrative = await deepseekGenerate({
      prompt: `Profile: ${JSON.stringify(payload)}. 
      Risk score: ${total.toFixed(1)} (${riskCategory}). 
      Provide a 200-word narrative assessment and career guidance.`,
      maxTokens: 500,
    });

    return res.status(200).json({
      score: total,
      category: riskCategory,
      narrative,
    });
  } catch (error: any) {
    console.error("Error in /api/score:", error);
    return res.status(500).json({
      error: "Failed to calculate risk score",
      details: error.message,
    });
  }
}
