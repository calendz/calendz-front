#!/bin/bash
eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/deploy_key # Allow read access to the private key
ssh-add .travis/deploy_key # Add the private key to SSH

# Execute the following commands through ssh
ssh -o "StrictHostKeyChecking=no" $SSH_USER@$SSH_IP -p $SSH_PORT <<EOF
  cd /home/calendz/calendz-conf
  git pull
  docker pull calendz/front:latest
  docker-compose -f docker/docker-compose.prod.yml up -d --no-deps --build calendz-front
  echo "successfully deployed" >> /home/calendz/deployed.txt
EOF