import axios from "axios";
import {
  ScriptureOneLevelLowerDTO,
  T_ScriptureOneLevelLowerDTOConstructorParametersJSON,
} from "../../../classes/Scripture";
import { Response } from "../../../utility/types";
import { DEFAULT_LANG_CODE, OK_RESPONSE_CODE } from "../../../utility/consts";
import { WEBSITE_URL } from "../../..";
import { APIEmbed, EmbedBuilder } from "discord.js";

export const getEmbedForScripture = (
  scripture: ScriptureOneLevelLowerDTO
): APIEmbed => {
  const scriptureCode = scripture.getCode();
  const scriptureName = scripture.getName();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const sectionLines = scripture
    .getSections()
    .map(
      (e) =>
        `**${e.getNumber()}.** ${e.getMeaningTextOrDefault(
          DEFAULT_LANG_CODE
        )} (_${e.getName()}_)`
    );

  // Discord field value max: 1024 chars. Parçalara ayır.
  const fields = [];
  let currentChunk = "";

  for (const line of sectionLines) {
    if ((currentChunk + "\n" + line).length > 1000) {
      fields.push(currentChunk);
      currentChunk = line;
    } else {
      currentChunk += "\n" + line;
    }
  }
  if (currentChunk) fields.push(currentChunk);

  const embed = new EmbedBuilder()
    .setTitle(`${scriptureMeaning}`)
    .setURL(`${WEBSITE_URL}/${scriptureCode}`)
    .addFields(
      fields.map((chunk, index) => ({
        name:
          index === 0
            ? `Sections of Scripture (${scriptureMeaning} [${scriptureName}])`
            : "Continued...",
        value: chunk,
        inline: false,
      }))
    )
    .toJSON();

  return embed;
};

export const fetchScripture = async (
  scriptureNumber: number
): Promise<ScriptureOneLevelLowerDTO | null> => {
  try {
    const response = await axios.get<
      Response<T_ScriptureOneLevelLowerDTOConstructorParametersJSON>
    >(`/verse/${scriptureNumber}`);

    if (response.status === OK_RESPONSE_CODE)
      return ScriptureOneLevelLowerDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    return null;
  }
};
