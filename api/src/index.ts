import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Kafka } from "kafkajs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

app.post("/api/notification", async (req: Request, res: Response) => {
  try {
    const { service, to, message } = req.body;
    await producer.connect();

    await producer.send({
      topic: service,
      messages: [
        {
          value: JSON.stringify({ to, message }),
        },
      ],
    });

    res.status(201).json({ message: "Notification sent successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message, message: "Failed to send notification" });
  }
});

app.listen(port);
