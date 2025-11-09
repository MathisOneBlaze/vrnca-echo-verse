# Email Notifications - Setup Guide

## ✅ What's Ready:

1. **API Updated**: Email notification code added
2. **Script**: `moncoq.mathis@gmail.com` will receive instant emails
3. **CSV Export**: Script created (manual only, no automation)

## 🔧 What You Need to Do (2 minutes):

### Step 1: Create Gmail App Password

1. Go to: **https://myaccount.google.com/security**
2. Click **2-Step Verification** 
   - If not enabled, enable it first
3. Scroll down → Click **App passwords**
4. App name: **Le Trousseau API**
5. Click **Create**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Update .env on VPS

```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181
cd /var/www/letrousseau-repo/backend
nano .env
```

Find this line:
```
EMAIL_APP_PASSWORD=YOUR_GMAIL_APP_PASSWORD_HERE
```

Replace with your password (**remove spaces**):
```
EMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Save**: Press `Ctrl+X`, then `Y`, then `Enter`

### Step 3: Restart API

```bash
systemctl restart letrousseau-api
systemctl status letrousseau-api
```

### Step 4: Test

```bash
curl -X POST https://api.asso-letrousseau.com/api/submissions/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"","message":"Testing email notification","newsletter":false,"consent":true,"source":"test"}'
```

**Check your email**: `moncoq.mathis@gmail.com`

You should receive an email like:
```
📬 Nouveau message de test

Source: test
Date: [timestamp]
---
Nom: Test User
Email: test@test.com
Téléphone: Non fourni
Message: Testing email notification
Newsletter: ✗ Non
```

## 📊 Manual CSV Export (Optional)

If you want all submissions in CSV format, run this anytime:

```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181
cd /var/www/letrousseau-repo/backend
node scripts/export-contacts-csv.js
```

CSV file will be emailed to `moncoq.mathis@gmail.com`

## ✅ What Happens Now:

**Every time someone submits a contact form** on:
- https://evrgrn.mathisoneblaze.com/contact
- https://www.asso-letrousseau.com (contact forms)

**You'll instantly receive an email** at `moncoq.mathis@gmail.com` with:
- Full form data
- Which website it came from
- Timestamp

## 🔧 Troubleshooting

**Not receiving emails?**
1. Check spam folder
2. Verify app password in .env (no spaces)
3. Check API logs: `journalctl -u letrousseau-api -f`
4. Verify 2-step verification is enabled in Gmail

**Test the API is running:**
```bash
curl https://api.asso-letrousseau.com/
# Should return: {"success":true,"message":"Le Trousseau API"...}
```

## 📁 Files Created on VPS:

- `/var/www/letrousseau-repo/backend/services/emailService.js` - Email sending logic
- `/var/www/letrousseau-repo/backend/scripts/export-contacts-csv.js` - CSV export script
- `/var/www/letrousseau-repo/backend/EMAIL-SETUP.md` - Full documentation on VPS

## 🎯 Summary:

✅ Unified contact API: **LIVE**  
⏳ Email notifications: **Needs Gmail app password**  
✅ CSV export: **Ready (manual only)**  

**Next step**: Create Gmail app password and update .env!
