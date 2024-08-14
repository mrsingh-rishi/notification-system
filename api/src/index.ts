import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Kafka } from "kafkajs";
import prisma from "./prisma/src/prisma";
import { Producer } from "./producer/kafka-producer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

let kafkaProducer: Producer;

app.post("/api/notification", async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    // Retrieve user and notification preferences concurrently
    const [user, notificationPreference] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      }),
      prisma.notificationPreferences.findUnique({
        where: {
          userId: Number(userId),
        },
      }),
    ]);

    if (!user || !notificationPreference) {
      return res
        .status(404)
        .json({ message: "User or notification preference not found" });
    }

    // Ensure Kafka producer is initialized
    if (!kafkaProducer) {
      kafkaProducer = Producer.getInstance();
    }

    // Collect promises for sending notifications
    const promises: Promise<void>[] = [];

    if (notificationPreference.email) {
      promises.push(
        kafkaProducer.publishToKafka({
          message,
          to: user.email,
          topic: "email",
        })
      );
    }
    if (notificationPreference.sms) {
      promises.push(
        kafkaProducer.publishToKafka({
          message,
          to: user.mobileNumber,
          topic: "sms",
        })
      );
    }
    if (notificationPreference.whatsapp) {
      promises.push(
        kafkaProducer.publishToKafka({
          message,
          to: user.mobileNumber,
          topic: "whatsapp",
        })
      );
    }

    // Wait for all notifications to be sent
    await Promise.all(promises);

    res.status(201).json({ message: "Notification sent successfully" });
  } catch (error: any) {
    console.error("Error sending notification:", error); // Log error details
    res
      .status(500)
      .json({ error: error.message, message: "Failed to send notification" });
  }
});

app.listen(port);
