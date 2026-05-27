# 🚀 DEPLOYMENT GUIDE

Complete guide to deploy ZDOS NEXUS v3.0 on your infrastructure.

---

## 📋 Prerequisites

- Node.js 22+
- pnpm 10+
- Git
- SSH access to VPS (if deploying to VPS)
- Domain name (optional, for production)

---

## 🖥️ VPS Deployment (Recommended)

### 1. Server Setup

```bash
# SSH into VPS
ssh user@your-vps-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install Git
sudo apt-get install -y git
```

### 2. Clone & Build

```bash
# Clone repository
git clone https://github.com/RZA-pulciz/zdos-v3.git
cd zdos-v3

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.production
# Edit .env.production with your values

# Build for production
pnpm build
```

### 3. Start Server

**Option A: Direct (Testing)**
```bash
NODE_ENV=production node dist/index.js
# Server running on http://localhost:3000
```

**Option B: PM2 (Recommended)**
```bash
# Install PM2
sudo npm install -g pm2

# Create ecosystem config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'zdos-nexus',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Monitor
pm2 logs zdos-nexus
pm2 status
```

**Option C: Systemd (Production)**
```bash
# Create service file
sudo tee /etc/systemd/system/zdos-nexus.service > /dev/null << 'EOF'
[Unit]
Description=ZDOS NEXUS v3.0
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/zdos-nexus-v3
ExecStart=/usr/local/bin/node dist/index.js
Restart=on-failure
RestartSec=10
Environment="NODE_ENV=production"
Environment="PORT=3000"

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable zdos-nexus
sudo systemctl start zdos-nexus

# Check status
sudo systemctl status zdos-nexus
sudo journalctl -u zdos-nexus -f
```

### 4. Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt-get install -y nginx

# Create config
sudo tee /etc/nginx/sites-available/zdos-nexus > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/zdos-nexus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 6. Database Setup (Optional)

```bash
# Install MySQL
sudo apt-get install -y mysql-server

# Create database
mysql -u root -p << EOF
CREATE DATABASE zdos_nexus;
CREATE USER 'zdos_user'@'localhost' IDENTIFIED BY 'strong-password';
GRANT ALL PRIVILEGES ON zdos_nexus.* TO 'zdos_user'@'localhost';
FLUSH PRIVILEGES;
EOF

# Run migrations
pnpm drizzle-kit migrate
```

---

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
```

### Build & Run

```bash
# Build image
docker build -t zdos-nexus:latest .

# Run container
docker run -d \
  --name zdos-nexus \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  zdos-nexus:latest

# View logs
docker logs -f zdos-nexus

# Stop container
docker stop zdos-nexus
```

### Docker Compose

```yaml
version: '3.8'

services:
  zdos-nexus:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      DATABASE_URL: mysql://user:password@mysql:3306/zdos_nexus
    depends_on:
      - mysql
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: zdos_nexus
      MYSQL_USER: zdos_user
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: root_password
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

Run with:
```bash
docker-compose up -d
```

---

## ☁️ Cloud Run Deployment

```bash
# Install Google Cloud CLI
curl https://sdk.cloud.google.com | bash

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy zdos-nexus \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# View logs
gcloud run logs read zdos-nexus --limit 50
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/ubuntu/zdos-nexus-v3
            git pull origin main
            pnpm install
            pnpm build
            pm2 restart zdos-nexus
```

---

## 📊 Monitoring

### Check Status

```bash
# PM2
pm2 status
pm2 logs zdos-nexus

# Systemd
sudo systemctl status zdos-nexus
sudo journalctl -u zdos-nexus -f

# Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# System resources
htop
df -h
free -h
```

### Health Check

```bash
# Test endpoint
curl https://your-domain.com/api/dashboard/stats

# Check SSL
curl -I https://your-domain.com

# Monitor uptime
watch -n 5 'curl -s https://your-domain.com/api/dashboard/stats | jq .uptime'
```

---

## 🔐 Security Checklist

- [ ] Update system packages
- [ ] Configure firewall (UFW)
- [ ] Set up SSH key authentication
- [ ] Disable root login
- [ ] Configure fail2ban
- [ ] Enable SSL/TLS
- [ ] Set up environment variables
- [ ] Configure database backups
- [ ] Enable monitoring/alerts
- [ ] Set up log rotation

### Firewall Setup

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## 📦 Backup & Recovery

### Database Backup

```bash
# Manual backup
mysqldump -u zdos_user -p zdos_nexus > backup-$(date +%Y%m%d).sql

# Automated backup (cron)
0 2 * * * mysqldump -u zdos_user -p zdos_nexus > /backups/zdos-$(date +\%Y\%m\%d).sql

# Restore
mysql -u zdos_user -p zdos_nexus < backup-20260527.sql
```

### Code Backup

```bash
# Backup entire project
tar -czf zdos-nexus-backup-$(date +%Y%m%d).tar.gz /home/ubuntu/zdos-nexus-v3

# Upload to S3
aws s3 cp zdos-nexus-backup-*.tar.gz s3://your-bucket/backups/
```

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 node dist/index.js
```

### Build Fails

```bash
# Clear cache
rm -rf node_modules pnpm-lock.yaml dist

# Reinstall
pnpm install

# Rebuild
pnpm build
```

### Database Connection Error

```bash
# Check MySQL status
sudo systemctl status mysql

# Test connection
mysql -u zdos_user -p -h localhost zdos_nexus

# Check DATABASE_URL in .env.production
```

### High Memory Usage

```bash
# Restart service
pm2 restart zdos-nexus
# or
sudo systemctl restart zdos-nexus

# Monitor memory
watch -n 1 free -h
```

---

## 📈 Performance Optimization

```bash
# Enable gzip compression (Nginx)
gzip on;
gzip_types text/plain text/css application/json;

# Cache static assets
expires 1y;
add_header Cache-Control "public, immutable";

# Enable HTTP/2
listen 443 ssl http2;

# Optimize Node.js
NODE_OPTIONS="--max-old-space-size=4096"
```

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/RZA-pulciz/zdos-v3/issues)
- **Discussions:** [GitHub Discussions](https://github.com/RZA-pulciz/zdos-v3/discussions)

---

<div align="center">

**Happy Deploying! 🚀**

</div>
