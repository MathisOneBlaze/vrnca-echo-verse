#!/bin/bash

# VRNCA Echo Verse Deployment Script
# Deploys to: evrgrn.mathisoneblaze.com
# VPS: 168.231.85.181

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
VPS_IP="168.231.85.181"
VPS_USER="root"
SSH_KEY="$HOME/.ssh/letrousseau_vps"
DEPLOY_PATH="/var/www/evrgrn"
DOMAIN="evrgrn.mathisoneblaze.com"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 VRNCA Echo Verse Deployment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}❌ SSH key not found: $SSH_KEY${NC}"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Step 1: Build the application
echo -e "${YELLOW}📦 Step 1/5: Building application...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"
echo ""

# Step 2: Test SSH connection
echo -e "${YELLOW}🔐 Step 2/5: Testing SSH connection...${NC}"
if ssh -i "$SSH_KEY" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$VPS_USER@$VPS_IP" "echo 'Connection successful'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ SSH connection successful${NC}"
else
    echo -e "${RED}❌ SSH connection failed${NC}"
    exit 1
fi
echo ""

# Step 3: Transfer files
echo -e "${YELLOW}📤 Step 3/5: Transferring files to VPS...${NC}"
rsync -avz --delete -e "ssh -i $SSH_KEY" dist/ "$VPS_USER@$VPS_IP:$DEPLOY_PATH/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files transferred successfully${NC}"
else
    echo -e "${RED}❌ File transfer failed${NC}"
    exit 1
fi
echo ""

# Step 4: Set permissions
echo -e "${YELLOW}🔒 Step 4/5: Setting permissions...${NC}"
ssh -i "$SSH_KEY" "$VPS_USER@$VPS_IP" "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Permissions set successfully${NC}"
else
    echo -e "${RED}❌ Failed to set permissions${NC}"
    exit 1
fi
echo ""

# Step 5: Test deployment
echo -e "${YELLOW}✅ Step 5/5: Testing deployment...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -H "Host: $DOMAIN" "http://$VPS_IP")

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Deployment test successful (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Received HTTP $HTTP_CODE${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📍 Site URL:${NC} http://$DOMAIN"
echo -e "${BLUE}🖥️  VPS IP:${NC} $VPS_IP"
echo -e "${BLUE}📁 Deploy Path:${NC} $DEPLOY_PATH"
echo ""
echo -e "${YELLOW}⚠️  Note: If DNS is not configured yet, the site won't be accessible via domain name.${NC}"
echo -e "${YELLOW}   Configure DNS A record: evrgrn -> $VPS_IP${NC}"
echo ""
echo -e "${BLUE}🔒 Next step: Install SSL certificate with:${NC}"
echo -e "   ssh -i $SSH_KEY $VPS_USER@$VPS_IP"
echo -e "   certbot --nginx -d $DOMAIN"
echo ""
