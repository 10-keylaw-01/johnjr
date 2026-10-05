const BASE_URLS = {
  sandbox: 'https://sandbox.safaricom.co.ke',
  production: 'https://api.safaricom.co.ke',
};
const CALLBACK_PATH = '/api/payments/daraja-callback';

const isPublicHost = host =>
  Boolean(host) && !/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(host);

// Safaricom rejects non-public callback URLs ("Invalid CallBackURL").
const resolveCallbackUrl = (req, environment) => {
  if (process.env.DARAJA_CALLBACK_URL) return process.env.DARAJA_CALLBACK_URL;

  const host = req?.headers?.['x-forwarded-host'] || req?.headers?.host;
  if (isPublicHost(host)) return `https://${host}${CALLBACK_PATH}`;

  // Sandbox only checks that the URL is public HTTPS. Use a tunnel and set
  // DARAJA_CALLBACK_URL if you need to receive real callbacks locally.
  return environment === 'sandbox' ? `https://example.com${CALLBACK_PATH}` : '';
};

export const getConfig = req => {
  const environment =
    process.env.DARAJA_ENV === 'production' ? 'production' : 'sandbox';

  return {
    baseUrl: BASE_URLS[environment],
    consumerKey: process.env.DARAJA_CONSUMER_KEY,
    consumerSecret: process.env.DARAJA_CONSUMER_SECRET,
    shortcode: process.env.DARAJA_SHORTCODE,
    passkey: process.env.DARAJA_PASSKEY,
    callbackUrl: resolveCallbackUrl(req, environment),
  };
};

export const missingConfig = config =>
  [
    ['DARAJA_CONSUMER_KEY', config.consumerKey],
    ['DARAJA_CONSUMER_SECRET', config.consumerSecret],
    ['DARAJA_SHORTCODE', config.shortcode],
    ['DARAJA_PASSKEY', config.passkey],
    ['DARAJA_CALLBACK_URL', config.callbackUrl],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

export const getAccessToken = async config => {
  const auth = Buffer.from(
    `${config.consumerKey}:${config.consumerSecret}`,
  ).toString('base64');
  const response = await fetch(
    `${config.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } },
  );
  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.errorMessage || 'Unable to authenticate with Daraja',
    );
  }
  return data.access_token;
};

// Daraja expects East Africa Time (UTC+3) whatever the server timezone is.
export const getTimestamp = () => {
  const eat = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const pad = n => String(n).padStart(2, '0');
  return [
    eat.getUTCFullYear(),
    pad(eat.getUTCMonth() + 1),
    pad(eat.getUTCDate()),
    pad(eat.getUTCHours()),
    pad(eat.getUTCMinutes()),
    pad(eat.getUTCSeconds()),
  ].join('');
};

export const getPassword = (config, timestamp) =>
  Buffer.from(`${config.shortcode}${config.passkey}${timestamp}`).toString(
    'base64',
  );

export const callDaraja = async (config, path, body) => {
  const token = await getAccessToken(config);
  const response = await fetch(`${config.baseUrl}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
};

export const requirePost = (req, res) => {
  if (req.method === 'POST') return true;
  res.setHeader('Allow', 'POST');
  res.status(405).json({ message: 'Method not allowed' });
  return false;
};
