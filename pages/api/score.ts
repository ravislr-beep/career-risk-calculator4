// pages/api/score.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { geminiGenerate } from "../../lib/geminiClient";

interface RiskPayload {
  age: number;
  industry: string;
  jobLevel: string;
  skills: string[];
  location: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload: RiskPayload = req.body;

    // === Simple risk scoring logic ===
    let score = 0;

    // Age risk
    if (payload.age > 50) score += 20;
    else if (payload.age < 25) score += 10;

    // Industry risk
    if (["manufacturing", "retail"].includes(payload.industry.toLowerCase())) {
      score += 20;
    } else if (payload.industry.toLowerCase() === "tech") {
      score += 5;
    }

    // Job level risk
    if (payload.jobLevel.toLowerCase() === "entry") score += 15;
    else if (payload.jobLevel.toLowerCase() === "senior") score += 10;

    // Skills risk
    if (payload.skills.length < 3) score += 20;

    // Location risk
    if (payload.location.toLowerCase() === "remote") score += 5;
    else score += 10;

    const total = Math.min(100, score);
