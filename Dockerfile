FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY index.js ./

# Create directories
RUN mkdir -p /app/input /app/output /app/qrcodes

# Default command
CMD ["npm", "start"]

