import {LanguageDTO, T_LanguageDTOConstructorParamsJSON} from "./Language";


export type T_TransliterationDTOConstructorParamters = {
    transliteration: string,
    language: LanguageDTO
}

export type T_TransliterationDTOConstructorParametersJSON = {
    transliteration: string,
    language: T_LanguageDTOConstructorParamsJSON
}


export class TransliterationDTO {
    private readonly transliteration: string
    private readonly language: Readonly<LanguageDTO>

    constructor(
        data: T_TransliterationDTOConstructorParamters
    ) {

        this.transliteration = data.transliteration
        this.language = data.language;
    }

    static createFromJSON(data: T_TransliterationDTOConstructorParametersJSON): TransliterationDTO {
        const language = LanguageDTO.createFromJSON(data.language);
        return new TransliterationDTO({...data, language})
    }

    getTransliteration(): string {
        return this.transliteration;
    }

    getLanguage(): Readonly<LanguageDTO> {
        return Object.freeze(this.language);
    }
}
