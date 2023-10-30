import connectToMongoDB from '@/lib/dbConnect';
import snowflake from '@/lib/snowflake';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import User from '@/models/User';
import {isEmailValid} from '@/lib/validationTools';
import mailer from '@/lib/email';

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

  const verificationToken = (Math.random() + 1).toString(36).substring(2);

  const userDocument = new User({
    id: userId,
    fullName: fullname,
    username: safeUsername,
    email: email,
    verificationToken: verificationToken,
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

    const emailOptions = {
      from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `[${process.env.MAIL_NAME}] Verify your email address.`,
      text: `Hello ${fullname},\n\nYou have recently created an account on ${process.env.MAIL_NAME}.\n\nTo verify your email address, please click the following link:\nhttps://craftlytics.theclashfruit.me/api/v1/auth/verify?token=${verificationToken}\n\nIf you did not create an account, please ignore this email.\nAccounts with unverified email addresses will get deleted after 2 weeks.\n\nRegards,\n${process.env.MAIL_NAME}`
    };

    await mailer.sendMail(emailOptions, (e, i) => {
      if (e)
        throw new Error(e);
    });

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