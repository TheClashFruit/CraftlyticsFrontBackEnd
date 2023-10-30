import connectToMongoDB from '@/lib/dbConnect';

export default async function handler(req, res) {
  await connectToMongoDB();

  res.status(200).send('Hello World');
}