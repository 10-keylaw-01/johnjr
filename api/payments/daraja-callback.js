// Safaricom posts the final payment result here. The app confirms payments by
// polling /api/mpesa/status, so this only needs to acknowledge the request.
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res
    .status(200)
    .json({ ResultCode: 0, ResultDesc: 'Callback received successfully' });
}
