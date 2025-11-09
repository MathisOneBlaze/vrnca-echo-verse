# Fix Email Notifications - Tomorrow

## STATUS:
✅ **Email DOES work** - Test email received at moncoq.mathis@gmail.com  
❌ **API unstable** - Process conflicts causing crashes when form submitted

## The Fix (15 minutes):

```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181

# 1. Kill ALL node processes cleanly
systemctl stop letrousseau-api
killall -9 node
sleep 3

# 2. Verify nothing on port 3001
lsof -i :3001  # Should be empty

# 3. Start the correct API (the one with email code)
cd /var/www/letrousseau/backend
# Make sure services/ folder and updated controller are there
ls -la services/
ls -la controllers/submissionController.js

# 4. Start manually first to test
node server.js

# In another terminal, test:
curl -X POST http://localhost:3001/api/submissions/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test","newsletter":false,"consent":true,"source":"test"}'

# Check logs for "✓ Email sent"

# 5. Once working, set up systemd properly
# Update systemd to point to correct location: /var/www/letrousseau/backend
# Then: systemctl restart letrousseau-api
```

## What's Configured:
- **Email**: contact@asso-letrousseau.com
- **Password**: 9497Newyork2-
- **Recipient**: moncoq.mathis@gmail.com
- **SMTP**: Hostinger (smtp.hostinger.com:465)

## Email Works When:
- Someone submits form on https://evrgrn.mathisoneblaze.com/contact
- Someone submits form on https://www.asso-letrousseau.com

You'll receive email with:
- Name, email, phone
- Full message
- Which website it came from
- Newsletter preference

---

## Session Accomplishments Today:

✅ Unified API deployed with SSL
✅ EVRGRN 3D model fixed
✅ EVRGRN intro sequence fixed
✅ EVRGRN favicon updated
✅ Contact form connected to API
✅ Email notifications coded
✅ Email TESTED and WORKING
⏳ Need: Clean API restart tomorrow
