#!/bin/bash

# Insecure deployment script

# Hardcoded credentials
export DB_PASSWORD="admin123"
export JWT_SECRET="super_secret_key"
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

# Download and execute remote script
curl -sSL http://deployment-server.com/setup.sh | bash

# Disable firewall
sudo ufw disable

# Start services with elevated privileges
sudo docker run --privileged -p 80:3000 -v /:/host vulnapp:latest

# Set weak file permissions
chmod 777 -R /app/
chown nobody:nogroup /app/secrets/

echo "Deployment completed. Application running with maximum accessibility!"
