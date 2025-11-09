# 🚀 VRNCA Echo Verse - Quick Reference Card

## 📍 Essential Info

| Item | Value |
|------|-------|
| **Domain** | evrgrn.mathisoneblaze.com |
| **VPS IP** | 168.231.85.181 |
| **SSH Key** | ~/.ssh/letrousseau_vps |
| **Deploy Path** | /var/www/evrgrn |
| **Status** | ✅ Deployed (DNS pending) |

## ⚡ Quick Commands

### Deploy Updates
```bash
./deploy-evrgrn.sh
```

### SSH into VPS
```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181
```

### Test Site
```bash
# With IP (works now)
curl -I -H "Host: evrgrn.mathisoneblaze.com" http://168.231.85.181

# With domain (after DNS)
curl -I http://evrgrn.mathisoneblaze.com
```

### View Logs
```bash
# Error logs
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "tail -f /var/log/nginx/evrgrn.mathisoneblaze.com.error.log"

# Access logs
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "tail -f /var/log/nginx/evrgrn.mathisoneblaze.com.access.log"
```

### Nginx Control
```bash
# Reload Nginx
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "nginx -t && systemctl reload nginx"

# Check status
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "systemctl status nginx"
```

## 🔴 ACTION REQUIRED

### Configure DNS Now!

Add this A record to your domain registrar:

```
Type: A
Name: evrgrn
Value: 168.231.85.181
TTL: 3600
```

**Where?** Your domain registrar for `mathisoneblaze.com`

## 🔒 Install SSL (After DNS)

```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181
certbot --nginx -d evrgrn.mathisoneblaze.com
```

## 📁 Files Created

- ✅ `DEPLOYMENT.md` - Full deployment guide
- ✅ `DEPLOYMENT-SUMMARY.md` - Detailed summary
- ✅ `deploy-evrgrn.sh` - Deployment script
- ✅ `QUICK-REFERENCE.md` - This file

## 🎯 Next Steps

1. ⚠️ **Configure DNS** (see above)
2. ⏳ Wait 5-60 min for DNS propagation
3. 🔒 Install SSL certificate
4. 🎉 Site is live!

---

**Need help?** Check `DEPLOYMENT.md` for detailed troubleshooting.
