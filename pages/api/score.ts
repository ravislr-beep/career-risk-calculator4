// pages/api/score.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from '../../lib/geminiClient';

interface RiskPayload {
  age: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data: RiskPayload = req.body;

  try {
    const result = await generateText(
      `Calculate career risk score for a person aged ${data.age}`
    );
    res.status(200).json({ result });
  } catch (error: any) {
    console.error('Error generating risk score:', error);
    res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
