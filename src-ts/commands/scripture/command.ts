import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import { Command } from "../../utility/types";
import { isValidScriptureCode } from "../../utility/func";
import { getCachedEmbed, setCache } from "../../utility/db";
import { SCRIPTURE_DATA } from "../../utility/util";
import { fetchScripture, getEmbedForScripture } from "./utils/function";

export const command: Command = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("scripture")
    .setDescription(
      "Displays a list of all sections (e.g. Genesis, Exodus) belonging to the specified scripture, including their names and numbering."
    )

    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("scripture_code")
        .setDescription("Which scripture? e.g. t for Torah etc.")
        .addChoices({ name: "Torah", value: "t" })
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

    const cacheKey = `scripture-${scriptureCode}`;

    const cachedEmbed = await getCachedEmbed(cacheKey);

    if (cachedEmbed) {
      await interaction.reply({ embeds: [cachedEmbed] });
      return;
    }

    const details = SCRIPTURE_DATA[scriptureCode];
    const scriptureNumber = details.getNumber();

    const scripture = await fetchScripture(scriptureNumber);

    if (!scripture) {
      await interaction.reply(
        `📥 Something went unexpectedly wrong. If the issue persists, please report it.`
      );
      return;
    }

    const embed = getEmbedForScripture(scripture);
    const SECONDS_IN_TEN_DAYS = 60 * 60 * 24 * 10;

    await setCache(cacheKey, embed, SECONDS_IN_TEN_DAYS);
    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
