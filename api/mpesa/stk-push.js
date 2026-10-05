import {
  callDaraja,
  getConfig,
  getPassword,
  getTimestamp,
  missingConfig,
  requirePost,
} from './_lib.js';

const isValidPhone = phone => /^254[17]\d{8}$/.test(String(phone || ''));

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

    const { amountKes, phone, orderNumber = 'Order' } = req.body || {};
    const amount = Math.ceil(Number(amountKes));

    if (!Number.isFinite(amount) || amount < 1) {
      return res.status(400).json({ message: 'A valid amount is required' });
    }
    if (!isValidPhone(phone)) {
      return res
        .status(400)
        .json({ message: 'Phone number must be in 2547XXXXXXXX format' });
    }

    const timestamp = getTimestamp();
    const { ok, data } = await callDaraja(
      config,
      '/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: config.shortcode,
        Password: getPassword(config, timestamp),
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: config.shortcode,
        PhoneNumber: phone,
        CallBackURL: config.callbackUrl,
        AccountReference: String(orderNumber).slice(0, 12),
        TransactionDesc: `Order ${orderNumber}`.slice(0, 13),
      },
    );

    if (!ok || data.ResponseCode !== '0') {
      return res.status(400).json({
        message:
          data.errorMessage || data.ResponseDescription || 'M-Pesa request failed',
      });
    }

    return res.status(200).json({
      checkoutRequestId: data.CheckoutRequestID,
      amountKes: amount,
      message: data.CustomerMessage,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'M-Pesa request failed' });
  }
}
