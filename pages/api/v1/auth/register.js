import connectToMongoDB from '@/lib/dbConnect';
import snowflake from '@/lib/snowflake';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import User from '@/models/User';

export default async function handler(req, res) {
  const { fullname, username, email, password } = req.body;

  // ---------------------------- //

  await connectToMongoDB();

  // ---------------------------- //

  BigInt.prototype.toJSON = function() { return this.toString(); };

  // ---------------------------- //

  if (typeof fullname == 'undefined') {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_NAME_MISSING'
    });

    return;
  }

  if (typeof username == 'undefined') {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_USERNAME_MISSING'
    });

    return;
  }

  if (typeof email == 'undefined') {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_EMAIL_MISSING'
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

  const userId = snowflake.getUniqueID();
  const safeUsername = username
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(' ', '_');

  // ---------------------------- //

  if (safeUsername.length < 3) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_USERNAME_TOO_SHORT'
    });

    return;
  }

  if (safeUsername.length > 32) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_USERNAME_TOO_LONG'
    });

    return;
  }

  if (password.length < 8) {
    res.status(400);

    res.json({
      error: 1,
      code: 'ERR_PASSWORD_TOO_SHORT'
    });

    return;
  }

  // ---------------------------- //

  const saltedPassword = await bcrypt.hash(password, 10);

  const userDocument = new User({
    id: userId,
    fullName: username,
    username: safeUsername,
    email: email,
    password: saltedPassword
  });

  // ---------------------------- //

  try {
    await userDocument.save();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ id: userId, email: email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    res.status(201);

    res.json({
      error: 0,
      code: 'SUCCESS_USER_CREATED',
      token: token
    });
  } catch (e) {
    if (e.code === 11000) {
      if (e.keyPattern.email === 1) {
        res.status(409);

        res.json({
          error: 1,
          code: 'ERR_EMAIL_USED'
        });
      } else if (e.keyPattern.username === 1) {
        res.status(409);

        res.json({
          error: 1,
          code: 'ERR_USERNAME_USED'
        });
      }
    } else {
      res.status(500);

      res.json({
        error: 1,
        code: 'ERR_INTERNAL',
        debug: e.stackTrace
      });

      console.error(e);
    }
  }
}