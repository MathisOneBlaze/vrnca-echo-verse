# Contact Form Setup

## Current Status
The contact form is now configured to send emails via **Web3Forms**, a free service that requires no backend infrastructure.

## Setup Instructions

### Step 1: Get Your Web3Forms Access Key (FREE)
1. Visit [https://web3forms.com](https://web3forms.com)
2. Click "Get Started" or "Create Access Key"
3. Enter your email address where you want to receive contact form submissions
4. You'll receive a free access key immediately

### Step 2: Update the Code
1. Open `/src/pages/Contact.tsx`
2. Find line 60: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
3. Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` with your actual key

Example:
```typescript
access_key: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' // Your real key
```

### Step 3: Rebuild and Deploy
```bash
npm run build
# Then deploy to VPS
```

## How It Works

When someone submits the contact form:
1. Form data is sent to Web3Forms API
2. Web3Forms forwards it to your email
3. You receive an email with:
   - Name
   - Email
   - Phone (if provided)
   - Message
   - Newsletter subscription preference

## Features

- ✅ **Free**: No cost, no credit card required
- ✅ **No Backend**: Works directly from the frontend
- ✅ **Spam Protection**: Built-in honeypot and reCAPTCHA support
- ✅ **Email Notifications**: Instant delivery to your inbox
- ✅ **Custom Templates**: Configure email format in Web3Forms dashboard

## Alternative: Use FormSubmit (Also Free)

If you prefer, you can also use FormSubmit:

1. Replace the API endpoint:
```typescript
const response = await fetch('https://formsubmit.co/your-email@example.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    _subject: `Nouveau message de ${formData.name} - EVRGRN`
  })
});
```

2. First submission will require email confirmation
3. After that, all submissions will be forwarded to your email

## Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify the access key is correct
- Ensure you're online

**Not receiving emails?**
- Check spam folder
- Verify the email address used when creating the Web3Forms key
- Check Web3Forms dashboard for submission logs

## Current Configuration

**Email will include:**
- From: Contact EVRGRN
- Subject: Nouveau message de [Name]
- Body: All form fields formatted nicely

**Rate Limiting:**
- Web3Forms free tier: 250 submissions/month
- More than enough for a personal/portfolio site
