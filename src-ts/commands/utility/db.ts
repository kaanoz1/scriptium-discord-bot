// db.ts
import { createClient } from "redis";
import { config } from "dotenv";

config();

const redisUrl = process.env["REDIS_URL"];

if (redisUrl == undefined) throw new Error("redisUrl is not initialized.");

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err: unknown) =>
  console.error("Redis connection error:", err)
);

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis connected successfully.");
  }
}

export async function setCache(
  key: string,
  value: unknown,
  ttl: number = 60 * 60 * 24 * 10 //seconds in ten days.
) {
  await connectRedis();
  await redisClient.setEx(key, ttl, JSON.stringify(value));
}

export async function getCache<T>(key: string): Promise<T | null> {
  await connectRedis();
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

export async function deleteCache(key: string) {
  await connectRedis();
  await redisClient.del(key);
}
