"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = setCache;
exports.getCache = getCache;
exports.deleteCache = deleteCache;
// db.ts
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const redisUrl = process.env["REDIS_URL"];
if (redisUrl == undefined)
    throw new Error("redisUrl is not initialized.");
const redisClient = (0, redis_1.createClient)({
    url: redisUrl,
});
redisClient.on("error", (err) => console.error("Redis connection error:", err));
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!redisClient.isOpen) {
            yield redisClient.connect();
            console.log("Redis connected successfully.");
        }
    });
}
function setCache(key_1, value_1) {
    return __awaiter(this, arguments, void 0, function* (key, value, ttl = 60 * 60 * 24 * 10 //seconds in ten days.
    ) {
        yield connectRedis();
        yield redisClient.setEx(key, ttl, JSON.stringify(value));
    });
}
function getCache(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectRedis();
        const data = yield redisClient.get(key);
        return data ? JSON.parse(data) : null;
    });
}
function deleteCache(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectRedis();
        yield redisClient.del(key);
    });
}
