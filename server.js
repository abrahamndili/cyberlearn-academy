const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// Ensure DB exists and tables are created
db.init();

app.use(express.json());

function makeCertificateHtml({ certificateId, email, lessonId }) {
  const issued = new Date().toLocaleDateString();
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; background: #081015; color: #edf7fb; text-align: center; padding: 40px; }
          .frame { border: 10px solid #62f0c1; padding: 40px; border-radius: 20px; }
          h1 { font-size: 32px; margin-bottom: 8px; }
          h2 { margin: 18px 0 8px; }
          p { font-size: 18px; color: #dbe9ee; }
          .small { font-size: 12px; color: #a9bac4; margin-top: 22px; }
        </style>
      </head>
      <body>
        <div class="frame">
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
          <h2>${email}</h2>
          <p>has successfully completed the lesson:</p>
          <h3>${lessonId}</h3>
          <p>Issued on ${issued}</p>
          <div class="small">Certificate ID: ${certificateId}</div>
        </div>
      </body>
    </html>
  `;
}

async function generateCertificate(reference) {
  const purchase = await db.getPurchaseByReference(reference);
  if (!purchase) throw new Error('Purchase record not found');
  if (purchase.certificate_issued) return; // legacy check

  const certificateId = uuidv4();
  const html = makeCertificateHtml({ certificateId, email: purchase.email, lessonId: purchase.lessonId });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  const certDir = path.join(__dirname, 'certificates');
  if (!fs.existsSync(certDir)) fs.mkdirSync(certDir);

  const fileName = `certificate-${certificateId}.pdf`;
  const filePath = path.join(certDir, fileName);
  fs.writeFileSync(filePath, pdfBuffer);

  // Insert certificate record
  await db.createCertificateRecord({ certificateId, reference, fileName });

  // send email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: Number(process.env.EMAIL_SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@cyberlearn.academy',
    to: purchase.email,
    subject: `Your CyberLearn certificate for ${purchase.lessonId}`,
    text: `Congratulations! Your certificate for ${purchase.lessonId} has been issued.`,
    attachments: [{ filename: fileName, content: pdfBuffer }]
  });

  return { certificateId, fileName, filePath };
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/verify', (req, res) => {
  res.sendFile(path.join(__dirname, 'verify.html'));
});

app.post('/api/initiate-payment', async (req, res) => {
  const { lessonId, email, amount } = req.body || {};

  if (!lessonId || !email || !amount) {
    return res.status(400).json({ error: 'Missing lessonId, email, or amount.' });
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: Number(amount),
        callback_url: `${SITE_URL}/payment-callback`,
        metadata: { lessonId }
      })
    });

    const json = await response.json();
    if (!json.status) {
      return res.status(400).json({ error: json.message || 'Paystack initialization failed.' });
    }

    const reference = json.data.reference;
    // Persist purchase
    await db.savePurchase({ reference, lessonId, email, amount: Number(amount) });

    res.json({ authorization_url: json.data.authorization_url, reference });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize payment.', details: error.message });
  }
});

app.get('/payment-callback', (req, res) => {
  const reference = req.query.reference;
  if (!reference) {
    return res.status(400).send('Missing reference.');
  }

  res.send(`
    <html>
      <body style="font-family:Arial,sans-serif;background:#081015;color:#edf7fb;padding:40px;">
        <h2>Payment status</h2>
        <p>Processing your purchase...</p>
        <script>
          fetch('/api/verify/' + encodeURIComponent('${reference}'))
            .then(r => r.json())
            .then(data => {
              if (data.ok) {
                document.body.innerHTML = '<h2>Payment successful</h2><p>Your certificate is being emailed to you.</p><a href="/" style="color:#62f0c1;">Return to courses</a>';
              } else {
                document.body.innerHTML = '<h2>Payment not completed</h2><p>Please try again or contact support.</p>';
              }
            })
            .catch(() => {
              document.body.innerHTML = '<h2>Could not verify payment</h2><p>Please check your email or contact support.</p>';
            });
        </script>
      </body>
    </html>
  `);
});

app.get('/api/verify/:reference', async (req, res) => {
  const { reference } = req.params;

  if (!reference) {
    return res.status(400).json({ ok: false, error: 'Missing reference.' });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
    });

    const json = await response.json();
    if (!json.status) {
      return res.status(400).json({ ok: false, error: json.message || 'Verification failed.' });
    }

    const data = json.data;
    if (data.status === 'success') {
      await db.markPurchasePaid(reference, data);

      // generate certificate if not present
      try {
        const cert = await generateCertificate(reference);
        return res.json({ ok: true, message: 'Payment verified.', certificateUrl: `${SITE_URL}/certificates/${cert.fileName}`, certificateId: cert.certificateId });
      } catch (genErr) {
        // certificate generation may be async
        console.error('Certificate generation error:', genErr);
        return res.json({ ok: true, message: 'Payment verified. Certificate generation pending.' });
      }
    }

    return res.json({ ok: false, message: 'Payment not successful.', status: data.status });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Verification failed.', details: error.message });
  }
});

app.post('/api/paystack-webhook', bodyParser.raw({ type: '*/*' }), async (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(req.body).digest('hex');

  if (signature !== hash) {
    return res.status(400).send('Invalid signature');
  }

  try {
    const event = JSON.parse(req.body.toString());
    const eventType = event.event;
    const data = event.data || {};

    if (eventType === 'charge.success' || eventType === 'transaction.success') {
      const reference = data.reference;
      await db.savePurchase({ reference, lessonId: data.metadata?.lessonId, email: data.customer?.email || data.customer?.email, amount: data.amount });
      await db.markPurchasePaid(reference, data);
      // fire and forget certificate generation
      generateCertificate(reference).catch(err => console.error('generateCertificate err', err));
    }
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return res.status(500).send('Webhook error');
  }

  res.sendStatus(200);
});

app.get('/api/certificate/:certificateId', async (req, res) => {
  const certificateId = req.params.certificateId;
  if (!certificateId) return res.status(400).json({ ok: false, error: 'Missing certificateId' });

  try {
    const row = await db.getCertificateById(certificateId);
    if (!row) return res.status(404).json({ ok: false, error: 'Certificate not found' });
    const url = `${SITE_URL}/certificates/${row.file_name}`;
    res.json({ ok: true, certificate: { certificateId: row.certificate_id, lessonId: row.lessonId, email: row.email, file: url, issued_at: row.issued_at } });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.use('/certificates', express.static(path.join(__dirname, 'certificates')));

const staticFiles = express.static(path.join(__dirname));
app.use(staticFiles); // serve index.html, verify.html, assets

app.listen(PORT, () => {
  console.log(`CyberLearn Academy server running on http://localhost:${PORT}`);
});
