# VRNCA Echo Verse - Deployment Guide

## Deployment Information

**Project:** VRNCA Echo Verse  
**VPS:** 168.231.85.181  
**Domain:** evrgrn.mathisoneblaze.com  
**Deploy Path:** /var/www/evrgrn  
**SSH Key:** ~/.ssh/letrousseau_vps  

## Deployment Status

✅ **Successfully Deployed** - November 7, 2025

- Application built and deployed to VPS
- Nginx configured and running
- Files transferred to `/var/www/evrgrn`
- Proper permissions set (www-data:www-data)
- Server responding correctly (HTTP 200)

## DNS Configuration Required

⚠️ **Action Required:** Configure DNS A record

To make the site accessible at `evrgrn.mathisoneblaze.com`, add the following DNS record:

```
Type: A
Name: evrgrn
Value: 168.231.85.181
TTL: 3600 (or Auto)
```

**Where to configure:**
- Log in to your domain registrar (where mathisoneblaze.com is registered)
- Navigate to DNS settings
- Add the A record as shown above
- Wait for DNS propagation (5-60 minutes)

## Quick Deployment Script

Use this script for future deployments:

```bash
#!/bin/bash
# deploy-evrgrn.sh

echo "🚀 Deploying VRNCA Echo Verse to evrgrn.mathisoneblaze.com"

# Build the application
echo "📦 Building application..."
npm run build

# Transfer files to VPS
echo "📤 Transferring files to VPS..."
rsync -avz -e "ssh -i ~/.ssh/letrousseau_vps" dist/ root@168.231.85.181:/var/www/evrgrn/

# Set permissions
echo "🔒 Setting permissions..."
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "chown -R www-data:www-data /var/www/evrgrn && chmod -R 755 /var/www/evrgrn"

# Test deployment
echo "✅ Testing deployment..."
curl -I -H "Host: evrgrn.mathisoneblaze.com" http://168.231.85.181

echo "🎉 Deployment complete!"
echo "📍 Site will be available at: http://evrgrn.mathisoneblaze.com (once DNS propagates)"
```

## Nginx Configuration

The Nginx configuration is located at:
- **Config file:** `/etc/nginx/sites-available/evrgrn.mathisoneblaze.com`
- **Enabled symlink:** `/etc/nginx/sites-enabled/evrgrn.mathisoneblaze.com`

### Features Configured:
- ✅ Gzip compression
- ✅ Static asset caching (1 year)
- ✅ SPA routing (try_files for React Router)
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- ✅ Access and error logs

### View Nginx Config:
```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "cat /etc/nginx/sites-available/evrgrn.mathisoneblaze.com"
```

### Reload Nginx:
```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "nginx -t && systemctl reload nginx"
```

## SSL/HTTPS Setup (Recommended Next Step)

Once DNS is configured and propagating, install SSL certificate:

```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181

# Install certbot if not already installed
apt update
apt install certbot python3-certbot-nginx -y

# Obtain and install SSL certificate
certbot --nginx -d evrgrn.mathisoneblaze.com

# Certbot will automatically:
# - Obtain certificate from Let's Encrypt
# - Update Nginx configuration
# - Set up auto-renewal
```

## Useful Commands

### Check site status:
```bash
curl -I -H "Host: evrgrn.mathisoneblaze.com" http://168.231.85.181
```

### View logs:
```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "tail -f /var/log/nginx/evrgrn.mathisoneblaze.com.access.log"
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "tail -f /var/log/nginx/evrgrn.mathisoneblaze.com.error.log"
```

### Check Nginx status:
```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "systemctl status nginx"
```

### List deployed files:
```bash
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181 "ls -la /var/www/evrgrn/"
```

## Project Structure

```
vrnca-echo-verse/
├── dist/                    # Built files (deployed to VPS)
├── src/                     # Source code
├── public/                  # Static assets
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
└── DEPLOYMENT.md           # This file
```

## Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Framework:** Tailwind CSS + shadcn/ui
- **3D Graphics:** Three.js + React Three Fiber
- **Server:** Nginx 1.24.0
- **OS:** Ubuntu (VPS)

## Troubleshooting

### Site not loading after DNS configuration:
1. Check DNS propagation: `dig evrgrn.mathisoneblaze.com`
2. Verify Nginx is running: `systemctl status nginx`
3. Check Nginx logs for errors
4. Verify file permissions: `ls -la /var/www/evrgrn/`

### 404 errors on routes:
- Ensure `try_files $uri $uri/ /index.html;` is in Nginx config
- This enables SPA routing for React Router

### Changes not appearing:
- Clear browser cache
- Check if files were transferred: `ls -la /var/www/evrgrn/`
- Verify build was successful: `ls -la dist/`

## Support

For issues or questions, check:
- Nginx error logs: `/var/log/nginx/evrgrn.mathisoneblaze.com.error.log`
- Nginx access logs: `/var/log/nginx/evrgrn.mathisoneblaze.com.access.log`
- Application build output

---

**Last Updated:** November 7, 2025  
**Deployed By:** Cascade AI Assistant
