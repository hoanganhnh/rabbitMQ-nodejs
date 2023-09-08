const amqplib = require("amqplib");

const amqp_url = "amqp://localhost";

const receiveMsg = async () => {
  try {
    const conn = await amqplib.connect(amqp_url);

    const channel = await conn.createChannel();

    const nameExchange = "video";
    await channel.assertExchange(nameExchange, "fanout", {
      durable: false,
    });

    // create queue
    const { queue } = await channel.assertQueue("", { exclusive: true }); // @see: https://stackoverflow.com/questions/21248563/rabbitmq-difference-between-exclusive-and-auto-delete

    console.log(`nameQueue: ${queue}`);

    // binding
    await channel.bindQueue(queue, nameExchange, "");

    await channel.consume(
      queue,
      (msg) => {
        console.log(`Receive message: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

receiveMsg();
