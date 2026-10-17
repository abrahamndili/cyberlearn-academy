# CyberLearn Academy

This repository includes a static landing page plus a Vercel-ready payment flow for a full academy bundle.

## What is included
- A premium bundle pricing section in the landing page
- A payment modal with provider selection for Flutterwave, Paystack, Pesapal, credit/debit card, and M-Pesa-style flow
- A Vercel serverless payment endpoint at `/api/create-payment`
- A webhook endpoint at `/api/payment-webhook`
- A certificate success page that downloads a PDF certificate after payment

## Pricing
Default bundle price: $25 USD

## Deployment on Vercel
1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Add environment variables in the Vercel dashboard:
   - `SITE_URL=https://your-domain.vercel.app`
   - `FLW_SECRET_KEY` (optional, for Flutterwave)
   - `FLW_PUBLIC_KEY` (optional)
   - `PAYSTACK_SECRET_KEY` (optional)
   - `PAYSTACK_PUBLIC_KEY` (optional)
   - `PESAPAL_CONSUMER_KEY` (optional)
   - `PESAPAL_CONSUMER_SECRET` (optional)
   - `MESA_API_KEY` (optional, if using direct M-Pesa flow)
4. Redeploy.

## Demo mode
If no live payment keys are configured, the app runs in demo mode. The payment button still redirects to the success page, where a certificate can be downloaded.

## Production payment setup
- Flutterwave: create a payment route, point redirect URL to `SITE_URL/payment-success.html`, and configure webhook on the Flutterwave dashboard.
- Paystack: use the initialize transaction API and callback URL.
- Pesapal / M-Pesa: implement the respective API in the same pattern as the existing serverless endpoints.

## Notes
- Secret keys must never be committed to the repository.
- Use Vercel environment variables for all production credentials.
