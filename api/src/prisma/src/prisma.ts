import { PrismaClient } from "@prisma/client"; // Import the PrismaClient class from the Prisma client library

/**
 * Function to create a new instance of PrismaClient.
 * This function is used to ensure that only a single instance of PrismaClient is created.
 */
const prismaClientSingleton = () => {
  return new PrismaClient(); // Create and return a new PrismaClient instance
};

// Extend the global object with a property to hold the PrismaClient instance
declare global {
  // `prismaGlobal` will hold the singleton PrismaClient instance if it exists
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Create a PrismaClient instance, reusing the global instance if available
const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prismaGlobal ?? prismaClientSingleton();

// Export the PrismaClient instance to be used throughout the application
export default prisma;

// In non-production environments (e.g., development), store the PrismaClient instance globally
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
