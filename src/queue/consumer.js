const amqplib = require("amqplib");

const amqp_url = "amqp://localhost:5672";

const receiveQueue = async () => {
  try {
    const conn = await amqplib.connect(amqp_url);

    const channel = await conn.createChannel();

    const nameQueue = "q2";

    await channel.assertQueue(nameQueue, {
      durable: true,
    });

    await channel.consume(
      nameQueue,
      (msg) => {
        console.log(`Receive: ${msg.content.toString()}`);
      },
      {
        noAck: true, // when you set noAck to true it means automatic acknowledgement of messages, even if the worker is not able to process the message it will be deleted from the queue
      }
    );
    // close conn and channel
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

receiveQueue();
