import type { NextApiRequest, NextApiResponse } from "next";
import { deepseekGenerate } from "../../lib/deepseekClient"; // adjust path if different

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const payload = req.body;

    // === Example: calculate total risk score ===
    const total = calculateRiskScore(payload); // assume you have this function
    const riskCategory = getRiskCategory(total); // assume you have this function

    // === Generate narrative with Deepseek ===
    const narrative = await deepseekGenerate({
      prompt: `Profile: ${JSON.stringify(payload)}.
               Risk score: ${total.toFixed(1)} (${riskCategory}).
               Provide a 200-word narrative assessment and career guidance.`,
      model: "deepseek-chat" // ✅ replace with the actual model name required
    });

    return res.status(200).json({
      score: total,
      category: riskCategory,
      narrative
    });
  } catch (error: any) {
    console.error("Error in /api/score:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// === Helpers (stub implementations) ===
function calculateRiskScore(payload: any): number {
  // TODO: replace with your real risk scoring logic
  return Math.random() * 100;
}

function getRiskCategory(score: number): string {
  if (score < 33) return "Low";
  if (score < 66) return "Medium";
  return "High";
}
