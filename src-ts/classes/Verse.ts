import { TLangCode, TVocalizationKey } from "../utility/types";
import {
  ChapterUpperDTO,
  ChapterDTO,
  ChapterUpperConfinedDTO,
  ChapterUpperMeanDTO,
  T_ChapterUpperDTOConstructorParametersJSON,
  T_ChapterOneLevelUpperDTOConstructorParametersJSON,
  ChapterOneLevelUpperDTO,
  T_ChapterUpperConfinedDTOConstructorParametersJSON,
} from "./Chapter";
import {
  T_TranslationTextDTOConstructorParametersJSON,
  TranslationTextDTO,
} from "./TranslationText";
import {
  T_TransliterationDTOConstructorParametersJSON,
  TransliterationDTO,
} from "./Transliteration";
import {
  WordDTO,
  WordLowerDTO,
  WordLowerConfinedDTO,
  T_WordDTOConstructorParametersJSON,
  T_WordLowerDTOConstructorParametersJSON,
  T_WordLowerConfinedDTOConstructorParametersJSON,
} from "./Word";

export type T_TextVariationDTOConstructorParameters = {
  usual: string;
  simplified: string | null;
  withoutVowel: string | null;
};
export type T_TextVariationDTOConstructorParametersJSON =
  T_TextVariationDTOConstructorParameters;

export class TextVariationDTO {
  private readonly usual: string;
  private readonly simplified: string | null;
  private readonly withoutVowel: string | null;

  constructor(data: T_TextVariationDTOConstructorParameters) {
    this.usual = data.usual;
    this.simplified = data.simplified;
    this.withoutVowel = data.withoutVowel;
  }

  static createFromJSON(
    data: T_TextVariationDTOConstructorParametersJSON
  ): TextVariationDTO {
    return new TextVariationDTO({ ...data });
  }

  getUsual(): string {
    return this.usual;
  }

  getSimplified(): string | null {
    return this.simplified;
  }

  getWithoutVowel(): string | null {
    return this.withoutVowel;
  }

  getTextWithVariation(key: TVocalizationKey): string | null {
    return this[key];
  }
}

export type T_VerseBaseDTOConstructorParameters = {
  id: number;
  number: number;
  variation: TextVariationDTO;
};

export type T_VerseBaseDTOConstructorParametersJSON = {
  id: number;
  number: number;
  variation: T_TextVariationDTOConstructorParametersJSON;
};

export abstract class VerseBaseDTO {
  protected readonly id: number;
  protected readonly number: number;
  protected readonly variation: TextVariationDTO;

  constructor(data: T_VerseBaseDTOConstructorParameters) {
    this.id = data.id;
    this.number = data.number;
    this.variation = data.variation;
  }

  getId(): number {
    return this.id;
  }

  getNumber(): number {
    return this.number;
  }

  getTextVariation(): Readonly<TextVariationDTO> {
    return this.variation;
  }
}

export type T_VerseSimpleDTOConstructorParameters =
  T_VerseBaseDTOConstructorParameters & {
    transliterations: Array<TransliterationDTO>;
    translationTexts: Array<TranslationTextDTO>;
    isSaved: boolean;
  };
export type T_VerseSimpleDTOConstructorParametersJSON =
  T_VerseBaseDTOConstructorParametersJSON & {
    transliterations: Array<T_TransliterationDTOConstructorParametersJSON>;
    translationTexts: Array<T_TranslationTextDTOConstructorParametersJSON>;
    isSaved: boolean;
  };

export abstract class VerseSimpleDTO extends VerseBaseDTO {
  protected readonly _transliterations: ReadonlyArray<TransliterationDTO>;
  protected readonly _translationTexts: ReadonlyArray<TranslationTextDTO>;
  protected readonly _isSaved: boolean;

  constructor(data: T_VerseSimpleDTOConstructorParameters) {
    super({ ...data });

    this._transliterations = data.transliterations;
    this._translationTexts = data.translationTexts;
    this._isSaved = data.isSaved;
  }

  getVariation(): Readonly<TextVariationDTO> {
    return Object.freeze(this.variation);
  }

  getTransliterations(): ReadonlyArray<TransliterationDTO> {
    return Object.freeze([...this._transliterations]);
  }

  getTextOfVariationOrUsual(variation: TVocalizationKey) {
    return (
      this.getVariation().getTextWithVariation(variation) ??
      this.getVariation().getUsual()
    );
  }

  getTransliterationTextOrNull(langCode: TLangCode): string | null {
    return (
      this.getTransliterations()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getTransliteration() ?? null
    );
  }

  getTranslationTexts(): ReadonlyArray<TranslationTextDTO> {
    return Object.freeze([...this._translationTexts]);
  }

  getIsSaved(): boolean {
    return this._isSaved;
  }
}

export type T_VerseDTOConstructorParameters =
  T_VerseSimpleDTOConstructorParameters;
export type T_VerseDTOConstructorParametersJSON =
  T_VerseSimpleDTOConstructorParametersJSON;

export class VerseDTO extends VerseSimpleDTO {
  constructor(data: T_VerseDTOConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(data: T_VerseDTOConstructorParametersJSON): VerseDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const transliterations = data.transliterations.map(
      TransliterationDTO.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationTextDTO.createFromJSON
    );
    return new VerseDTO({
      ...data,
      variation,
      transliterations,
      translationTexts,
    });
  }
}

export type T_VerseUpperDTOConstructorParameters =
  T_VerseSimpleDTOConstructorParameters & { chapter: ChapterUpperDTO };
export type T_VerseUpperDTOConstructorParametersJSON =
  T_VerseSimpleDTOConstructorParametersJSON & {
    chapter: T_ChapterUpperDTOConstructorParametersJSON;
  };

export class VerseUpperDTO extends VerseDTO {
  private readonly _chapter: ChapterUpperDTO;

  constructor(data: T_VerseUpperDTOConstructorParameters) {
    super({ ...data });

    this._chapter = data.chapter;
  }

  static override createFromJSON(
    data: T_VerseUpperDTOConstructorParametersJSON
  ): VerseUpperDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const chapter = ChapterUpperDTO.createFromJSON(data.chapter);
    const transliterations = data.transliterations.map(
      TransliterationDTO.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationTextDTO.createFromJSON
    );
    return new VerseUpperDTO({
      ...data,
      variation,
      chapter,
      transliterations,
      translationTexts,
    });
  }

  getChapter(): Readonly<ChapterUpperDTO> {
    return Object.freeze(this._chapter);
  }
}

export type T_VerseOneLevelUpperDTOConstructorParameters =
  T_VerseDTOConstructorParameters & { chapter: ChapterDTO };
export type T_VerseOneLevelUpperDTOConstructorParametersJSON =
  T_VerseDTOConstructorParametersJSON & {
    chapter: T_ChapterOneLevelUpperDTOConstructorParametersJSON;
  };

export class VerseOneLevelUpperDTO extends VerseDTO {
  private readonly _chapter: ChapterDTO;

  constructor(data: T_VerseOneLevelUpperDTOConstructorParameters) {
    super({ ...data });
    this._chapter = data.chapter;
  }

  static override createFromJSON(
    data: T_VerseOneLevelUpperDTOConstructorParametersJSON
  ): VerseOneLevelUpperDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const chapter = ChapterOneLevelUpperDTO.createFromJSON(data.chapter);
    const transliterations = data.transliterations.map(
      TransliterationDTO.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationTextDTO.createFromJSON
    );
    return new VerseOneLevelUpperDTO({
      ...data,
      variation,
      transliterations,
      translationTexts,
      chapter,
    });
  }

  getChapter(): Readonly<ChapterDTO> {
    return Object.freeze(this._chapter);
  }
}

export type T_VerseOneLevelLowerDTOConstructorParameters =
  T_VerseDTOConstructorParameters & { words: Array<WordDTO> };
export type T_VerseOneLevelLowerDTOConstructorParametersJSON =
  T_VerseDTOConstructorParametersJSON & {
    words: Array<T_WordDTOConstructorParametersJSON>;
  };

export class VerseOneLevelLowerDTO extends VerseDTO {
  private readonly _words: Array<WordDTO>;

  constructor(data: T_VerseOneLevelLowerDTOConstructorParameters) {
    super({ ...data });

    this._words = data.words;
  }

  static override createFromJSON(
    data: T_VerseOneLevelLowerDTOConstructorParametersJSON
  ): VerseOneLevelLowerDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const words = data.words.map((w) => WordDTO.createFromJSON(w));
    const transliterations = data.transliterations.map(
      TransliterationDTO.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationTextDTO.createFromJSON
    );
    return new VerseOneLevelLowerDTO({
      ...data,
      words,
      variation,
      transliterations,
      translationTexts,
    });
  }

  getWords(): ReadonlyArray<WordDTO> {
    return Object.freeze([...this._words]);
  }
}

export type T_VerseLowerDTOConstructorParameters =
  T_VerseDTOConstructorParameters & { words: Array<WordLowerDTO> };
export type T_VerseLowerDTOConstructorParametersJSON =
  T_VerseDTOConstructorParametersJSON & {
    words: Array<T_WordLowerDTOConstructorParametersJSON>;
  };

export class VerseLowerDTO extends VerseDTO {
  private readonly _words: Array<WordLowerDTO>;

  constructor(data: T_VerseLowerDTOConstructorParameters) {
    super({ ...data });
    this._words = data.words;
  }

  static override createFromJSON(
    data: T_VerseLowerDTOConstructorParametersJSON
  ): VerseLowerDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const words = data.words.map((w) => WordLowerDTO.createFromJSON(w));
    const transliterations = data.transliterations.map(
      TransliterationDTO.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationTextDTO.createFromJSON
    );
    return new VerseLowerDTO({
      ...data,
      words,
      variation,
      transliterations,
      translationTexts,
    });
  }

  getWords(): ReadonlyArray<WordLowerDTO> {
    return Object.freeze([...this._words]);
  }
}

export type T_VerseBothDTOConstructorParameters =
  T_VerseDTOConstructorParameters & {
    chapter: ChapterUpperDTO;
    words: Array<WordLowerDTO>;
  };
export type T_VerseBothDTOConstructorParametersJSON =
  T_VerseDTOConstructorParametersJSON & {
    chapter: T_ChapterUpperDTOConstructorParametersJSON;
    words: Array<T_WordLowerDTOConstructorParametersJSON>;
  };

export class VerseBothDTO extends VerseDTO {
  private readonly chapter: ChapterUpperDTO;
  private readonly _words: Array<WordLowerDTO>;

  constructor(data: T_VerseBothDTOConstructorParameters) {
    super({ ...data });

    this.chapter = data.chapter;
    this._words = data.words;
  }

  static override createFromJSON(
    data: T_VerseBothDTOConstructorParametersJSON
  ): VerseBothDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const words = data.words.map((w) => WordLowerDTO.createFromJSON(w));
    const chapter = ChapterUpperDTO.createFromJSON(data.chapter);
    const transliterations = data.transliterations.map(
      TransliterationDTO.createFromJSON
    );
    const translationTexts = data.translationTexts.map(
      TranslationTextDTO.createFromJSON
    );
    return new VerseBothDTO({
      ...data,
      variation,
      words,
      chapter,
      transliterations,
      translationTexts,
    });
  }

  getChapter(): Readonly<ChapterUpperDTO> {
    return Object.freeze(this.chapter);
  }

  getWords(): ReadonlyArray<WordLowerDTO> {
    return Object.freeze([...this._words]);
  }
}

export type T_VerseConfinedDTOConstructorParameters =
  T_VerseBaseDTOConstructorParameters;
export type T_VerseConfinedDTOConstructorParametersJSON =
  T_VerseDTOConstructorParametersJSON;

export abstract class VerseConfinedDTO extends VerseBaseDTO {
  constructor(data: T_VerseConfinedDTOConstructorParameters) {
    super({ ...data });
  }
}

export type T_VerseUpperConfinedDTOConstructorParameters =
  T_VerseConfinedDTOConstructorParameters & {
    chapter: ChapterUpperConfinedDTO;
  };
export type T_VerseUpperConfinedDTOConstructorParametersJSON =
  T_VerseConfinedDTOConstructorParametersJSON & {
    chapter: T_ChapterUpperConfinedDTOConstructorParametersJSON;
  };

export class VerseUpperConfinedDTO extends VerseConfinedDTO {
  private readonly _chapter: Readonly<ChapterUpperConfinedDTO>;

  constructor(data: T_VerseUpperConfinedDTOConstructorParameters) {
    super({ ...data });
    this._chapter = data.chapter;
  }

  static createFromJSON(
    data: T_VerseUpperConfinedDTOConstructorParametersJSON
  ): VerseUpperConfinedDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const chapter = ChapterUpperConfinedDTO.createFromJSON(data.chapter);
    return new VerseUpperConfinedDTO({ ...data, chapter, variation });
  }

  getChapter(): Readonly<ChapterUpperConfinedDTO> {
    return Object.freeze(this._chapter);
  }
}

export type T_VerseLowerConfinedDTOConstructorParameters =
  T_VerseConfinedDTOConstructorParameters & {
    words: Array<WordLowerConfinedDTO>;
  };
export type T_VerseLowerConfinedDTOConstructorParametersJSON =
  T_VerseConfinedDTOConstructorParametersJSON & {
    words: Array<T_WordLowerConfinedDTOConstructorParametersJSON>;
  };

export class VerseLowerConfinedDTO extends VerseConfinedDTO {
  private readonly _words: ReadonlyArray<WordLowerConfinedDTO>;

  constructor(data: T_VerseLowerConfinedDTOConstructorParameters) {
    super({ ...data });
    this._words = data.words;
  }

  static createFromJSON(
    data: T_VerseLowerConfinedDTOConstructorParametersJSON
  ): VerseLowerConfinedDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const words = data.words.map((w) => WordLowerConfinedDTO.createFromJSON(w));
    return new VerseLowerConfinedDTO({ ...data, words, variation });
  }

  getWords(): ReadonlyArray<WordLowerConfinedDTO> {
    return Object.freeze([...this._words]);
  }
}

export type T_VerseTranslationTextPairConstructorParameters = {
  verse: VerseUpperDTO;
  translationText: TranslationTextDTO;
};
export type T_VerseTranslationTextPairConstructorParametersJSON = {
  verse: T_VerseUpperDTOConstructorParametersJSON;
  translationText: T_TranslationTextDTOConstructorParametersJSON;
};

export class VerseTranslationTextPair {
  private readonly _verse: VerseUpperDTO;
  private readonly _translationText: TranslationTextDTO;

  constructor(data: T_VerseTranslationTextPairConstructorParameters) {
    this._verse = data.verse;
    this._translationText = data.translationText;
  }

  static createFromJSON(
    data: T_VerseTranslationTextPairConstructorParametersJSON
  ): VerseTranslationTextPair {
    const verse = VerseUpperDTO.createFromJSON(data.verse);
    const translationText = TranslationTextDTO.createFromJSON(
      data.translationText
    );
    return new VerseTranslationTextPair({ ...data, verse, translationText });
  }

  getVerse(): Readonly<VerseUpperDTO> {
    return this._verse;
  }

  getTranslationText(): Readonly<TranslationTextDTO> {
    return this._translationText;
  }
}

export type T_VerseMeanDTOConstructorParameters =
  T_VerseBaseDTOConstructorParameters;
export type T_VerseMeanDTOConstructorParametersJSON =
  T_VerseBaseDTOConstructorParametersJSON;

export class VerseMeanDTO extends VerseBaseDTO {
  constructor(data: T_VerseMeanDTOConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(
    data: T_VerseMeanDTOConstructorParametersJSON
  ): VerseMeanDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    return new VerseMeanDTO({ ...data, variation });
  }
}

export type T_VerseUpperMeanDTOConstructorParameters =
  T_VerseMeanDTOConstructorParameters & {
    chapter: ChapterUpperMeanDTO;
  };
export type T_VerseUpperMeanDTOConstructorParametersJSON =
  T_VerseMeanDTOConstructorParametersJSON & {
    chapter: T_ChapterUpperDTOConstructorParametersJSON;
  };

export class VerseUpperMeanDTO extends VerseMeanDTO {
  private readonly _chapter: ChapterUpperMeanDTO;

  constructor(data: T_VerseUpperMeanDTOConstructorParameters) {
    super({ ...data });
    this._chapter = data.chapter;
  }

  static override createFromJSON(
    data: T_VerseUpperMeanDTOConstructorParametersJSON
  ): VerseUpperMeanDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const chapter = ChapterUpperMeanDTO.createFromJSON(data.chapter);

    return new VerseUpperMeanDTO({ ...data, variation, chapter });
  }

  getChapter(): Readonly<ChapterUpperMeanDTO> {
    return Object.freeze(this._chapter);
  }
}

export type T_VerseLowerMeanDTOConstructorParameters =
  T_VerseMeanDTOConstructorParameters;
export type T_VerseLowerMeanDTOConstructorParametersJSON =
  T_VerseMeanDTOConstructorParametersJSON;

export class VerseLowerMeanDTO extends VerseMeanDTO {
  // No additional fields
}

export class VerseOptions {
  private showFootnotes: boolean;
  private showTranslation: boolean;
  private showTransliteration: boolean;
  private showOriginalText: boolean;
  private variation: TVocalizationKey;

  constructor(
    showFootnotes: boolean,
    showTranslation: boolean,
    showOriginalText: boolean,
    showTransliteration: boolean,
    variation: TVocalizationKey
  ) {
    this.showFootnotes = showFootnotes;
    this.showTranslation = showTranslation;
    this.showOriginalText = showOriginalText;
    this.variation = variation;
    this.showTransliteration = showTransliteration;
  }

  getClone(): VerseOptions {
    return new VerseOptions(
      this.getShowFootnotes(),
      this.getShowTranslation(),
      this.getShowOriginalText(),
      this.getShowTransliteration(),
      this.getVariation()
    );
  }

  getShowFootnotes(): boolean {
    return this.showFootnotes;
  }

  getShowTranslation(): boolean {
    return this.showTranslation;
  }

  getShowOriginalText(): boolean {
    return this.showOriginalText;
  }
  getShowTransliteration(): boolean {
    return this.showTransliteration;
  }

  getVariation(): TVocalizationKey {
    return this.variation;
  }

  setShowTranslation(boolean: boolean): void {
    this.showTranslation = boolean;
  }

  setShowTransliteration(boolean: boolean): void {
    this.showTransliteration = boolean;
  }

  setShowOriginalText(boolean: boolean): void {
    this.showOriginalText = boolean;
  }

  setShowFootnotes(boolean: boolean): void {
    this.showFootnotes = boolean;
  }

  setVariation(variation: TVocalizationKey): void {
    this.variation = variation;
  }

  setShowTranslationAndGetClone(boolean: boolean): VerseOptions {
    this.setShowTranslation(boolean);
    return this.getClone();
  }

  setShowTransliterationAndGetClone(boolean: boolean): VerseOptions {
    this.setShowTransliteration(boolean);
    return this.getClone();
  }

  setShowOriginalTextAndGetClone(boolean: boolean): VerseOptions {
    this.setShowOriginalText(boolean);
    return this.getClone();
  }

  setShowFootnotesAndGetClone(boolean: boolean): VerseOptions {
    this.setShowFootnotes(boolean);
    return this.getClone();
  }

  setVariationAndGetClone(variation: TVocalizationKey): VerseOptions {
    this.setVariation(variation);
    return this.getClone();
  }
}
