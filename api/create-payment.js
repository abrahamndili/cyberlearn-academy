const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const {
    provider = 'flutterwave',
    amount = 25,
    plan = 'all-lessons',
    name = 'Student',
    email = 'student@example.com'
  } = body;

  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const successUrl = `${siteUrl}/payment-success.html?provider=${encodeURIComponent(provider)}&plan=${encodeURIComponent(plan)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&amount=${encodeURIComponent(amount)}&demo=1`;

  if (provider === 'flutterwave' && process.env.FLW_SECRET_KEY) {
    try {
      const response = await fetch('https://api.flutterwave.com/v3/payments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tx_ref: `cyberlearn-${Date.now()}`,
          amount: Number(amount),
          currency: 'USD',
          redirect_url: successUrl,
          customer: { email, name },
          meta: { plan, source: 'cyberlearn-academy' }
        })
      });

      const data = await response.json();
      if (!response.ok || !data?.data?.link) {
        return res.status(400).json({ error: 'Flutterwave initialization failed', details: data });
      }

      return res.status(200).json({
        status: 'success',
        provider,
        checkoutUrl: data.data.link,
        tx_ref: data.data.tx_ref,
        message: 'Redirecting to Flutterwave checkout.'
      });
    } catch (error) {
      return res.status(500).json({ error: 'Flutterwave request failed', details: error.message });
    }
  }

  if (provider === 'paystack' && process.env.PAYSTACK_SECRET_KEY) {
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          amount: Math.round(Number(amount) * 100),
          callback_url: successUrl,
          metadata: { plan, name, source: 'cyberlearn-academy' }
        })
      });

      const data = await response.json();
      if (!response.ok || !data?.status || !data?.data?.authorization_url) {
        return res.status(400).json({ error: 'Paystack initialization failed', details: data });
      }

      return res.status(200).json({
        status: 'success',
        provider,
        checkoutUrl: data.data.authorization_url,
        message: 'Redirecting to Paystack checkout.'
      });
    } catch (error) {
      return res.status(500).json({ error: 'Paystack request failed', details: error.message });
    }
  }

  return res.status(200).json({
    status: 'demo',
    provider,
    checkoutUrl: successUrl,
    mode: 'demo',
    message: 'Demo mode active. No live payment keys configured yet. This simulates a successful payment and opens the certificate page.'
  });
};
