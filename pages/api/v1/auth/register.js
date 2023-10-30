import connectToMongoDB from '@/lib/dbConnect';
import snowflake from '@/lib/snowflake';

export default async function handler(req, res) {
  await connectToMongoDB();
  
  const userId = snowflake.getUniqueID();

  res.status(200).send(userId.toString());
}