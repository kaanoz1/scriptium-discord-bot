import { TLangCode } from "../utility/types";
import {
  ChapterLowerDTO,
  ChapterDTO,
  ChapterLowerConfinedDTO,
  ChapterLowerMeanDTO,
  T_ChapterLowerDTOConstructorParametersJSON,
  T_ChapterDTOConstructorParametersJSON,
  T_ChapterLowerConfinedDTOConstructorParametersJSON,
  T_ChapterLowerMeanDTOConstructorParametersJSON,
  ChapterOneLevelLowerDTO,
  T_ChapterOneLevelLowerDTOConstructorParametersJSON,
} from "./Chapter";
import {
  LanguageDTO,
  Meaning,
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
} from "./Language";
import {
  ScriptureDTO,
  ScriptureUpperConfinedDTO,
  ScriptureUpperMeanDTO,
  T_ScriptureDTOConstructorParametersJSON,
  T_ScriptureUpperConfinedDTOConstructorParametersJSON,
  T_ScriptureUpperMeanDTOConstructorParametersJSON,
} from "./Scripture";

export type T_SectionBaseDTOConstructorParameters = {
  id: number;
  name: string;
  number: number;
};
export type T_SectionBaseDTOConstructorParametersJSON =
  T_SectionBaseDTOConstructorParameters;

export abstract class SectionBaseDTO {
  protected readonly id: number;
  protected readonly name: string;
  protected readonly number: number;

  constructor(data: T_SectionBaseDTOConstructorParameters) {
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

export type T_SectionSimpleDTOConstructorParameters =
  T_SectionBaseDTOConstructorParameters & {
    meanings: Array<SectionMeaningDTO>;
  };
export type T_SectionSimpleDTOConstructorParametersJSON =
  T_SectionBaseDTOConstructorParametersJSON & {
    meanings: Array<T_SectionMeaningDTOConstructorParametersJSON>;
  };

export abstract class SectionSimpleDTO extends SectionBaseDTO {
  protected readonly meanings: Array<SectionMeaningDTO>;

  protected constructor(data: T_SectionSimpleDTOConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  getMeanings(): ReadonlyArray<SectionMeaningDTO> {
    return this.meanings;
  }
}

export type T_SectionDTOConstructorParameters =
  T_SectionSimpleDTOConstructorParameters;
export type T_SectionDTOConstructorParametersJSON =
  T_SectionSimpleDTOConstructorParametersJSON;

export class SectionDTO extends SectionSimpleDTO {
  constructor(data: T_SectionDTOConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(
    data: T_SectionDTOConstructorParametersJSON
  ): SectionDTO {
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionDTO({ ...data, meanings });
  }

  getMeaningTextOrDefault(langCode: TLangCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Section"
    );
  }
}

export type T_SectionUpperDTOConstructorParameters =
  T_SectionDTOConstructorParameters & { scripture: ScriptureDTO };
export type T_SectionUpperDTOConstructorParametersJSON =
  T_SectionDTOConstructorParametersJSON & {
    scripture: T_ScriptureDTOConstructorParametersJSON;
  };

export class SectionUpperDTO extends SectionDTO {
  private readonly scripture: ScriptureDTO;

  constructor(data: T_SectionUpperDTOConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static override createFromJSON(
    data: T_SectionUpperDTOConstructorParametersJSON
  ): SectionUpperDTO {
    const scripture = ScriptureDTO.createFromJSON(data.scripture);
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionUpperDTO({ ...data, scripture, meanings });
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }
}

export type T_SectionLowerDTOConstructorParameters =
  T_SectionDTOConstructorParameters & {
    chapters: Array<ChapterLowerDTO>;
  };
export type T_SectionLowerDTOConstructorParametersJSON =
  T_SectionDTOConstructorParametersJSON & {
    chapters: Array<T_ChapterLowerDTOConstructorParametersJSON>;
  };

export class SectionLowerDTO extends SectionDTO {
  private readonly chapters: ReadonlyArray<ChapterLowerDTO>;

  constructor(data: T_SectionLowerDTOConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionLowerDTOConstructorParametersJSON
  ): SectionLowerDTO {
    const chapters = data.chapters.map(ChapterLowerDTO.createFromJSON);
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionLowerDTO({ ...data, chapters, meanings });
  }

  getChapters(): ReadonlyArray<ChapterLowerDTO> {
    return this.chapters;
  }
}

export type T_SectionOneLevelLowerDTOConstructorParameters =
  T_SectionDTOConstructorParameters & {
    chapters: Array<ChapterDTO>;
  };
export type T_SectionOneLevelLowerDTOConstructorParametersJSON =
  T_SectionDTOConstructorParametersJSON & {
    chapters: Array<T_ChapterDTOConstructorParametersJSON>;
  };

export class SectionOneLevelLowerDTO extends SectionDTO {
  private readonly chapters: Array<ChapterDTO>;

  constructor(data: T_SectionOneLevelLowerDTOConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionOneLevelLowerDTOConstructorParametersJSON
  ): SectionOneLevelLowerDTO {
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    const chapters = data.chapters.map(ChapterDTO.createFromJSON);
    return new SectionOneLevelLowerDTO({ ...data, meanings, chapters });
  }

  getChapters(): ReadonlyArray<ChapterDTO> {
    return this.chapters;
  }
}

export type T_SectionBothDTOConstructorParameters =
  T_SectionDTOConstructorParameters & {
    scripture: ScriptureDTO;
    chapters: Array<ChapterLowerDTO>;
  };

export type T_SectionBothDTOConstructorParametersJSON =
  T_SectionDTOConstructorParametersJSON & {
    scripture: T_ScriptureDTOConstructorParametersJSON;
    chapters: Array<T_ChapterLowerDTOConstructorParametersJSON>;
  };

export class SectionBothDTO extends SectionDTO {
  private readonly scripture: ScriptureDTO;
  private readonly chapters: Array<ChapterLowerDTO>;

  constructor(data: T_SectionBothDTOConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionBothDTOConstructorParametersJSON
  ): SectionBothDTO {
    const scripture = ScriptureDTO.createFromJSON(data.scripture);
    const chapters = data.chapters.map(ChapterLowerDTO.createFromJSON);
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionBothDTO({ ...data, scripture, chapters, meanings });
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }

  getChapters(): ReadonlyArray<ChapterLowerDTO> {
    return this.chapters;
  }
}

export type T_SectionMeaningDTOConstructorParameters =
  T_MeaningConstructorParameters;
export type T_SectionMeaningDTOConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class SectionMeaningDTO extends Meaning {
  constructor(data: T_SectionMeaningDTOConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_SectionMeaningDTOConstructorParametersJSON
  ): SectionMeaningDTO {
    const language = LanguageDTO.createFromJSON(data.language);
    return new SectionMeaningDTO({ ...data, language });
  }
}

export type T_SectionConfinedDTOConstructorParameters =
  T_SectionBaseDTOConstructorParameters;
export type T_SectionConfinedDTOConstructorParametersJSON =
  T_SectionBaseDTOConstructorParametersJSON;

export abstract class SectionConfinedDTO extends SectionBaseDTO {
  constructor(data: T_SectionConfinedDTOConstructorParameters) {
    super({ ...data });
  }
}

export type T_SectionUpperConfinedDTOConstructorParameters =
  T_SectionConfinedDTOConstructorParameters & {
    scripture: ScriptureUpperConfinedDTO;
  };

export type T_SectionUpperConfinedDTOConstructorParametersJSON =
  T_SectionConfinedDTOConstructorParametersJSON & {
    scripture: T_ScriptureUpperConfinedDTOConstructorParametersJSON;
  };

export class SectionUpperConfinedDTO extends SectionConfinedDTO {
  private readonly scripture: ScriptureUpperConfinedDTO;

  constructor(data: T_SectionUpperConfinedDTOConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static createFromJSON(
    data: T_SectionUpperConfinedDTOConstructorParametersJSON
  ): SectionUpperConfinedDTO {
    const scripture = ScriptureUpperConfinedDTO.createFromJSON(data.scripture);
    return new SectionUpperConfinedDTO({ ...data, scripture });
  }

  getScripture(): Readonly<ScriptureUpperConfinedDTO> {
    return this.scripture;
  }
}

export type T_SectionLowerConfinedDTOConstructorParameters =
  T_SectionConfinedDTOConstructorParameters & {
    chapters: Array<ChapterLowerConfinedDTO>;
  };
export type T_SectionLowerConfinedDTOConstructorParametersJSON =
  T_SectionConfinedDTOConstructorParametersJSON & {
    chapters: Array<T_ChapterLowerConfinedDTOConstructorParametersJSON>;
  };

export class SectionLowerConfinedDTO extends SectionConfinedDTO {
  private readonly chapters: ReadonlyArray<ChapterLowerConfinedDTO>;

  constructor(data: T_SectionLowerConfinedDTOConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static createFromJSON(
    data: T_SectionLowerConfinedDTOConstructorParametersJSON
  ): SectionLowerConfinedDTO {
    const chapters = data.chapters.map(ChapterLowerConfinedDTO.createFromJSON);
    return new SectionLowerConfinedDTO({ ...data, chapters });
  }

  getChapters(): ReadonlyArray<ChapterLowerConfinedDTO> {
    return this.chapters;
  }
}

export type T_SectionMeanDTOConstructorParameters =
  T_SectionBaseDTOConstructorParameters & {
    meanings: Array<SectionMeaningDTO>;
  };
export type T_SectionMeanDTOConstructorParametersJSON =
  T_SectionBaseDTOConstructorParametersJSON & {
    meanings: Array<T_SectionMeaningDTOConstructorParametersJSON>;
  };

export class SectionMeanDTO extends SectionBaseDTO {
  private readonly meanings: ReadonlyArray<SectionMeaningDTO> = [];

  constructor(data: T_SectionMeanDTOConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  static createFromJSON(
    data: T_SectionMeanDTOConstructorParametersJSON
  ): SectionMeanDTO {
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionMeanDTO({ ...data, meanings });
  }

  getMeanings(): ReadonlyArray<SectionMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }

  getMeaningTextOrDefault(langCode: TLangCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Section"
    );
  }
}

export type T_SectionUpperMeanDTOConstructorParameters =
  T_SectionMeanDTOConstructorParameters & {
    scripture: ScriptureUpperMeanDTO;
  };
export type T_SectionUpperMeanDTOConstructorParametersJSON =
  T_SectionMeanDTOConstructorParametersJSON & {
    scripture: T_ScriptureUpperMeanDTOConstructorParametersJSON;
  };

export class SectionUpperMeanDTO extends SectionMeanDTO {
  private readonly scripture: ScriptureUpperMeanDTO;

  constructor(data: T_SectionUpperMeanDTOConstructorParameters) {
    super({ ...data });
    this.scripture = data.scripture;
  }

  static override createFromJSON(
    data: T_SectionUpperMeanDTOConstructorParametersJSON
  ): SectionUpperMeanDTO {
    const scripture = ScriptureUpperMeanDTO.createFromJSON(data.scripture);
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionUpperMeanDTO({ ...data, scripture, meanings });
  }

  getScripture(): Readonly<ScriptureUpperMeanDTO> {
    return Object.freeze(this.scripture);
  }
}

export type T_SectionLowerMeanDTOConstructorParameters =
  T_SectionMeanDTOConstructorParameters & {
    chapters: Array<ChapterLowerMeanDTO>;
  };

export type T_SectionLowerMeanDTOConstructorParametersJSON =
  T_SectionMeanDTOConstructorParametersJSON & {
    chapters: Array<T_ChapterLowerMeanDTOConstructorParametersJSON>;
  };

export class SectionLowerMeanDTO extends SectionMeanDTO {
  private readonly chapters: Array<ChapterLowerMeanDTO>;

  constructor(data: T_SectionLowerMeanDTOConstructorParameters) {
    super({ ...data });

    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionLowerMeanDTOConstructorParametersJSON
  ): SectionLowerMeanDTO {
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    const chapters = data.chapters.map(ChapterLowerMeanDTO.createFromJSON);
    return new SectionLowerMeanDTO({ ...data, meanings, chapters });
  }

  getChapters(): ReadonlyArray<ChapterLowerMeanDTO> {
    return Object.freeze([...this.chapters]);
  }
}

export type T_SectionOneLevelBothDTOConstructorParameters =
  T_SectionMeanDTOConstructorParameters & {
    chapters: Array<ChapterDTO>;
    scripture: ScriptureDTO;
  };

export type T_SectionOneLevelBothDTOConstructorParametersJSON =
  T_SectionMeanDTOConstructorParametersJSON & {
    chapters: Array<T_ChapterDTOConstructorParametersJSON>;
    scripture: T_ScriptureDTOConstructorParametersJSON;
  };

export class SectionOneLevelBothDTO extends SectionDTO {
  private readonly chapters: Array<ChapterDTO>;
  private readonly scripture: ScriptureDTO;

  constructor(data: T_SectionOneLevelBothDTOConstructorParameters) {
    super({ ...data });

    this.chapters = data.chapters;
    this.scripture = data.scripture;
  }

  getChapters(): ReadonlyArray<ChapterDTO> {
    return this.chapters;
  }

  getScripture(): Readonly<ScriptureDTO> {
    return this.scripture;
  }

  getChapterCount(): number {
    return this.getChapters().length;
  }

  static override createFromJSON(
    data: T_SectionOneLevelBothDTOConstructorParametersJSON
  ): SectionOneLevelBothDTO {
    const chapters = data.chapters.map(ChapterDTO.createFromJSON);
    const scripture = ScriptureDTO.createFromJSON(data.scripture);
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionOneLevelBothDTO({
      ...data,
      chapters,
      scripture,
      meanings,
    });
  }
}

export type T_SectionTwoLevelLowerDTOConstructorParameters =
  T_SectionDTOConstructorParameters & {
    chapters: Array<ChapterOneLevelLowerDTO>;
  };

export type T_SectionTwoLevelLowerDTOConstructorParametersJSON =
  T_SectionDTOConstructorParametersJSON & {
    chapters: Array<T_ChapterOneLevelLowerDTOConstructorParametersJSON>;
  };

export class SectionTwoLevelLowerDTO extends SectionDTO {
  private readonly chapters: Array<ChapterOneLevelLowerDTO>;

  constructor(data: T_SectionTwoLevelLowerDTOConstructorParameters) {
    super({ ...data });
    this.chapters = data.chapters;
  }

  static override createFromJSON(
    data: T_SectionTwoLevelLowerDTOConstructorParametersJSON
  ) {
    const chapters = data.chapters.map(ChapterOneLevelLowerDTO.createFromJSON);
    const meanings = data.meanings.map(SectionMeaningDTO.createFromJSON);
    return new SectionTwoLevelLowerDTO({ ...data, meanings, chapters });
  }

  getChapters(): ReadonlyArray<ChapterOneLevelLowerDTO> {
    return Object.freeze([...this.chapters]);
  }
}
