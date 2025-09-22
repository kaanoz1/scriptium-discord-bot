export type T_FootNoteDTOParams = {
    index: number, text: string
}

export type T_FootNoteDTOConstructorParametersJSON = T_FootNoteDTOParams


export class FootNoteDTO {
    private readonly index: number
    private readonly text: string

    constructor(data: T_FootNoteDTOParams) {
        this.text = data.text;
        this.index = data.index;
    }

    static createFromJSON(data: T_FootNoteDTOConstructorParametersJSON): FootNoteDTO {
        return new FootNoteDTO({...data})
    }

    getIndex(): number {
        return this.index;
    }

    getText(): string {
        return this.text;
    }
}
