import axios from "axios";
import {
  SectionOneLevelBothDTO,
  T_SectionOneLevelBothDTOConstructorParametersJSON,
} from "../../../classes/Section";
import { DEFAULT_LANG_CODE, OK_RESPONSE_CODE } from "../../../utility/consts";
import { Response } from "../../../utility/types";
import { EmbedBuilder } from "discord.js";
import { WEBSITE_URL } from "../../..";

export const fetchSection = async (
  scriptureCode: number,
  sectionNumber: number
): Promise<SectionOneLevelBothDTO | null> => {
  try {
    const response = await axios.get<
      Response<T_SectionOneLevelBothDTOConstructorParametersJSON>
    >(`/verse/${scriptureCode}/${sectionNumber}`);

    if (response.status === OK_RESPONSE_CODE)
      return SectionOneLevelBothDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    return null;
  }
};

export const getEmbedForSection = (section: SectionOneLevelBothDTO) => {
  const chapterCount = section.getChapterCount();

  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionName = section.getName();
  const sectionNumber = section.getNumber();
  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();

  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const embed = new EmbedBuilder()
    .setTitle(
      `${scriptureMeaning} > ${sectionNumber}.${sectionMeaning} (${sectionName})`
    )
    .setURL(`${WEBSITE_URL}/${scriptureCode}/${sectionNumber}`)
    .addFields({
      name: `Section (${sectionNumber}. ${sectionMeaning} [${sectionName}]) is consist of ${chapterCount}`,
      value: "",
      inline: true,
    })
    .toJSON();

  return embed;
};
