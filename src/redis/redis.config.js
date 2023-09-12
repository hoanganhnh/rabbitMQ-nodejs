const { createClient } = require("redis");

const host = "redis";
const port = "6379";

class RedisClient {
  constructor(
    options = {
      url: `redis://@${host}:${port}`,
    }
  ) {
    this.redisClient = createClient(options);
  }

  async connect() {
    this.redisClient.on("error", (err) => {
      console.error("Redis client error", err);
    });

    await this.redisClient
      .connect()
      .then(() => {
        console.info("Redis connect successful!");
      })
      .catch((err) => {
        console.error("Redis client error!", err);
      });
  }

  async disconnect() {
    await this.redisClient
      .disconnect()
      .then(() => {
        console.info("Redis disconnect successful!");
      })
      .catch((err) => {
        console.error("Redis client error!", err);
      });
  }

  getRedisClient() {
    return this.redisClient;
  }

  get isRedisClientConnected() {
    return this.redisClient && this.redisClient.isReady;
  }
}

const redis = new RedisClient();

redis.connect();

module.exports = redis;
