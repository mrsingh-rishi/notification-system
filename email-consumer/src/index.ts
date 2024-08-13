import { Kafka } from "kafkajs";
import EmailEngine from "./engine/email-engine";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "email", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      const parsedData = JSON.parse(message.value?.toString() || "{}");
      console.log("parsedData", parsedData);
      const { to, message: msg } = parsedData;
      const emailObject = {
        subject: "Test Subject",
        htmlContent: msg,
        recipientName: "Rishi",
        recipientEmail: to,
      };
      try {
        EmailEngine.getInstance()
          .sendEmail(emailObject)
          .then(() => console.log("Email sent successfully"))
          .catch(() => {
            console.log("Failed to send email");
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
};
// a b c d e f
run().catch(console.error);
