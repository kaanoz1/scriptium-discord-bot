import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../utility/types";

export const command: Command = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Useful to test if bot is alive.")
    .toJSON(),

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply("I live!");
  },
};

export default command;
