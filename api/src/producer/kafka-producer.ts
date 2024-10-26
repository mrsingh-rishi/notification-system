import { Kafka } from "kafkajs";

export class Producer {
  private static _instance: Producer;
  private readonly _producer;

  private constructor() {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
    });

    this._producer = kafka.producer();
  }

  public static getInstance(): Producer {
    if (!this._instance) {
      return (this._instance = new Producer());
    }

    return this._instance;
  }

  async publishToKafka({
    message,
    to,
    topic,
  }: {
    message: string;
    to: string;
    topic: string;
  }) {
    await this._producer.connect();

    await this._producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify({
            to,
            message,
          }),
        },
      ],
    });
  }
}
