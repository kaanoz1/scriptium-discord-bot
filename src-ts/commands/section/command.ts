import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
} from "discord.js";
import { Command } from "../../utility/types";
import { isValidScriptureCode } from "../../utility/func";
import { getCachedEmbed, setCache } from "../../utility/db";
import { SCRIPTURE_DATA } from "../../utility/util";
import { fetchSection, getEmbedForSection } from "./utils/functions";

export const command: Command = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("section")
    .setDescription("Retrieves Section data based on provided parameters.")

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

    .toJSON(),

  execute: async (interaction: ChatInputCommandInteraction) => {
    const scriptureCodeParam = interaction.options.getString(
      "scripture_code",
      true
    );

    if (!isValidScriptureCode(scriptureCodeParam)) {
      await interaction.reply({
        content: `There is no scripture found for code: ${scriptureCodeParam}`,
      });
      return;
    }

    const scriptureCode = scriptureCodeParam;

    const sectionNumber = interaction.options.getInteger(
      "section_number",
      true
    );

    const cacheKey = `section-${scriptureCode}-${sectionNumber}`;

    const cachedEmbed = await getCachedEmbed(cacheKey);

    if (cachedEmbed) {
      await interaction.reply({ embeds: [cachedEmbed] });
      return;
    }

    const details = SCRIPTURE_DATA[scriptureCode];
    const scriptureNumber = details.getNumber();

    const section = await fetchSection(scriptureNumber, sectionNumber);

    if (!section) {
      await interaction.reply(
        `📥 Something went unexpectedly wrong. If the issue persists, please report it.`
      );
      return;
    }

    const embed = getEmbedForSection(section);
    const SECONDS_IN_TEN_DAYS = 60 * 60 * 24 * 10;

    await setCache(cacheKey, embed, SECONDS_IN_TEN_DAYS);
    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
