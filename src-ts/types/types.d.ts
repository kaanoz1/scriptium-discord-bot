import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  cooldown?: number;
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export type AvailableScriptureCode = "t";

export type VerseDTO = {
  id: number;
  number: number;
  text: string;
  textWithoutVowel: string | null;
  textSimplified: string | null;
  chapter: ChapterDTO;
  words: WordConfinedDTO[];
  transliterations: TransliterationDTO[];
  translationTexts: TranslationTextDTO[];
  isSaved: false;
};

export type VerseCacheDTO = {
  id: number;
  number: number;
  text: string;
  chapterNumber: number;
  sectionNumber: number;
  scriptureCode: AvailableScriptureCode;
  textWithoutVowel: string | null;
  textSimplified: string | null;
  englishMeaningOfSection: string;
  englishMeaningOfScripture: string;
  translationTexts: TranslationTextDTO[];
};

export type ChapterDTO = {
  name: string;
  number: number;
  section: SectionDTO;
  meanings: Meaning[];
};

export type TransliterationDTO = {
  transliteration: string;
  language: LanguageDTO;
};
export type WordConfinedDTO = {
  sequenceNumber: number;
  text: string;
  textWithoutVowel: string | null;
  textSimplified: string | null;
  roots: RootSimpleDTO[];
};

export type RootSimpleDTO = {
  latin: string;
  own: string;
};

export type TranslationTextDTO = {
  text: string;
  translation: TranslationDTO;
  footNotes: FootNoteDTO[];
};

export type TranslationDTO = {
  id: number;
  name: string;
  language: LanguageDTO;
  translators: TranslatorDTO[];
  isEager: boolean;
};

export type FootNoteDTO = { index: number; text: string };

export type TranslatorDTO = {
  name: string;
  url: string | null;
  language: LanguageDTO;
};
export type SectionDTO = {
  name: string;
  number: number;
  scripture: ScriptureDTO;
  meanings: Meaning[];
};

export type ScriptureDTO = {
  id: number;
  name: string;
  code: AvailableScriptureCode;
  number: number;
  sections: SectionWithMeaningDTO[];
  meanings: Meaning[];
};

export type SectionWithMeaningDTO = {
  meanings: Meaning[];
  name: string;
};

export type Meaning = {
  meaning: string;
  language: LanguageDTO;
};

export type LanguageDTO = {
  langCode: string;
  langOwn: string;
  langEnglish: string;
};

export type ScriptureDetails = {
  number: number;
  defaultTranslationId: number;
};

export type ScriptureLimits = {
  enMeaning: string;
  sections: SectionLimits[];
};

export type SectionLimits = {
  enMeaning: string;
  chapters: ChapterLimits;
};

export type ChapterLimits = number[];

export type VerseOriginalTextVariation =
  | "text"
  | "textSimplified"
  | "textWithoutVowel";
