// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectToMongoDB from '@/lib/dbConnect';

export default async function handler(req, res) {
  await connectToMongoDB();

  res.status(200).json({
    version: {
      name: '0.1.0-alpha',
      code: 1
    }
  });
}
