// Accepts 07XXXXXXXX, 01XXXXXXXX, 7XXXXXXXX, +2547XXXXXXXX etc. and returns
// the 2547XXXXXXXX / 2541XXXXXXXX form Daraja requires ('' when invalid).
export const normalizeMpesaPhone = phone => {
  const digits = String(phone || '').replace(/\D/g, '');

  if (/^254[17]\d{8}$/.test(digits)) return digits;
  if (/^0[17]\d{8}$/.test(digits)) return `254${digits.slice(1)}`;
  if (/^[17]\d{8}$/.test(digits)) return `254${digits}`;

  return '';
};

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'M-Pesa request failed');
  return data;
};

export const startStkPush = body => postJson('/api/mpesa/stk-push', body);

// Resolves when the customer pays; throws if the payment fails or times out.
export const waitForPayment = async (
  checkoutRequestId,
  { intervalMs = 3000, timeoutMs = 90000 } = {},
) => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, intervalMs));
    const result = await postJson('/api/mpesa/status', { checkoutRequestId });

    if (result.status === 'success') return;
    if (result.status === 'failed') {
      throw new Error(result.message || 'Payment was not completed');
    }
  }
  throw new Error('Payment timed out. If you were charged, contact support.');
};
