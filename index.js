"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBSITE_URL = exports.SERVER_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const read_1 = __importDefault(require("./commands/read"));
const ping_1 = __importDefault(require("./commands/ping"));
dotenv_1.default.config();
//https://discord.com/oauth2/authorize?client_id=1336220556227383327
const discordBotToken = process.env["DISCORD_BOT_TOKEN"];
exports.SERVER_URL = process.env["SERVER_URL"];
exports.WEBSITE_URL = process.env["WEBSITE_URL"];
if (!discordBotToken)
    throw new Error("DISCORD_BOT_TOKEN env variable is not set.");
if (!exports.SERVER_URL)
    throw new Error("SERVER_URL env variable is not set.");
if (!exports.WEBSITE_URL)
    throw new Error("WEBSITE_URL env variable is not set.");
const commands = [read_1.default, ping_1.default];
const commandMap = new discord_js_1.Collection();
const cooldowns = new discord_js_1.Collection();
for (const cmd of commands)
    commandMap.set(cmd.data.name, cmd);
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = commandMap.get(interaction.commandName);
    if (!command) {
        await interaction.reply({
            content: "❌ This command doesn't exist.",
        });
        return;
    }
    if (command.cooldown) {
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new discord_js_1.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const cooldownAmount = command.cooldown * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                await interaction.reply({
                    content: `⏳ Please wait **${timeLeft} seconds** before using \`${command.data.name}\` again.`,
                });
                return;
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    }
    try {
        await command.execute(interaction);
    }
    catch (err) {
        console.error(err);
        await interaction.reply({
            content: "⚠️ There was an error executing the command.",
        });
    }
});
client.once(discord_js_1.Events.ClientReady, () => {
    console.log(`✅ Bot logged in as ${client.user?.tag}`);
    console.log(commands);
});
client.login(discordBotToken);
