const amqplib = require("amqplib");

const amqp_url = "amqp://localhost";

const sendEmail = async () => {
  try {
    const conn = await amqplib.connect(amqp_url);

    const channel = await conn.createChannel();

    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });

    const args = process.argv.slice(2);
    const topic = args[0];
    const msg = args[1] || "Fixed !";

    console.log(`topic: ${topic} & message: ${msg}`);

    await channel.publish(nameExchange, topic, Buffer.from(msg));

    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 10000);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

sendEmail();
