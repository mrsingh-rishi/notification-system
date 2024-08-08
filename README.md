# Notification System

A scalable notification system built with Node.js and Express, utilizing Kafka for message handling and microservices architecture. The backend API pushes notification data to Kafka, which is then processed by dedicated consumers for email, SMS, and WhatsApp notifications.

## Features

- **Microservices Architecture**: Ensures modularity and scalability.
- **Unified API Endpoint**: Send notifications via email, SMS, or WhatsApp using a single API.
- **Kafka Integration**: Manages and routes notification messages asynchronously.
- **Dedicated Consumers**: Separate consumers handle email, SMS, and WhatsApp notifications.

## Technologies

- **Node.js**: JavaScript runtime for server-side applications.
- **Express**: Web framework for API development.
- **Kafka**: Distributed streaming platform for managing messages.
- **Brevo**: Service provider for email notifications.
- **Tailliwo**: Service provider for SMS and WhatsApp messaging.

## Architecture

1. **Backend API**: Exposes a single endpoint to receive notification requests and pushes notification data to Kafka.
2. **Kafka**: Handles asynchronous message processing and routing.
3. **Consumers**: Dedicated services for processing notifications:
   - **Email Consumer**: Sends notifications via Brevo.
   - **SMS Consumer**: Sends notifications via Tailliwo.
   - **WhatsApp Consumer**: Sends notifications via Tailliwo.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- Kafka (for local development or a Kafka cluster)
- Brevo and Tailliwo accounts

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/notification-system.git
    cd notification-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configuration:**

    Create a `.env` file in the root directory and add your configuration settings:

    ```env
    KAFKA_BROKER=your_kafka_broker
    BREVO_API_KEY=your_brevo_api_key
    TAILLIWO_API_KEY=your_tailliwo_api_key
    ```

4. **Start Kafka:**

    Ensure Kafka is running on your local machine or use a Kafka cluster. For local development, follow the [Kafka Quickstart](https://kafka.apache.org/quickstart).

5. **Run the Backend API:**

    ```bash
    npm start
    ```

6. **Run Consumers:**

    Start each consumer to process notifications from Kafka:

    ```bash
    npm run start:email-consumer
    npm run start:sms-consumer
    npm run start:whatsapp-consumer
    ```

## API Endpoint

### Send Notification

- **Endpoint:** `/api/notifications`
- **Method:** POST
- **Description:** Sends a notification via the specified service (email, SMS, or WhatsApp).
- **Request Body:**
    ```json
    {
      "service": "email" | "sms" | "whatsapp",
      "to": "recipient@example.com" | "+1234567890",
      "message": "Your notification message here"
    }
    ```
- **Example Request for Email:**
    ```json
    {
      "service": "email",
      "to": "recipient@example.com",
      "message": "This is a test email message"
    }
    ```
- **Example Request for SMS:**
    ```json
    {
      "service": "sms",
      "to": "+1234567890",
      "message": "This is a test SMS message"
    }
    ```
- **Example Request for WhatsApp:**
    ```json
    {
      "service": "whatsapp",
      "to": "+1234567890",
      "message": "This is a test WhatsApp message"
    }
    ```
