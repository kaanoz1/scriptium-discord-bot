import dotenv from "dotenv";
import {
  Client,
  GatewayIntentBits,
  Events,
  Interaction,
  Collection,
} from "discord.js";

import pingCommand from "./commands/ping";
import { Command } from "./utility/types";
import verseCommand from "./commands/verse/command";
import chapterCommand from "./commands/chapter/command";
import sectionCommand from "./commands/section/command";
import scriptureCommand from "./commands/scripture/command";

dotenv.config();

//https://discord.com/oauth2/authorize?client_id=1336220556227383327

const discordBotToken: string | undefined = process.env["DISCORD_BOT_TOKEN"];
export const SERVER_URL: string | undefined = process.env["SERVER_URL"];
export const WEBSITE_URL: string | undefined = process.env["WEBSITE_URL"];
if (!discordBotToken)
  throw new Error("DISCORD_BOT_TOKEN env variable is not set.");

if (!SERVER_URL) throw new Error("SERVER_URL env variable is not set.");
if (!WEBSITE_URL) throw new Error("WEBSITE_URL env variable is not set.");

const commands: Array<Command> = [
  scriptureCommand,
  sectionCommand,
  chapterCommand,
  verseCommand,
  pingCommand,
];
const commandMap = new Collection<string, Command>();
const cooldowns = new Collection<string, Collection<string, number>>();

for (const cmd of commands) commandMap.set(cmd.data.name, cmd);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commandMap.get(interaction.commandName);
  if (!command) {
    await interaction.reply({
      content: "❌ This command doesn't exist.",
    });
    return;
  }

  if (command.cooldown) {
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection<string, number>());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name)!;
    const cooldownAmount = command.cooldown * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id)! + cooldownAmount;

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
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "⚠️ There was an error executing the command.",
    });
  }
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
  console.log(commands);
});

client.login(discordBotToken);
