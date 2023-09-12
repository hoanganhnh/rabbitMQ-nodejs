const redis = require("redis");

const host = "redis";
const port = "6379";

const client = redis.createClient({
  url: `redis://@${host}:${port}`,
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("connect", () => {
  console.log(`Connected: Redis connected host ${host} port ${port}!`);
});

async function connectRedis() {
  await client.connect();

  await client.set("key", "value");
  const value = await client.get("key");

  return value;
}

connectRedis().then((v) => console.log(v));
