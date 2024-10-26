# Use the official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install && npm install -g typescript


# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "prisma:migrate", "prisma:generate", "seed",  "start"]
