#!/bin/sh

# Run migrations
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate

# Seed the database
npm run seed

# Start the application
npm start
