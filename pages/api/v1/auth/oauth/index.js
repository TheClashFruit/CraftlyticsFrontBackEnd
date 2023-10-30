import { google } from 'googleapis';

export default async function handler(req, res) {
  const { provider } = req.query;

  const scopes = [
    'email',
    'profile'
  ];

  switch (provider) {
    case 'github':
      return res.redirect(302, `https://github.com/login/oauth/authorize?scope=user:email,read:org&client_id=${process.env.GITHUB_CLIENT_ID}`);
    case 'google':
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:3000/api/v1/auth/oauth/callback?provider=google'
      );

      return res.redirect(302, oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
          'email',
          'profile'
        ],
        include_granted_scopes: true
      }));
    default:
      return res.status(404).send('404 Not Found');
  }
}