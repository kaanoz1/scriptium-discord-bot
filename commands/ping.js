"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    cooldown: 3,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Useful to test if bot is alive.")
        .toJSON(),
    execute: async (interaction) => {
        await interaction.reply("I live!");
    },
};
exports.default = exports.command;
