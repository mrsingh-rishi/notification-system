# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install && npm install -g typescript

# Copy the rest of the application code
COPY . .

# Compile TypeScript files
# RUN npm run build

# Command to start the WhatsApp consumer
CMD ["npm", "start"]
