import {LanguageDTO, T_LanguageDTOConstructorParamsJSON} from "./Language";

export type T_TranslatorDTOConstructorParameters = { name: string, language: LanguageDTO, url: string | null };

export type T_TranslatorDTOConstructorParametersJSON = {
    name: string,
    language: T_LanguageDTOConstructorParamsJSON,
    url: string | null
};

export class TranslatorDTO {

    private readonly name: string
    private readonly language: Readonly<LanguageDTO>
    private readonly url: string | null = null

    constructor(
        data: T_TranslatorDTOConstructorParameters
    ) {
        this.name = data.name;
        this.language = data.language;
        this.url = data.url;
    }

    static createFromJSON(data: T_TranslatorDTOConstructorParametersJSON): TranslatorDTO {
        const language = LanguageDTO.createFromJSON(data.language);
        return new TranslatorDTO({...data, language})
    }

    getName(): string {
        return this.name;
    }

    getLanguage(): Readonly<LanguageDTO> {
        return Object.freeze(this.language);
    }

    getUrl(): string | null {
        return this.url;
    }
}
