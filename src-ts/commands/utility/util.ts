import { EmbedBuilder } from "discord.js";
import {
  AvailableScriptureCode,
  ScriptureDetails,
  ScriptureLimits,
  TranslationTextDTO,
  VerseCacheDTO,
  VerseDTO,
  VerseOriginalTextVariation,
} from "../../types/types";
import { SERVER_URL, WEBSITE_URL } from "../..";

const OK_RESPONSE_CODE = 200;

export const AvailableScriptureCodes: Record<
  AvailableScriptureCode,
  ScriptureDetails
> = {
  t: {
    number: 1,
    defaultTranslationId: 1,
  },
};

export const AvailableScripturesData: Record<
  AvailableScriptureCode,
  ScriptureLimits
> = {
  t: {
    enMeaning: "Torah",
    sections: [
      {
        enMeaning: "Genesis",
        chapters: [
          31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27,
          33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31,
          29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26,
        ],
      },
      {
        enMeaning: "Exodus",
        chapters: [
          22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16,
          27, 25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35,
          35, 38, 29, 31, 43, 38,
        ],
      },
      {
        enMeaning: "Leviticus",
        chapters: [
          17, 16, 17, 35, 26, 23, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30,
          37, 27, 24, 33, 44, 23, 55, 46, 34,
        ],
      },
      {
        enMeaning: "Numbers",
        chapters: [
          54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 35, 28,
          32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 39, 17, 54, 42, 56, 29,
          34, 13,
        ],
      },
      {
        enMeaning: "Deuteronomy",
        chapters: [
          46, 37, 29, 49, 30, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20,
          22, 21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12,
        ],
      },
      {
        enMeaning: "Joshua",
        chapters: [
          18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18,
          28, 51, 9, 45, 34, 16, 33,
        ],
      },
      {
        enMeaning: "Judges",
        chapters: [
          36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13,
          31, 30, 48, 25,
        ],
      },
      {
        enMeaning: "1 Samuel",
        chapters: [
          28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58,
          30, 24, 42, 16, 23, 28, 23, 44, 25, 12, 25, 11, 31, 13,
        ],
      },
      {
        enMeaning: "2 Samuel",
        chapters: [
          27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29,
          32, 44, 26, 22, 51, 39, 25,
        ],
      },
      {
        enMeaning: "1 Kings",
        chapters: [
          53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24,
          46, 21, 43, 29, 54,
        ],
      },
      {
        enMeaning: "2 Kings",
        chapters: [
          18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41,
          37, 37, 21, 26, 20, 37, 20, 30,
        ],
      },
      {
        enMeaning: "Isaiah",
        chapters: [
          31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7,
          25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22,
          38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 12, 17, 13, 12, 21, 14, 12,
          19, 11, 25, 24,
        ],
      },
      {
        enMeaning: "Jeremiah",
        chapters: [
          19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27,
          23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22,
          19, 32, 21, 28, 18, 16, 33, 24, 41, 30, 32, 34,
        ],
      },
      {
        enMeaning: "Ezekiel",
        chapters: [
          28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32,
          14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15,
          38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 35,
        ],
      },
      {
        enMeaning: "Hosea",
        chapters: [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10],
      },
      { enMeaning: "Joel", chapters: [20, 27, 5, 21] },
      { enMeaning: "Amos", chapters: [15, 16, 15, 13, 27, 14, 17, 14, 15] },
      { enMeaning: "Obadiah", chapters: [21] },
      { enMeaning: "Jonah", chapters: [16, 11, 10, 11] },
      { enMeaning: "Micah", chapters: [16, 13, 12, 14, 14, 16, 20] },
      { enMeaning: "Nahum", chapters: [14, 14, 19] },
      { enMeaning: "Habakkuk", chapters: [17, 20, 19] },
      { enMeaning: "Zephaniah", chapters: [18, 15, 20] },

      { enMeaning: "Haggai", chapters: [15, 23] },
      {
        enMeaning: "Zechariah",
        chapters: [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
      },
      { enMeaning: "Malachi", chapters: [14, 17, 24] },
      {
        enMeaning: "Psalms",
        chapters: [
          6, 12, 9, 9, 13, 11, 18, 10, 21, 18, 7, 9, 6, 7, 5, 11, 15, 51, 15,
          10, 14, 32, 6, 10, 22, 12, 14, 9, 11, 13, 25, 11, 22, 23, 28, 13, 40,
          23, 14, 18, 14, 12, 5, 27, 18, 12, 10, 15, 21, 23, 21, 11, 7, 9, 24,
          14, 12, 12, 18, 14, 9, 9, 5, 8, 29, 22, 35, 45, 48, 43, 14, 31, 7, 10,
          10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18,
          3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6,
        ],
      },
      {
        enMeaning: "Proverbs",
        chapters: [
          33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28,
          24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31,
        ],
      },
      {
        enMeaning: "Job",
        chapters: [
          22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16,
          21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16,
          33, 24, 41, 30, 32, 26, 17,
        ],
      },
      {
        enMeaning: "Song of Songs",
        chapters: [17, 17, 11, 16, 16, 12, 14, 14],
      },
      { enMeaning: "Ruth", chapters: [22, 23, 18, 22] },
      { enMeaning: "Lamentations", chapters: [22, 22, 66, 22, 22] },
      {
        enMeaning: "Ecclesiastes",
        chapters: [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14],
      },
      {
        enMeaning: "Esther",
        chapters: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
      },
      {
        enMeaning: "Danial",
        chapters: [21, 49, 33, 34, 30, 29, 28, 27, 27, 21, 45, 13],
      },
      { enMeaning: "Ezra", chapters: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44] },
      {
        enMeaning: "Nehemiah",
        chapters: [11, 20, 38, 17, 19, 19, 72, 18, 37, 40, 36, 47, 31],
      },
      {
        enMeaning: "1 Chronicles",
        chapters: [
          54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27,
          17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30,
        ],
      },
      {
        enMeaning: "2 Chronicles",
        chapters: [
          18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19,
          34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27,
          23,
        ],
      },
    ],
  },
};

export const isValidScriptureCode = (
  scriptureCode: string
): scriptureCode is AvailableScriptureCode =>
  scriptureCode in AvailableScripturesData;

export const isValidSection = (
  scriptureCode: string,
  sectionNumber: number
) => {
  if (!isValidScriptureCode(scriptureCode)) return false;

  return sectionNumber in AvailableScripturesData[scriptureCode];
};

export const isValidChapter = (
  scriptureCode: string,
  sectionNumber: number,
  chapterNumber: number
): boolean => {
  if (!isValidScriptureCode(scriptureCode)) return false;

  const chapterNumberIndex: number = chapterNumber - 1;

  return (
    AvailableScripturesData[scriptureCode].sections
      .at(sectionNumber - 1)
      ?.chapters?.at(chapterNumberIndex) !== undefined
  );
};

export const isValidVerse = (
  scriptureCode: string,
  sectionNumber: number,
  chapterNumber: number,
  verseNumber: number
) => {
  if (!isValidScriptureCode(scriptureCode)) return false;

  const sectionNumberIndex: number = sectionNumber - 1;
  const chapterNumberIndex: number = chapterNumber - 1;

  const verseNumberInData = AvailableScripturesData[scriptureCode].sections
    .at(sectionNumberIndex)
    ?.chapters?.at(chapterNumberIndex);

  if (verseNumberInData == undefined) return false;

  return verseNumber <= verseNumberInData;
};

export const isValidInformation = (
  scriptureCode: string,
  sectionNumber: number | null,
  chapterNumber: number | null,
  verseNumber: number | null
): string => {
  let output: string = "";

  if (!isValidScriptureCode(scriptureCode))
    return output.concat(`There is no scripture code with ${scriptureCode}`);

  const scripture = AvailableScripturesData[scriptureCode];

  if (sectionNumber == null) return output;

  const sectionNumberIndex: number = sectionNumber - 1;

  const section = scripture.sections.at(sectionNumberIndex);

  if (section == undefined)
    return output.concat(
      `There is no section with number: ${sectionNumber}, belonging to Scripture with code: ${scriptureCode}`
    );

  if (chapterNumber == null) return output;

  const chapterNumberIndex: number = chapterNumber - 1;

  const chapterVerseCount = section.chapters.at(chapterNumberIndex);

  if (chapterVerseCount == undefined)
    return output.concat(
      `There is no chapter with number: ${chapterNumber}, belonging to Scripture with code: ${scriptureCode} and section with number: ${sectionNumber}`
    );

  if (verseNumber == null) return output;

  const isVerseAvailable: boolean = verseNumber <= chapterVerseCount;

  if (!isVerseAvailable)
    return output.concat(
      `There is no verse with number: ${verseNumber}, belonging to Scripture with code: ${scriptureCode} and section with number: ${sectionNumber} and chapter with number: ${chapterNumber}. This chapter has ${chapterVerseCount} verse.`
    );

  return output;
};

export const fetchVerse = async (
  scriptureCode: AvailableScriptureCode,
  sectionNumber: number,
  chapterNumber: number,
  verseNumber: number
): Promise<VerseCacheDTO | null> => {
  const scripture = AvailableScriptureCodes[scriptureCode];
  const url = `${SERVER_URL}/verse/${scripture.number}/${sectionNumber}/${chapterNumber}/${verseNumber}`;

  const response = await fetch(url);

  if (response.status !== OK_RESPONSE_CODE) return null;

  const data: VerseDTO = (await response.json()).data;
  return verseDTOToVerseCacheDTO(data);
};

export const verseDTOToVerseCacheDTO = (verseDTO: VerseDTO): VerseCacheDTO => {
  const scriptureCode: AvailableScriptureCode =
    verseDTO.chapter.section.scripture.code;
  const sectionNumber: number = verseDTO.chapter.section.number;
  const chapterNumber: number = verseDTO.chapter.number;

  const scripture = AvailableScripturesData[scriptureCode];
  const section = scripture.sections.at(sectionNumber);

  const englishMeaningOfSection: string =
    section?.enMeaning ??
    "Unknown section. This should not be occurred, please report this issue by your command input.";

  const englishMeaningOfScripture: string = scripture.enMeaning;

  return {
    id: verseDTO.id,
    number: verseDTO.number,
    text: verseDTO.text,
    chapterNumber,
    sectionNumber,
    scriptureCode,
    textSimplified: verseDTO.textSimplified,
    textWithoutVowel: verseDTO.textWithoutVowel,
    englishMeaningOfSection,
    englishMeaningOfScripture,
    translationTexts: verseDTO.translationTexts,
  };
};

export const UNDEFINED_TRANSLATION_TEXT: TranslationTextDTO = {
  translation: {
    id: 0,
    name: "Unknown Translation",
    language: {
      langCode: "un",
      langEnglish: "Unknown",
      langOwn: "Unknown",
    },
    isEager: false,
    translators: [],
  },
  footNotes: [],
  text: "Translation you have selected did not translated the verse you want to read or something went wrong. Try default translation, if this situation persists, feel free to report this.",
};

export const getEmbedResponse = (
  verse: VerseCacheDTO,
  translationId: number | null,
  textVariation: VerseOriginalTextVariation
) => {
  const scriptureCode: AvailableScriptureCode = verse.scriptureCode;
  const sectionNumber: number = verse.sectionNumber;
  const chapterNumber: number = verse.chapterNumber;
  const verseNumber: number = verse.number;

  const verseText: string = verse[textVariation] ?? verse.text;

  const scriptureOfVerse = AvailableScriptureCodes[verse.scriptureCode];

  const scriptureMeaning: string = getScriptureMeaning(scriptureCode);

  const sectionMeaning: string = getSectionMeaning(
    scriptureCode,
    sectionNumber
  );

  const preferredTranslation: TranslationTextDTO =
    verse.translationTexts.find(
      (t) =>
        t.translation.id ==
        (translationId ?? scriptureOfVerse.defaultTranslationId)
    ) ?? UNDEFINED_TRANSLATION_TEXT;

  const translatorNamesGathered: string =
    preferredTranslation.translation.translators.map((t) => t.name).join(", ");

  const embed = new EmbedBuilder()
    .setTitle(
      `${scriptureMeaning} > ${sectionMeaning} (${sectionNumber}) > Chapter: ${chapterNumber}, ${verseNumber}`
    )
    .setURL(
      `${WEBSITE_URL}/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`
    )
    .setDescription(preferredTranslation.text)
    .addFields({ name: "Original Text", value: verseText, inline: false })
    .addFields({
      name: "Translation",
      value: `${preferredTranslation.translation.name} - ${translatorNamesGathered}`,
      inline: false,
    });

  return embed;
};

const getSectionMeaning = (
  scriptureCode: AvailableScriptureCode,
  sectionNumber: number
) =>
  AvailableScripturesData[scriptureCode].sections.at(sectionNumber - 1)
    ?.enMeaning ?? "Section";

const getScriptureMeaning = (scriptureCode: AvailableScriptureCode) =>
  AvailableScripturesData[scriptureCode].enMeaning;
