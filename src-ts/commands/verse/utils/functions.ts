import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { WEBSITE_URL } from "../../..";
import {
  VerseBothDTO,
  T_VerseBothDTOConstructorParametersJSON,
} from "../../../classes/Verse";
import { OK_RESPONSE_CODE, DEFAULT_LANG_CODE } from "../../../utility/consts";
import { Response, TVocalizationKey } from "../../../utility/types";
import { SCRIPTURE_DATA } from "../../../utility/util";

export const fetchVerse = async (
  scriptureNumber: number,
  sectionNumber: number,
  chapterNumber: number,
  verseNumber: number
): Promise<VerseBothDTO | null> => {
  try {
    const response = await axios.get<
      Response<T_VerseBothDTOConstructorParametersJSON>
    >(
      `/verse/${scriptureNumber}/${sectionNumber}/${chapterNumber}/${verseNumber}`
    );

    if (response.status === OK_RESPONSE_CODE)
      return VerseBothDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getEmbedForVerse = (
  verse: VerseBothDTO,
  preferredTranslationId: number | null,
  vocalizationKey: TVocalizationKey
) => {
  const verseNumber = verse.getNumber();

  const chapter = verse.getChapter();
  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionNumber = section.getNumber();

  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();

  const details = SCRIPTURE_DATA[scriptureCode];

  const verseText = verse.getTextOfVariationOrUsual(vocalizationKey);

  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const embed = new EmbedBuilder()
    .setTitle(
      `${scriptureMeaning} > ${sectionNumber}.${sectionMeaning}  > Chapter: ${chapterNumber} > Verse: ${verseNumber}`
    )
    .setURL(
      `${WEBSITE_URL}/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`
    )
    .addFields({ name: "Variation", value: verseText, inline: false });

  const selectedTranslationId =
    preferredTranslationId ?? details.getDefaultTranslationId();

  const preferredTranslationText = verse
    .getTranslationTexts()
    .find((tt) => tt.getTranslation().getId() === selectedTranslationId);

  if (preferredTranslationText === undefined) {
    const validTranslationsAndItsIds = verse
      .getTranslationTexts()
      .map((ttx) => ttx.getTranslation())
      .map((t) => `${t.getName()} - (${t.getId()})`)
      .join("\n");

    embed
      .addFields({
        name: "Translation not found",
        value: `There is no translation with id ${preferredTranslationId}`,
        inline: false,
      })
      .addFields({
        name: "Valid translations and their Identification Number:",
        value: validTranslationsAndItsIds,
        inline: false,
      });
    return embed.toJSON();
  }

  const translatorNamesGathered: string = preferredTranslationText
    .getTranslation()
    .getTranslatorNamesGathered();

  const otherTranslationsAndIdsString = verse
    .getTranslationTexts()
    .map((ttx) => ttx.getTranslation())
    .filter((tra) => tra.getId() !== selectedTranslationId)
    .map((t) => `${t.getName()} - (${t.getId()})`)
    .join("\n");

  embed
    .setDescription(preferredTranslationText.getText())
    .addFields({ name: "Variation", value: verseText, inline: false })
    .addFields({
      name: "Translation",
      value: `${preferredTranslationText
        .getTranslation()
        .getName()} - ${translatorNamesGathered}`,
      inline: false,
    })
    .addFields({
      name: "Valid translation names and id's",
      value: otherTranslationsAndIdsString,
      inline: false,
    });

  return embed.toJSON();
};
