import axios from "axios";
import {
  ChapterUpperAndOneLevelLowerDTO,
  T_ChapterUpperAndOneLevelLowerDTOConstructorParametersJSON,
} from "../../../classes/Chapter";
import { Response } from "../../../utility/types";
import { DEFAULT_LANG_CODE, OK_RESPONSE_CODE } from "../../../utility/consts";
import { EmbedBuilder } from "discord.js";
import { WEBSITE_URL } from "../../..";

export const fetchChapter = async (
  scriptureNumber: number,
  sectionNumber: number,
  chapterNumber: number
): Promise<ChapterUpperAndOneLevelLowerDTO | null> => {
  try {
    const response = await axios.get<
      Response<T_ChapterUpperAndOneLevelLowerDTOConstructorParametersJSON>
    >(`/verse/${scriptureNumber}/${sectionNumber}/${chapterNumber}`);

    if (response.status === OK_RESPONSE_CODE)
      return ChapterUpperAndOneLevelLowerDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getEmbedForChapter = (
  chapter: ChapterUpperAndOneLevelLowerDTO
) => {
  const verseCount = chapter.getVerses().length;

  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionName = section.getName();
  const sectionNumber = section.getNumber();
  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();

  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const embed = new EmbedBuilder()
    .setTitle(
      `${scriptureMeaning} > ${sectionNumber}.${sectionMeaning}  > Chapter: ${chapterNumber}`
    )
    .setURL(`${WEBSITE_URL}/${scriptureCode}/${sectionNumber}/${chapterNumber}`)
    .addFields({
      name: `This Chapter of Section (${sectionMeaning} [${sectionName}]) has consist of ${verseCount} verses. `,
      value: "",
      inline: true,
    })
    .toJSON();

  return embed;
};
