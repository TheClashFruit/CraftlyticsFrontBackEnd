import { google } from 'googleapis';
import connectToMongoDB from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { token } = req.query;

  // ---------------------------- //

  await connectToMongoDB();

  // ---------------------------- //

  const user = await User.findOne({
    verificationToken: token
  });

  if(!user) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_TOKEN_INVALID'
    });

    return;
  }

  // ---------------------------- //

  try {
    await User.updateOne({
      verificationToken: token
    }, {
      isVerified: true
    }, {
      runValidators: true
    });

    res.redirect(302, '/auth/login');
  } catch (e) {
    res.status(500);

    res.json({
      error: 1,
      code: 'ERR_INTERNAL',
      debug: e.stackTrace
    });

    console.error(e);
  }
}