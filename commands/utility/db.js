"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = setCache;
exports.getCache = getCache;
exports.deleteCache = deleteCache;
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const REDIS_URL = process.env["REDIS_URL"];
if (REDIS_URL == undefined) throw new Error("REDIS_URL is not initialized.");
const redisClient = (0, redis_1.createClient)({
  url: REDIS_URL,
});
redisClient.on("error", (err) => console.error("Redis connection error:", err));
async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    re.log("Redis connected successfully.");
  }
}
async function setCache(
  key,
  value,
  ttl = 60 * 60 * 24 * 10 //seconds in ten days.
) {
  await connectRedis();
  await redisClient.setEx(key, ttl, JSON.stringify(value));
}
async function getCache(key) {
  await connectRedis();
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}
async function deleteCache(key) {
  await connectRedis();
  await redisClient.del(key);
}
