const amqplib = require("amqplib");

const amqp_url = "amqp://localhost";

const receiveEmail = async () => {
  try {
    const conn = await amqplib.connect(amqp_url);

    const channel = await conn.createChannel();

    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });

    // create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });

    const args = process.argv.slice(2);

    if (!args.length) {
      process.exit(0);
    }

    /**
     * pattern: *, #
     */
    console.log(`waiting queue ${queue}, topic: ${args}`);

    args.forEach(async (key) => {
      await channel.bindQueue(queue, nameExchange, key);
    });

    await channel.consume(queue, (msg) => {
      console.log(
        `Routing key: ${
          msg.fields.routingKey
        } --> message: ${msg.content.toString()}`
      );
    });
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

receiveEmail();
