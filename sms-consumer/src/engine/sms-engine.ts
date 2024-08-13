import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

class SMSEngine {
  private static instance: SMSEngine;
  private client: twilio.Twilio;

  private constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.client = twilio(accountSid, authToken);
  }

  public static getInstance(): SMSEngine {
    if (!SMSEngine.instance) {
      SMSEngine.instance = new SMSEngine();
    }
    return SMSEngine.instance;
  }

  public async sendSMS({
    body,
    to,
  }: {
    body: string;
    to: string;
  }): Promise<void> {
    try {
      const from = process.env.TWILIO_SMS_FROM || "";

      const message = await this.client.messages.create({
        body,
        from,
        to,
      });

      console.log("SMS sent successfully:", message.sid);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  }
}

export default SMSEngine;
