// pages/api/history.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();
  const searches = await db.collection('searches')
    .find({ userId: session.userId })
    .sort({ timestamp: -1 })
    .toArray();

  res.status(200).json(searches);
}