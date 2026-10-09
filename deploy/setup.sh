#!/bin/bash
set -e

APP_DIR=/opt/doaide-pdf

echo "==> Setting up DoAide PDF..."

# API setup
echo "==> Setting up API..."
cd "$APP_DIR/api"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Web setup
echo "==> Building frontend..."
cd "$APP_DIR/web"
npm install
npm run build

# Install services
echo "==> Installing systemd services..."
cp "$APP_DIR/deploy/doaide-pdf-api.service" /etc/systemd/system/
cp "$APP_DIR/deploy/doaide-pdf-web.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable doaide-pdf-api doaide-pdf-web
systemctl restart doaide-pdf-api doaide-pdf-web

echo "==> Done! API on :3075, Web on :3076"
