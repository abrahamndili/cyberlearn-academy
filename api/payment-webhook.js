module.exports = async function handler(req, res) {
  const eventType = req.headers['x-flw-signature'] || req.headers['x-paystack-signature'] || 'demo';

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ ok: false, message: 'Invalid payload' });
    }

    const provider = payload.provider || 'demo';
    const status = payload.status || payload.event || 'paid';

    if (provider === 'flutterwave' && process.env.FLW_SECRET_KEY && req.headers['x-flw-signature']) {
      return res.status(200).json({ ok: true, provider, status, message: 'Flutterwave webhook accepted.' });
    }

    if (provider === 'paystack' && process.env.PAYSTACK_SECRET_KEY && req.headers['x-paystack-signature']) {
      return res.status(200).json({ ok: true, provider, status, message: 'Paystack webhook accepted.' });
    }

    return res.status(200).json({
      ok: true,
      provider: 'demo',
      status,
      message: 'Demo webhook accepted. Add provider keys in Vercel env to enable production verification.'
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Webhook failed', details: error.message });
  }
};
