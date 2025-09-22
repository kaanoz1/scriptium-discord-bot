import { createClient } from "redis";
import { config } from "dotenv";
import { VerseBothDTO } from "../classes/Verse";
import { APIEmbed } from "discord.js";
import { isAPIEmbed } from "./util";

config();

const REDIS_URL = process.env["REDIS_URL"];

if (REDIS_URL == undefined) throw new Error("REDIS_URL is not initialized.");

const redisClient = createClient({
  url: REDIS_URL,
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

export async function getCachedVerse(
  key: string
): Promise<VerseBothDTO | null> {
  await connectRedis();
  const dataString = await redisClient.get(key);

  if (dataString === null || dataString === "") return null;

  const data = JSON.parse(dataString);

  return data;
}

export async function deleteCache(key: string) {
  await connectRedis();
  await redisClient.del(key);
}

export async function getCachedEmbed(key: string): Promise<APIEmbed | null> {
  await connectRedis();
  const dataString = await redisClient.get(key);

  if (!dataString) return null;

  const data = JSON.parse(dataString);
  return isAPIEmbed(data) ? data : null;
}
