// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb';
import { analyzeCompany } from '../../lib/companyAnalysis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();
  const { companyName } = req.body;

  // Fetch matching companies
  const companies = await db.collection('companies').find({
    name: { $regex: companyName, $options: 'i' }
  }).toArray();

  if (companies.length === 0) {
    return res.status(404).json({ error: 'No matching companies found' });
  }

  // Perform analysis (this is a placeholder, implement actual analysis in lib/companyAnalysis.ts)
  const startTime = Date.now();
  const analysis = await analyzeCompany(companies[0]);
  const endTime = Date.now();

  // Ensure minimum 2 minutes processing time
  const processingTime = endTime - startTime;
  if (processingTime < 120000) {
    await new Promise(resolve => setTimeout(resolve, 120000 - processingTime));
  }

  // Save search to history
  await db.collection('searches').insertOne({
    userId: session.userId,
    companyName,
    timestamp: new Date(),
    analysis
  });

  res.status(200).json({ companies, analysis, actualProcessingTime: processingTime });
}