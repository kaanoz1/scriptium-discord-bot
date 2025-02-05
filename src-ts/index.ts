import dotenv from "dotenv";

dotenv.config();

const discordBotToken: string | undefined = process.env["DISCORD_BOT_TOKEN"];
const clientId: string | undefined = process.env["DISCORD_CLIENT_ID"];
const guildId: string | undefined = process.env["GUILD_ID"];
export const SERVER_URL: string | undefined = process.env["SERVER_URL"];
export const WEBSITE_URL: string | undefined = process.env["WEBSITE_URL"];

if (!discordBotToken || !clientId || !guildId || !SERVER_URL || !WEBSITE_URL)
  throw new Error("Some of env variables are not initialized.");

import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Interaction,
  Events,
  Collection,
} from "discord.js";
import { Command } from "./types/types";
import readCommand from "./commands/read";

const commands: Array<Command> = [readCommand];

const commandMap = new Collection<string, Command>();
for (const cmd of commands) commandMap.set(cmd.data.name, cmd);

const cooldowns = new Collection<string, Collection<string, number>>();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const rest = new REST({ version: "10" }).setToken(discordBotToken);

const main: () => Promise<void> = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map((cmd) => cmd.data.toJSON()),
    });

    client.login(discordBotToken);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commandMap.get(interaction.commandName);

  if (!command) {
    await interaction.reply({
      content: "There is no command like that.",
      ephemeral: true,
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
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content:
        "There is an error while executing the command. If it persists, please report this issue.",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, () => {
  console.log(`${client.user?.tag} logged in!`);
});

main();
