const amqplib = require("amqplib");

const amqp_url = "amqp://localhost";

const sendQueue = async ({ msg }) => {
  try {
    const conn = await amqplib.connect(amqp_url);

    const channel = await conn.createChannel();

    const nameQueue = "q2";

    await channel.assertQueue(nameQueue, {
      durable: true, // the queue will survive a broker restart
    });

    await channel.sendToQueue(nameQueue, Buffer.from(msg), {
      expiration: "10000", // TTL:  time to live,
      persistent: true, // lưu tạm thông tin vào disk @see: https://www.rabbitmq.com/persistence-conf.html
    });
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello";

sendQueue({ msg });
