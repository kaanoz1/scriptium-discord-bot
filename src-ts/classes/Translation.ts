import { LanguageDTO, T_LanguageDTOConstructorParamsJSON } from "./Language";
import {
  ScriptureDTO,
  T_ScriptureDTOConstructorParametersJSON,
} from "./Scripture";
import {
  T_TranslatorDTOConstructorParametersJSON,
  TranslatorDTO,
} from "./Translator";

export type T_TranslationDTOConstructorParameters = {
  id: number;
  name: string;
  language: LanguageDTO;
  translators: Array<TranslatorDTO>;
  isEager: boolean;
};
export type T_TranslationDTOConstructorParametersJSON = {
  id: number;
  name: string;
  language: T_LanguageDTOConstructorParamsJSON;
  translators: Array<T_TranslatorDTOConstructorParametersJSON>;
  isEager: boolean;
};

export class TranslationDTO {
  private readonly id: number;
  private readonly name: string;
  private readonly language: Readonly<LanguageDTO>;
  private readonly translators: ReadonlyArray<TranslatorDTO>;
  private readonly isEager: boolean;

  constructor(data: T_TranslationDTOConstructorParameters) {
    this.id = data.id;
    this.name = data.name;
    this.language = data.language;
    this.translators = data.translators;
    this.isEager = data.isEager;
  }

  static createFromJSON(
    data: T_TranslationDTOConstructorParametersJSON
  ): TranslationDTO {
    const language = LanguageDTO.createFromJSON(data.language);
    const translators = data.translators.map(TranslatorDTO.createFromJSON);
    return new TranslationDTO({ ...data, language, translators });
  }

  getTranslatorNamesGathered() {
    return this.getTranslators()
      .map((t) => t.getName())
      .join(", ");
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getLanguage(): Readonly<LanguageDTO> {
    return this.language;
  }

  getTranslators(): ReadonlyArray<TranslatorDTO> {
    return this.translators;
  }

  getIsEager(): boolean {
    return this.isEager;
  }
}

export type T_TranslationWithScriptureDTODTOConstructorParameters =
  T_TranslationDTOConstructorParameters & {
    scripture: ScriptureDTO;
  };

export type T_TranslationWithScriptureDTODTOConstructorParametersJSON =
  T_TranslationDTOConstructorParametersJSON & {
    scripture: T_ScriptureDTOConstructorParametersJSON;
  };

export class TranslationWithScriptureDTODTO extends TranslationDTO {
  private readonly scripture: Readonly<ScriptureDTO>;

  constructor(data: T_TranslationWithScriptureDTODTOConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static override createFromJSON(
    data: T_TranslationWithScriptureDTODTOConstructorParametersJSON
  ): TranslationWithScriptureDTODTO {
    const scripture = ScriptureDTO.createFromJSON(data.scripture);
    const language = LanguageDTO.createFromJSON(data.language);
    const translators = data.translators.map(TranslatorDTO.createFromJSON);
    return new TranslationWithScriptureDTODTO({
      ...data,
      scripture,
      language,
      translators,
    });
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }
}
