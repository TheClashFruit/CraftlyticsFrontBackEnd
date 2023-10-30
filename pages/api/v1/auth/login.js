import connectToMongoDB from '@/lib/dbConnect';
import {isEmailValid} from '@/lib/validationTools';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

export default async function handler(req, res) {
  const { email, password } = req.body;

  // ---------------------------- //

  await connectToMongoDB();

  // ---------------------------- //

  BigInt.prototype.toJSON = function() { return this.toString(); };

  // ---------------------------- //

  if (typeof email == 'undefined') {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_EMAIL_MISSING'
    });

    return;
  }

  if (!isEmailValid(email)) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_EMAIL_INVALID'
    });

    return;
  }

  if (typeof password == 'undefined') {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_PASSWORD_MISSING'
    });

    return;
  }

  // ---------------------------- //

  const user = await User.findOne({
    email: email
  });

  // ---------------------------- //

  if (user === null) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_USER_NOT_FOUND'
    });

    return;
  }

  // ---------------------------- //

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_PASSWORD_INVALID'
    });

    return;
  }

  // ---------------------------- //

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ id: user.id, email: email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);

  // ---------------------------- //

  res.status(200).json({
    error: 0,
    code: 'SUCCESS_USER_LOGGED_IN',
    token
  });
}