import { Kafka } from "kafkajs";
import WhatsAppEngine from "./engine/whatsapp-engine";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "whatsapp-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "whatsapp", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      const parsedData = JSON.parse(message.value?.toString() || "{}");
      const { to, message: msg } = parsedData;
      try {
        WhatsAppEngine.getInstance()
          .sendWhatsAppMessage({
            body: msg,
            to: to,
          })
          .then(() => console.log("SENT"))
          .catch(() => console.log("ERROR"));
      } catch (error) {
        console.log(error);
      }
    },
  });
};

run().catch(console.error);
