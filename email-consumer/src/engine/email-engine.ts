import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

class EmailEngine {
  private static instance: EmailEngine;
  private apiInstance: Brevo.TransactionalEmailsApi;

  private constructor() {
    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.setApiKey(process.env.SIB_KEY || "");
  }

  // Method to set the API key
  private setApiKey(apiKey: string): void {
    this.apiInstance.setApiKey(0, apiKey);
  }
  public static getInstance(): EmailEngine {
    if (!EmailEngine.instance) {
      EmailEngine.instance = new EmailEngine();
    }
    return EmailEngine.instance;
  }

  public async sendEmail({
    subject,
    htmlContent,
    recipientName,
    recipientEmail,
  }: {
    subject: string;
    htmlContent: string;
    recipientName: string;
    recipientEmail: string;
  }): Promise<void> {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = {
      name: process.env.SENDER_NAME || "Default Sender",
      email: process.env.SENDER_EMAIL || "default@example.com",
    };
    sendSmtpEmail.to = [{ email: recipientEmail, name: recipientName }];
    sendSmtpEmail.replyTo = {
      email: process.env.SENDER_EMAIL || "default@example.com",
      name: process.env.SENDER_NAME || "Default Sender",
    };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = {};

    try {
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(
        "API called successfully. Returned data:",
        JSON.stringify(data)
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default EmailEngine;
