# Unified Contact Form API - Setup Guide

## Overview

All 3 websites will use **the same backend API** for contact forms:
- ✅ `https://www.asso-letrousseau.com/` 
- ✅ `https://evrgrn.mathisoneblaze.com/`
- ✅ `https://www.mathisoneblaze.com/`

All submissions are stored in the **same MySQL database** on your VPS.

## Architecture

```
┌─────────────────────────────────────────────┐
│         VPS 168.231.85.181                  │
│                                             │
│  ┌──────────────────────────────────────┐ │
│  │  Nginx Reverse Proxy                 │ │
│  │  • asso-letrousseau.com → :80        │ │
│  │  • api.asso-letrousseau.com → :3001  │ │
│  │  • evrgrn.mathisoneblaze.com → :80   │ │
│  │  • mathisoneblaze.com → :80          │ │
│  └──────────────────────────────────────┘ │
│                    ↓                        │
│  ┌──────────────────────────────────────┐ │
│  │  Node.js Express API (Port 3001)     │ │
│  │  /api/submissions/contact            │ │
│  │  • Rate limiting                     │ │
│  │  • Validation                        │ │
│  │  • CORS configured                   │ │
│  └──────────────────────────────────────┘ │
│                    ↓                        │
│  ┌──────────────────────────────────────┐ │
│  │  MySQL Database                      │ │
│  │  letrousseau_db.contact_submissions  │ │
│  │  • name, email, phone, message       │ │
│  │  • newsletter, source, created_at    │ │
│  └──────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## What's Already Done

✅ **Backend API exists** in Le Trousseau project:
- Express server with MySQL
- Contact form endpoint at `/api/submissions/contact`
- Rate limiting & validation
- Located at: `/var/www/letrousseau-repo/backend/`

✅ **EVRGRN contact form updated** to use the API

## What Needs to Be Done

### Step 1: Deploy the Backend API

The backend needs to be deployed as a service on the VPS:

```bash
# 1. SSH to VPS
ssh -i ~/.ssh/letrousseau_vps root@168.231.85.181

# 2. Navigate to backend
cd /var/www/letrousseau-repo/backend

# 3. Install dependencies (if not done)
npm install

# 4. Create .env file
cat > .env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_USER=letrousseau_app
DB_PASSWORD=your_mysql_password
DB_NAME=letrousseau_db

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration (all 3 sites)
CORS_ORIGIN=https://www.asso-letrousseau.com,https://evrgrn.mathisoneblaze.com,https://www.mathisoneblaze.com
EOF

# 5. Create systemd service
cat > /etc/systemd/system/letrousseau-api.service << 'EOF'
[Unit]
Description=Le Trousseau API Server
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/letrousseau-repo/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=letrousseau-api

[Install]
WantedBy=multi-user.target
EOF

# 6. Start the service
systemctl daemon-reload
systemctl enable letrousseau-api
systemctl start letrousseau-api
systemctl status letrousseau-api
```

### Step 2: Configure Nginx Reverse Proxy

Add API subdomain configuration:

```bash
# Create Nginx config for API
cat > /etc/nginx/sites-available/api-letrousseau << 'EOF'
server {
    listen 80;
    server_name api.asso-letrousseau.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Node.js API
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/api-letrousseau /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 3: Add DNS A Record

In your DNS provider (where you manage asso-letrousseau.com):
```
Type: A
Name: api
Value: 168.231.85.181
TTL: 3600
```

### Step 4: Install SSL Certificate

```bash
certbot --nginx -d api.asso-letrousseau.com
```

### Step 5: Verify the Database Table

```bash
# Check if contact_submissions table exists
mysql -u letrousseau_app -p letrousseau_db -e "SHOW TABLES LIKE 'contact_submissions';"

# If it doesn't exist, create it:
mysql -u letrousseau_app -p letrousseau_db << 'EOF'
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    newsletter BOOLEAN DEFAULT FALSE,
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
EOF
```

## Testing

### 1. Test API Health
```bash
curl https://api.asso-letrousseau.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is healthy",
  "database": "connected"
}
```

### 2. Test Contact Form Submission
```bash
curl -X POST https://api.asso-letrousseau.com/api/submissions/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0123456789",
    "message": "Test message from API",
    "newsletter": true,
    "source": "evrgrn.mathisoneblaze.com"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

### 3. Verify in Database
```bash
mysql -u letrousseau_app -p letrousseau_db -e "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;"
```

## Updating Other Sites

### For mathisoneblaze.com
Update the contact form to use the same API:

```typescript
const response = await fetch('https://api.asso-letrousseau.com/api/submissions/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.phone || '',
    message: formData.message,
    newsletter: formData.newsletter,
    source: 'mathisoneblaze.com'
  })
});
```

## Benefits of This Approach

✅ **Unified Data**: All contact forms in one database  
✅ **Full Control**: No third-party services  
✅ **Free**: Uses your existing infrastructure  
✅ **Secure**: Rate limiting, validation, CORS  
✅ **Source Tracking**: Know which site sent each message  
✅ **Easy Management**: Query all submissions from MySQL  

## Viewing Submissions

Query all submissions:
```sql
SELECT 
  id, 
  name, 
  email, 
  source, 
  created_at 
FROM contact_submissions 
ORDER BY created_at DESC;
```

Filter by site:
```sql
SELECT * FROM contact_submissions 
WHERE source = 'evrgrn.mathisoneblaze.com' 
ORDER BY created_at DESC;
```

Newsletter subscribers only:
```sql
SELECT email, name, source 
FROM contact_submissions 
WHERE newsletter = TRUE 
ORDER BY created_at DESC;
```

## Troubleshooting

**API not starting?**
```bash
journalctl -u letrousseau-api -f  # View logs
systemctl status letrousseau-api  # Check status
```

**CORS errors?**
- Ensure all 3 domains are in CORS_ORIGIN env variable
- Check Nginx proxy headers are set

**Database connection errors?**
- Verify MySQL credentials in .env
- Test connection: `mysql -u letrousseau_app -p letrousseau_db`

## Next Steps

1. Deploy the backend API (Step 1-5 above)
2. Test the API endpoints
3. Rebuild & deploy EVRGRN with updated contact form
4. Update mathisoneblaze.com contact form
5. Verify all 3 sites can submit successfully
