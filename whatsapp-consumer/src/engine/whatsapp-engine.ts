import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

class WhatsAppEngine {
  private static instance: WhatsAppEngine;
  private client: twilio.Twilio;

  private constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.client = twilio(accountSid, authToken);
  }

  public static getInstance(): WhatsAppEngine {
    if (!WhatsAppEngine.instance) {
      WhatsAppEngine.instance = new WhatsAppEngine();
    }
    return WhatsAppEngine.instance;
  }

  public async sendWhatsAppMessage({
    body,
    to,
  }: {
    body: string;
    to: string;
  }): Promise<void> {
    try {
      const from = `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`;
      const toWithWhatsApp = `whatsapp:${to}`;

      const message = await this.client.messages.create({
        body,
        from,
        to: toWithWhatsApp,
      });

      console.log("WhatsApp message sent successfully:", message.sid);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  }
}

export default WhatsAppEngine;
