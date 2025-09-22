import { TLangCode } from "../utility/types";

export type T_LanguageDTOConstructorParams = {
  langCode: TLangCode;
  langOwn: string;
  langEnglish: string;
};

export type T_LanguageDTOConstructorParamsJSON = T_LanguageDTOConstructorParams;

export class LanguageDTO {
  private readonly langCode: TLangCode;
  private readonly langOwn: string;
  private readonly langEnglish: string;

  constructor(data: T_LanguageDTOConstructorParams) {
    this.langCode = data.langCode;
    this.langOwn = data.langOwn;
    this.langEnglish = data.langEnglish;
  }

  static createFromJSON(data: T_LanguageDTOConstructorParamsJSON): LanguageDTO {
    return new LanguageDTO({ ...data });
  }

  getLangCode(): string {
    return this.langCode;
  }

  getLangOwn(): string {
    return this.langOwn;
  }

  getLangEnglish(): string {
    return this.langEnglish;
  }

  static createFromParams(
    data: T_LanguageDTOConstructorParamsJSON
  ): LanguageDTO {
    return new LanguageDTO({ ...data });
  }
}

export type T_MeaningConstructorParameters = {
  text: string;
  language: LanguageDTO;
};
export type T_MeaningConstructorParametersJSON = {
  text: string;
  language: T_LanguageDTOConstructorParams;
};

export class Meaning {
  protected readonly text: string;
  protected readonly language: Readonly<LanguageDTO>;

  constructor(data: T_MeaningConstructorParameters) {
    this.text = data.text;
    this.language = data.language;
  }

  static createFromJSON(data: T_MeaningConstructorParametersJSON): Meaning {
    const language = LanguageDTO.createFromParams(data.language);
    return new Meaning({ ...data, language });
  }

  getText(): string {
    return this.text;
  }

  getLanguage(): Readonly<LanguageDTO> {
    return this.language;
  }
}
