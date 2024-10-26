# Use the official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# Copy the rest of the application code
COPY . .

# Ensure the configuration file is copied
COPY .env.example .env  
# If you want to copy the example as default

# Install dependencies
RUN npm install && npm install -g typescript

# Expose the port
EXPOSE 3000

# Copy the start script and make it executable
COPY start.sh .

# Make sure the start script is executable
RUN chmod +x start.sh

# Start the application using the start script
CMD ["./start.sh"]



# Start the application with a shell command
# CMD ["sh", "-c", "npm run prisma:migrate && npm run prisma:generate && npm run seed && npm start"]
