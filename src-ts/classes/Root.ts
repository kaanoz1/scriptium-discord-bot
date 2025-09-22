import {
    WordUpperDTO,
    WordUpperConfinedDTO,
    T_WordUpperConfinedDTOConstructorParametersJSON, T_WordUpperDTOConstructorParametersJSON
} from "./Word";


export type T_RootBaseDTOConstructorParameters = { latin: string, own: string };
export type T_RootBaseDTOConstructorParametersJSON = T_RootBaseDTOConstructorParameters;

export abstract class RootBaseDTO {
    protected readonly latin: string
    protected readonly own: string

    constructor(
        data: T_RootBaseDTOConstructorParameters
    ) {
        this.own = data.own;
        this.latin = data.latin;
    }

    getLatin(): string {
        return this.latin;
    }

    getOwn(): string {
        return this.own;
    }
}

export type T_RootDTOConstructorParameters = T_RootBaseDTOConstructorParameters
export type T_RootDTOConstructorParametersJSON = T_RootBaseDTOConstructorParametersJSON;

export class RootDTO extends RootBaseDTO {
    constructor(data: T_RootDTOConstructorParameters) {
        super({...data});
    }

    static createFromJSON(data: T_RootDTOConstructorParametersJSON): RootDTO {
        return new RootDTO(data);
    }
}

export type T_RootUpperDTOConstructorParametersJSON = T_RootDTOConstructorParametersJSON & {
    words: Array<T_WordUpperDTOConstructorParametersJSON>
}
export type T_RootUpperDTOConstructorParameters = T_RootDTOConstructorParameters & { words: Array<WordUpperDTO> };

export class RootUpperDTO extends RootDTO {

    private readonly words: ReadonlyArray<WordUpperDTO>


    constructor(
        data: T_RootUpperDTOConstructorParameters,
    ) {
        super({...data});
        this.words = data.words;
    }


    static override createFromJSON(data: T_RootUpperDTOConstructorParametersJSON): RootUpperDTO {
        const words: Array<WordUpperDTO> = data.words.map(w => WordUpperDTO.createFromJSON(w))
        return new RootUpperDTO({...data, words});
    }

    getWords(): ReadonlyArray<WordUpperDTO> {
        return this.words;
    }
}


export type T_RootLowerDTOConstructorParametersJSON = T_RootDTOConstructorParametersJSON;
export type T_RootLowerDTOConstructorParameters = T_RootDTOConstructorParameters

export class RootLowerDTO extends RootDTO {
    constructor(data: T_RootLowerDTOConstructorParameters) {
        super({...data});
    }

    static override createFromJSON(data: T_RootLowerDTOConstructorParametersJSON): RootLowerDTO {

        return new RootLowerDTO({...data});
    }
}


export type T_RootConfinedDTOConstructorParametersJSON = T_RootBaseDTOConstructorParametersJSON;
export type T_RootConfinedDTOConstructorParameters = ConstructorParameters<typeof RootBaseDTO>[0]

export abstract class RootConfinedDTO extends RootBaseDTO {
    constructor(data: T_RootConfinedDTOConstructorParameters) {
        super({...data});
    }
}


export type T_RootUpperConfinedConstructorParametersJSON = T_RootConfinedDTOConstructorParametersJSON & {
    words: Array<T_WordUpperConfinedDTOConstructorParametersJSON>
};
export type T_RootUpperConfinedDTOConstructorParameters = T_RootConfinedDTOConstructorParameters & {
    words: Array<WordUpperConfinedDTO>
}

export class RootUpperConfinedDTO extends RootConfinedDTO {
    private readonly words: Array<WordUpperConfinedDTO>


    constructor(
        data: T_RootUpperConfinedDTOConstructorParameters
    ) {
        super({...data});
        this.words = data.words;
    }

    static createFromJSON(data: T_RootUpperConfinedConstructorParametersJSON): RootUpperConfinedDTO {
        const words = data.words.map(w => WordUpperConfinedDTO.createFromJSON(w));
        return new RootUpperConfinedDTO({...data, words});
    }


    getWords(): ReadonlyArray<WordUpperConfinedDTO> {
        return this.words;
    }
}

export type T_RootLowerConfinedDTOConstructorParametersJSON = T_RootConfinedDTOConstructorParametersJSON;
export type T_RootLowerConfinedDTOConstructorParameters = T_RootConfinedDTOConstructorParameters;


export class RootLowerConfinedDTO extends RootConfinedDTO {
    constructor(data: T_RootLowerConfinedDTOConstructorParameters) {
        super({...data});
    }

    static createFromJSON(data: T_RootLowerConfinedDTOConstructorParametersJSON) {
        return new RootLowerConfinedDTO({...data});
    }
}
