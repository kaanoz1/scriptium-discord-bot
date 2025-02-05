import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
} from "discord.js";
import {
  AvailableScriptureCode,
  Command,
  VerseCacheDTO,
  VerseOriginalTextVariation,
} from "../types/types";
import {
  fetchVerse,
  getEmbedResponse,
  isValidInformation,
} from "./utility/util";
import { getCache, setCache } from "./utility/db";

export const command: Command = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("read")
    .setDescription("Retrieves Scripture data based on provided parameters.")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("scripture_code")
        .setDescription("Which scripture? e.g. t for Torah etc.")
        .addChoices({ name: "Torah", value: "t" })
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("section_number")
        .setDescription("Section number.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("chapter_number")
        .setDescription("Chapter number.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("verse_number")
        .setDescription("Verse number.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("translation")
        .setDescription("(Optional) Translation you want.")
        .addChoices({
          name: "The Contemporary Torah",
          value: 1,
        })
        .setRequired(false)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("original_text_variation")
        .setDescription(
          "(Optional) Variation of text. If not available, then default variation (text) will be displayed."
        )
        .addChoices(
          {
            name: "Normal",
            value: "text",
          },
          { name: "Simplified", value: "textSimplified" },
          { name: "Without Vowel", value: "textWithoutVowel" }
        )
        .setRequired(false)
    ),

  execute: async (interaction: ChatInputCommandInteraction) => {
    const scriptureCode = interaction.options.getString(
      "scripture_code",
      true
    ) as AvailableScriptureCode;

    const sectionNumber = interaction.options.getInteger(
      "section_number",
      true
    );
    const chapterNumber = interaction.options.getInteger(
      "chapter_number",
      true
    );
    const verseNumber = interaction.options.getInteger("verse_number", true);

    const textVariation: VerseOriginalTextVariation =
      (interaction.options.getString(
        "original_text_variation",
        false
      ) as VerseOriginalTextVariation) ?? "text";

    const translationId = interaction.options.getInteger("translation", false);

    const errorMessage: string = isValidInformation(
      scriptureCode,
      sectionNumber,
      chapterNumber,
      verseNumber
    );

    if (errorMessage) {
      await interaction.reply({ content: errorMessage, ephemeral: true });
      return;
    }

    //TODO: Further cache mechanism.
    const cacheKey = `${scriptureCode}-${sectionNumber}-${chapterNumber}-${verseNumber}`;

    const cachedVerse = await getCache<VerseCacheDTO>(cacheKey);

    if (cachedVerse) {
      const embed = getEmbedResponse(cachedVerse, translationId, textVariation);

      await interaction.reply({ embeds: [embed] });
      return;
    }

    const verse = await fetchVerse(
      scriptureCode,
      sectionNumber,
      chapterNumber,
      verseNumber
    );

    if (verse == null) {
      await interaction.reply(
        `📥 Something went unexpectadly wrong, if it persists, please report this issue.`
      );
      return;
    }

    const SECONDS_IN_ONE_DAY: number = 60 * 60 * 24 * 10;

    await setCache(cacheKey, verse, SECONDS_IN_ONE_DAY);

    const embed = getEmbedResponse(verse, translationId, textVariation);

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
