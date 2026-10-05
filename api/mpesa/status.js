import {
  callDaraja,
  getConfig,
  getPassword,
  getTimestamp,
  missingConfig,
  requirePost,
} from './_lib.js';

// Asks Safaricom for the outcome of an STK push, so no database is needed.
// status: 'pending' | 'success' | 'failed'
export default async function handler(req, res) {
  if (!requirePost(req, res)) return;

  try {
    const config = getConfig(req);
    const missing = missingConfig(config);
    if (missing.length) {
      return res
        .status(500)
        .json({ message: `Missing M-Pesa configuration: ${missing.join(', ')}` });
    }

    const { checkoutRequestId } = req.body || {};
    if (!checkoutRequestId) {
      return res.status(400).json({ message: 'checkoutRequestId is required' });
    }

    const timestamp = getTimestamp();
    const { data } = await callDaraja(config, '/mpesa/stkpushquery/v1/query', {
      BusinessShortCode: config.shortcode,
      Password: getPassword(config, timestamp),
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    });

    // While the customer is still on the prompt, Daraja answers with an
    // error ("The transaction is being processed") instead of a ResultCode.
    if (data.ResultCode === undefined) {
      return res.status(200).json({ status: 'pending' });
    }

    const success = String(data.ResultCode) === '0';
    return res.status(200).json({
      status: success ? 'success' : 'failed',
      message: data.ResultDesc,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Could not check payment status' });
  }
}
