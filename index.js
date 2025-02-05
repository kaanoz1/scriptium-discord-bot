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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBSITE_URL = exports.SERVER_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const discordBotToken = process.env["DISCORD_BOT_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["GUILD_ID"];
exports.SERVER_URL = process.env["SERVER_URL"];
exports.WEBSITE_URL = process.env["WEBSITE_URL"];
if (!discordBotToken || !clientId || !guildId || !exports.SERVER_URL || !exports.WEBSITE_URL)
    throw new Error("Some of env variables are not initialized.");
const discord_js_1 = require("discord.js");
const read_1 = __importDefault(require("./commands/read"));
const commands = [read_1.default];
const commandMap = new discord_js_1.Collection();
for (const cmd of commands)
    commandMap.set(cmd.data.name, cmd);
const cooldowns = new discord_js_1.Collection();
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
const rest = new discord_js_1.REST({ version: "10" }).setToken(discordBotToken);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), {
            body: commands.map((cmd) => cmd.data.toJSON()),
        });
        client.login(discordBotToken);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const command = commandMap.get(interaction.commandName);
    if (!command) {
        yield interaction.reply({
            content: "There is no command like that.",
            ephemeral: true,
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
                yield interaction.reply({
                    content: `⏳ Please wait **${timeLeft} seconds** before using the \`${command.data.name}\` command again.`,
                    ephemeral: true,
                });
                return;
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    }
    try {
        yield command.execute(interaction);
    }
    catch (err) {
        console.error(err);
        yield interaction.reply({
            content: "There is an error while executing the command. If it persists, please report this issue.",
            ephemeral: true,
        });
    }
}));
client.once(discord_js_1.Events.ClientReady, () => {
    var _a;
    console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} logged in!`);
});
main();
