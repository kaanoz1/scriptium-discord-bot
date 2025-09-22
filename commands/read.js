"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("./utility/util");
const db_1 = require("./utility/db");
exports.command = {
    cooldown: 5,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("read")
        .setDescription("Retrieves Scripture data based on provided parameters.")
        .addStringOption((option) => option
        .setName("scripture_code")
        .setDescription("Which scripture? e.g. t for Torah etc.")
        .addChoices({ name: "Torah", value: "t" })
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName("section_number")
        .setDescription("Section number.")
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName("chapter_number")
        .setDescription("Chapter number.")
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName("verse_number")
        .setDescription("Verse number.")
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName("translation")
        .setDescription("(Optional) Translation you want.")
        .addChoices({
        name: "The Contemporary Torah",
        value: 1,
    })
        .setRequired(false))
        .addStringOption((option) => option
        .setName("original_text_variation")
        .setDescription("(Optional) Variation of text. If not available, then default variation (text) will be displayed.")
        .addChoices({
        name: "Normal",
        value: "text",
    }, { name: "Simplified", value: "textSimplified" }, { name: "Without Vowel", value: "textWithoutVowel" })
        .setRequired(false))
        .toJSON(),
    execute: async (interaction) => {
        const scriptureCode = interaction.options.getString("scripture_code", true);
        const sectionNumber = interaction.options.getInteger("section_number", true);
        const chapterNumber = interaction.options.getInteger("chapter_number", true);
        const verseNumber = interaction.options.getInteger("verse_number", true);
        const textVariation = interaction.options.getString("original_text_variation", false) ?? "text";
        const translationId = interaction.options.getInteger("translation", false);
        const errorMessage = (0, util_1.isValidInformation)(scriptureCode, sectionNumber, chapterNumber, verseNumber);
        if (errorMessage) {
            await interaction.reply({ content: errorMessage });
            return;
        }
        //TODO: Further cache mechanism.
        const cacheKey = `${scriptureCode}-${sectionNumber}-${chapterNumber}-${verseNumber}`;
        const cachedVerse = await (0, db_1.getCache)(cacheKey);
        if (cachedVerse) {
            const embed = (0, util_1.getEmbedResponse)(cachedVerse, translationId, textVariation);
            await interaction.reply({ embeds: [embed] });
            return;
        }
        const verse = await (0, util_1.fetchVerse)(scriptureCode, sectionNumber, chapterNumber, verseNumber);
        if (verse == null) {
            await interaction.reply(`📥 Something went unexpectadly wrong, if it persists, please report this issue.`);
            return;
        }
        const SECONDS_IN_ONE_DAY = 60 * 60 * 24 * 10;
        await (0, db_1.setCache)(cacheKey, verse, SECONDS_IN_ONE_DAY);
        const embed = (0, util_1.getEmbedResponse)(verse, translationId, textVariation);
        await interaction.reply({ embeds: [embed] });
    },
};
exports.default = exports.command;
