Added S3 support: certificate PDFs are now uploaded to S3 and returned as signed URLs when available.

Environment variables (add to your .env):
- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET
- SIGNED_URL_EXPIRES (seconds, optional)

Behavior:
- If S3 is configured (all AWS vars + S3_BUCKET present), certificates are uploaded to S3 and local storage is not used.
- The API endpoints (/api/certificate/:id, /api/admin/purchases, /api/admin/reissue) will return signed, time-limited URLs for downloads.
- If S3 is not configured, the app falls back to local certificates/ folder as before.

