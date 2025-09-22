import {LanguageDTO, Meaning, T_MeaningConstructorParameters, T_MeaningConstructorParametersJSON} from "./Language";
import {
    SectionUpperDTO,
    SectionDTO,
    SectionUpperConfinedDTO,
    SectionUpperMeanDTO,
    T_SectionUpperMeanDTOConstructorParametersJSON,
    T_SectionUpperDTOConstructorParametersJSON,
    T_SectionDTOConstructorParametersJSON, T_SectionUpperConfinedDTOConstructorParametersJSON,
} from "./Section";
import {
    VerseLowerDTO,
    VerseDTO,
    VerseLowerConfinedDTO,
    VerseLowerMeanDTO,
    T_VerseLowerDTOConstructorParametersJSON,
    T_VerseDTOConstructorParametersJSON,
    T_VerseLowerConfinedDTOConstructorParametersJSON, T_VerseLowerMeanDTOConstructorParametersJSON,
} from "./Verse";


export type T_ChapterBaseDTOConstructorParameters = {
    id: number;
    name: string,
    number: number;
}

export type T_ChapterBaseDTOConstructorParametersJSON = T_ChapterBaseDTOConstructorParameters;


export abstract class ChapterBaseDTO {
    protected readonly id: number;
    protected readonly name: string
    protected readonly number: number


    public constructor(
        data: T_ChapterBaseDTOConstructorParameters,
    ) {
        this.id = data.id;
        this.name = data.name;
        this.number = data.number;
    }


    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getNumber(): number {
        return this.number;
    }
}

export type T_ChapterSimpleDTOConstructorParameters = T_ChapterBaseDTOConstructorParameters & {
    meanings: Array<ChapterMeaningDTO>;
}

export type T_ChapterSimpleDTOConstructorParametersJSON = T_ChapterBaseDTOConstructorParametersJSON & {
    meanings: Array<T_ChapterMeaningDTOConstructorParametersJSON>
}

export abstract class ChapterSimpleDTO extends ChapterBaseDTO {
    protected readonly meanings: ReadonlyArray<ChapterMeaningDTO> = []

    constructor(
        data: T_ChapterSimpleDTOConstructorParameters,
    ) {
        super({...data});
        this.meanings = data.meanings;
    }


    getMeanings(): ReadonlyArray<ChapterMeaningDTO> {
        return this.meanings;
    }
}

export type T_ChapterDTOConstructorParameters = T_ChapterSimpleDTOConstructorParameters;
export type T_ChapterDTOConstructorParametersJSON = T_ChapterSimpleDTOConstructorParametersJSON;

export class ChapterDTO extends ChapterSimpleDTO {
    protected override readonly meanings: Array<ChapterMeaningDTO>;

    constructor(data: T_ChapterSimpleDTOConstructorParameters) {
        super({...data});

        this.meanings = data.meanings;
    }

    static createFromJSON(data: T_ChapterDTOConstructorParametersJSON): ChapterDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        return new ChapterDTO({...data, meanings});
    }

}

export type T_ChapterUpperDTOConstructorParameters = T_ChapterDTOConstructorParameters & { section: SectionUpperDTO }
export type T_ChapterUpperDTOConstructorParametersJSON = T_ChapterDTOConstructorParametersJSON & {
    section: T_SectionUpperDTOConstructorParametersJSON
}

export class ChapterUpperDTO extends ChapterDTO {
    private readonly section: Readonly<SectionUpperDTO>


    constructor(
        data: T_ChapterUpperDTOConstructorParameters
    ) {
        super({...data});
        this.section = data.section;
    }

    static override createFromJSON(data: T_ChapterUpperDTOConstructorParametersJSON): ChapterUpperDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        const section = SectionUpperDTO.createFromJSON(data.section)
        return new ChapterUpperDTO({...data, meanings, section});
    }


    getSection(): Readonly<SectionUpperDTO> {
        return this.section;
    }
}

export type T_ChapterOneLevelUpperDTOConstructorParameters = T_ChapterDTOConstructorParameters & { section: SectionDTO }
export type T_ChapterOneLevelUpperDTOConstructorParametersJSON = T_ChapterDTOConstructorParametersJSON & {
    section: T_SectionDTOConstructorParametersJSON
}

export class ChapterOneLevelUpperDTO extends ChapterDTO {
    private readonly section: Readonly<SectionDTO>

    constructor(
        data: T_ChapterOneLevelUpperDTOConstructorParameters
    ) {
        super({...data});

        this.section = data.section;
    }

    static override createFromJSON(data: T_ChapterOneLevelUpperDTOConstructorParametersJSON): ChapterOneLevelUpperDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        const section = SectionDTO.createFromJSON(data.section)
        return new ChapterOneLevelUpperDTO({...data, meanings, section});
    }

    getSection(): Readonly<SectionDTO> {
        return this.section;
    }
}

export type T_ChapterLowerDTOConstructorParameters = T_ChapterDTOConstructorParameters & {
    verses: Array<VerseLowerDTO>
}
export type T_ChapterLowerDTOConstructorParametersJSON = T_ChapterDTOConstructorParametersJSON & {
    verses: Array<T_VerseLowerDTOConstructorParametersJSON>
}

export class ChapterLowerDTO extends ChapterDTO {
    private readonly verses: Array<VerseLowerDTO>

    constructor(
        data: T_ChapterLowerDTOConstructorParameters
    ) {
        super({...data});
        this.verses = data.verses;
    }

    static override createFromJSON(data: T_ChapterLowerDTOConstructorParametersJSON): ChapterLowerDTO {
        const verses = data.verses.map(VerseLowerDTO.createFromJSON);
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        return new ChapterLowerDTO({...data, verses, meanings});
    }

    getVerses(): ReadonlyArray<VerseLowerDTO> {
        return this.verses;
    }
}

export type T_ChapterOneLevelLowerDTOConstructorParameters = T_ChapterDTOConstructorParameters & {
    verses: Array<VerseDTO>
}
export type T_ChapterOneLevelLowerDTOConstructorParametersJSON = T_ChapterDTOConstructorParametersJSON & {
    verses: Array<T_VerseDTOConstructorParametersJSON>
}

export class ChapterOneLevelLowerDTO extends ChapterDTO {
    private readonly verses: Array<VerseDTO>

    constructor(
        data: T_ChapterOneLevelLowerDTOConstructorParameters
    ) {
        super({...data});
        this.verses = data.verses;
    }

    static override createFromJSON(data: T_ChapterOneLevelLowerDTOConstructorParametersJSON): ChapterOneLevelLowerDTO {
        const verses = data.verses.map(VerseDTO.createFromJSON);
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        return new ChapterOneLevelLowerDTO({...data, verses, meanings});
    }

    getVerses(): ReadonlyArray<VerseDTO> {
        return this.verses;
    }
}

export type T_ChapterBothDTOConstructorParameters = T_ChapterDTOConstructorParameters & {
    section: SectionUpperDTO,
    verses: Array<VerseLowerDTO>
}

export type T_ChapterBothDTOConstructorParametersJSON = T_ChapterDTOConstructorParametersJSON & {
    section: T_SectionUpperDTOConstructorParametersJSON,
    verses: Array<T_VerseLowerDTOConstructorParametersJSON>
}

export class ChapterBothDTO extends ChapterDTO {
    private readonly section: SectionUpperDTO

    private readonly verses: Array<VerseLowerDTO>

    constructor(
        data: T_ChapterBothDTOConstructorParameters
    ) {
        super({...data});

        this.verses = data.verses;
        this.section = data.section;
    }

    static override createFromJSON(data: T_ChapterBothDTOConstructorParametersJSON): ChapterBothDTO {
        const section = SectionUpperDTO.createFromJSON(data.section);
        const verses = data.verses.map(VerseLowerDTO.createFromJSON);
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        return new ChapterBothDTO({...data, verses, section, meanings});
    }

    getSection(): Readonly<SectionUpperDTO> {
        return this.section;
    }

    getVerses(): ReadonlyArray<VerseLowerDTO> {
        return this.verses;
    }
}

export type T_ChapterMeaningDTOConstructorParameters = T_MeaningConstructorParameters;
export type T_ChapterMeaningDTOConstructorParametersJSON = T_MeaningConstructorParametersJSON;

export class ChapterMeaningDTO extends Meaning {
    constructor(data: T_ChapterMeaningDTOConstructorParameters) {
        super({...data});
    }

    static override createFromJSON(data: T_ChapterMeaningDTOConstructorParametersJSON): ChapterMeaningDTO {
        const language = LanguageDTO.createFromJSON(data.language);
        return new ChapterMeaningDTO({...data, language});
    }
}


export type T_ChapterConfinedDTO = T_ChapterBaseDTOConstructorParameters;
export type T_ChapterConfinedDTOJSON = T_ChapterBaseDTOConstructorParametersJSON;


export abstract class ChapterConfinedDTO extends ChapterBaseDTO {
    constructor(data: T_ChapterConfinedDTO) {
        super({...data});
    }
}

export type T_ChapterUpperConfinedDTOConstructorParameters = T_ChapterConfinedDTO & {
    section: SectionUpperConfinedDTO
}
export type T_ChapterUpperConfinedDTOConstructorParametersJSON = T_ChapterConfinedDTOJSON & {
    section: T_SectionUpperConfinedDTOConstructorParametersJSON
}

export class ChapterUpperConfinedDTO extends ChapterConfinedDTO {
    private readonly section: SectionUpperConfinedDTO

    constructor(
        data: T_ChapterUpperConfinedDTOConstructorParameters
    ) {
        super({...data});
        this.section = data.section;
    }

    static createFromJSON(data: T_ChapterUpperConfinedDTOConstructorParametersJSON): ChapterUpperConfinedDTO {
        const section = SectionUpperConfinedDTO.createFromJSON(data.section);
        return new ChapterUpperConfinedDTO({...data, section});
    }

    getSection(): Readonly<SectionUpperConfinedDTO> {
        return this.section;
    }
}

export type T_ChapterLowerConfinedDTOConstructorParameters = T_ChapterBaseDTOConstructorParameters & {
    verses: Array<VerseLowerConfinedDTO>
}

export type T_ChapterLowerConfinedDTOConstructorParametersJSON = T_ChapterBaseDTOConstructorParametersJSON & {
    verses: Array<T_VerseLowerConfinedDTOConstructorParametersJSON>
}

export class ChapterLowerConfinedDTO extends ChapterConfinedDTO {
    private readonly verses: ReadonlyArray<VerseLowerConfinedDTO>

    constructor(
        data: T_ChapterLowerConfinedDTOConstructorParameters
    ) {
        super({...data});

        this.verses = data.verses;
    }

    static createFromJSON(data: T_ChapterLowerConfinedDTOConstructorParametersJSON): ChapterLowerConfinedDTO {
        const verses = data.verses.map(VerseLowerConfinedDTO.createFromJSON);
        return new ChapterLowerConfinedDTO({...data, verses});
    }

    getVerses(): ReadonlyArray<VerseLowerConfinedDTO> {
        return this.verses;
    }
}

export type T_ChapterMeanDTOConstructorParameters = T_ChapterBaseDTOConstructorParameters & {
    meanings: Array<ChapterMeaningDTO>
}

export type T_ChapterMeanDTOConstructorParametersJSON = T_ChapterBaseDTOConstructorParametersJSON & {
    meanings: Array<T_ChapterMeaningDTOConstructorParametersJSON>
}

export class ChapterMeanDTO extends ChapterBaseDTO {

    private readonly meanings: Array<ChapterMeaningDTO>


    constructor(data: T_ChapterMeanDTOConstructorParameters) {
        super({...data});

        this.meanings = data.meanings;
    }

    static createFromJSON(data: T_ChapterMeanDTOConstructorParametersJSON): ChapterMeanDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON);
        return new ChapterMeanDTO({...data, meanings});
    }


    getMeanings(): ReadonlyArray<ChapterMeaningDTO> {
        return Object.freeze([...this.meanings]);
    }
}

export type T_ChapterUpperMeanDTOParams = T_ChapterMeanDTOConstructorParameters & {
    section: SectionUpperMeanDTO
};
export type T_ChapterUpperMeanDTOConstructorParametersJSON = T_ChapterMeanDTOConstructorParametersJSON & {
    section: T_SectionUpperMeanDTOConstructorParametersJSON
}

export class ChapterUpperMeanDTO extends ChapterMeanDTO {
    private readonly section: Readonly<SectionUpperMeanDTO>


    constructor(
        data: T_ChapterUpperMeanDTOParams
    ) {
        super({...data});

        this.section = data.section;
    }

    static override createFromJSON(data: T_ChapterUpperMeanDTOConstructorParametersJSON): ChapterUpperMeanDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON)
        const section = SectionUpperMeanDTO.createFromJSON(data.section);
        return new ChapterUpperMeanDTO({...data, meanings, section});
    }

    getSection(): Readonly<SectionUpperMeanDTO> {
        return Object.freeze(this.section);
    }
}

export type T_ChapterLowerMeanDTOConstructorParameters = T_ChapterMeanDTOConstructorParameters & {
    verses: Array<VerseLowerMeanDTO>
}

export type T_ChapterLowerMeanDTOConstructorParametersJSON = T_ChapterMeanDTOConstructorParametersJSON & {
    verses: Array<T_VerseLowerMeanDTOConstructorParametersJSON>
}


export class ChapterLowerMeanDTO extends ChapterMeanDTO {
    private readonly verses: Array<VerseLowerMeanDTO>

    constructor(
        data: T_ChapterLowerMeanDTOConstructorParameters
    ) {
        super({...data});

        this.verses = data.verses;
    }

    static override createFromJSON(data: T_ChapterLowerMeanDTOConstructorParametersJSON): ChapterLowerMeanDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON)
        const verses = data.verses.map(VerseLowerMeanDTO.createFromJSON)
        return new ChapterLowerMeanDTO({...data, meanings, verses});
    }

    getVerses(): ReadonlyArray<VerseLowerMeanDTO> {
        return Object.freeze([...this.verses]);
    }
}


export type T_ChapterUpperAndOneLevelLowerDTOConstructorParameters = T_ChapterUpperDTOConstructorParameters & {
    verses: Array<VerseDTO>
}

export type T_ChapterUpperAndOneLevelLowerDTOConstructorParametersJSON = T_ChapterUpperDTOConstructorParametersJSON & {
    verses: Array<T_VerseDTOConstructorParametersJSON>
}

export class ChapterUpperAndOneLevelLowerDTO extends ChapterUpperDTO {
    private verses: Array<VerseDTO>

    constructor(data: T_ChapterUpperAndOneLevelLowerDTOConstructorParameters) {
        super({...data});
        this.verses = data.verses;
    }

    static override createFromJSON(data: T_ChapterUpperAndOneLevelLowerDTOConstructorParametersJSON): ChapterUpperAndOneLevelLowerDTO {
        const meanings = data.meanings.map(ChapterMeaningDTO.createFromJSON)
        const section = SectionUpperDTO.createFromJSON(data.section);
        const verses = data.verses.map(VerseDTO.createFromJSON)
        return new ChapterUpperAndOneLevelLowerDTO({...data, verses, meanings, section});
    }

    getVerses(): Array<VerseDTO> {
        return this.verses;
    }

}