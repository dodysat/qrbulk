FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY index.js ./

# Create data directory
RUN mkdir -p /data

# Default command
CMD ["npm", "start"]

