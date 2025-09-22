import { TLangCode, TScriptureCode } from "../utility/types";
import {
  LanguageDTO,
  Meaning,
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
} from "./Language";
import {
  SectionLowerDTO,
  SectionDTO,
  SectionLowerConfinedDTO,
  SectionLowerMeanDTO,
  T_SectionLowerDTOConstructorParametersJSON,
  T_SectionDTOConstructorParametersJSON,
  SectionTwoLevelLowerDTO,
  T_SectionTwoLevelLowerDTOConstructorParametersJSON,
} from "./Section";

export type T_ScriptureBaseDTOConstructorParameters = {
  id: number;
  name: string;
  number: number;
  code: TScriptureCode;
};
export type T_ScriptureBaseDTOConstructorParametersJSON =
  T_ScriptureBaseDTOConstructorParameters;

export abstract class ScriptureBaseDTO {
  protected readonly id: number;
  protected readonly name: string;
  protected readonly number: number;
  protected readonly code: TScriptureCode;

  protected constructor(data: T_ScriptureBaseDTOConstructorParameters) {
    this.id = data.id;
    this.name = data.name;
    this.number = data.number;
    this.code = data.code;
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

  getCode(): TScriptureCode {
    return this.code;
  }
}

export type T_ScriptureSimpleDTOConstructorParameters =
  T_ScriptureBaseDTOConstructorParameters & {
    meanings: Array<ScriptureMeaningDTO>;
  };
export type T_ScriptureSimpleDTOConstructorParametersJSON =
  T_ScriptureBaseDTOConstructorParameters & {
    meanings: Array<T_ScriptureMeaningDTOConstructorParametersJSON>;
  };

export abstract class ScriptureSimpleDTO extends ScriptureBaseDTO {
  protected readonly meanings: Array<ScriptureMeaningDTO>;

  constructor(data: T_ScriptureSimpleDTOConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  getMeanings(): ReadonlyArray<ScriptureMeaningDTO> {
    return this.meanings;
  }
}

export type T_ScriptureDTOConstructorParameters =
  T_ScriptureSimpleDTOConstructorParameters;
export type T_ScriptureDTOConstructorParametersJSON =
  T_ScriptureSimpleDTOConstructorParametersJSON;

export class ScriptureDTO extends ScriptureSimpleDTO {
  constructor(data: T_ScriptureSimpleDTOConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(
    data: T_ScriptureDTOConstructorParametersJSON
  ): ScriptureDTO {
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureDTO({ ...data, meanings });
  }

  getMeaningTextOrDefault(langCode: TLangCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Scripture"
    );
  }
}

export type T_ScriptureLowerDTOConstructorParameters =
  T_ScriptureDTOConstructorParameters & {
    sections: Array<SectionLowerDTO>;
  };
export type T_ScriptureLowerDTOConstructorParametersJSON =
  T_ScriptureDTOConstructorParametersJSON & {
    sections: Array<T_SectionLowerDTOConstructorParametersJSON>;
  };

export class ScriptureLowerDTO extends ScriptureDTO {
  private readonly sections: Array<SectionLowerDTO>;

  constructor(data: T_ScriptureLowerDTOConstructorParameters) {
    super({ ...data });

    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureLowerDTOConstructorParametersJSON
  ): ScriptureLowerDTO {
    const sections = data.sections.map(SectionLowerDTO.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureLowerDTO({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<SectionLowerDTO> {
    return this.sections;
  }
}

export type T_ScriptureUpperDTOConstructorParameters =
  T_ScriptureDTOConstructorParameters & {
    sections: Array<SectionDTO>;
  };
export type T_ScriptureUpperDTOConstructorParametersJSON =
  T_ScriptureDTOConstructorParametersJSON & {
    sections: Array<T_SectionDTOConstructorParametersJSON>;
  };

export class ScriptureOneLevelUpperDTO extends ScriptureDTO {
  constructor(data: T_ScriptureUpperDTOConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_ScriptureUpperDTOConstructorParametersJSON
  ): ScriptureOneLevelUpperDTO {
    const sections = data.sections.map(SectionDTO.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureOneLevelUpperDTO({ ...data, sections, meanings });
  }
}

export type T_ScriptureOneLevelLowerDTOConstructorParameters =
  T_ScriptureDTOConstructorParameters & {
    sections: Array<SectionDTO>;
  };
export type T_ScriptureOneLevelLowerDTOConstructorParametersJSON =
  T_ScriptureDTOConstructorParametersJSON & {
    sections: Array<T_SectionDTOConstructorParametersJSON>;
  };

export class ScriptureOneLevelLowerDTO extends ScriptureDTO {
  private readonly sections: ReadonlyArray<SectionDTO>;

  constructor(data: T_ScriptureOneLevelLowerDTOConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureOneLevelLowerDTOConstructorParametersJSON
  ): ScriptureOneLevelLowerDTO {
    const sections = data.sections.map(SectionDTO.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureOneLevelLowerDTO({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<SectionDTO> {
    return this.sections;
  }
}

export type T_ScriptureMeaningDTOConstructorParameters =
  T_MeaningConstructorParameters;
export type T_ScriptureMeaningDTOConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class ScriptureMeaningDTO extends Meaning {
  constructor(data: T_ScriptureMeaningDTOConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_ScriptureMeaningDTOConstructorParametersJSON
  ): ScriptureMeaningDTO {
    const language = LanguageDTO.createFromJSON(data.language);
    return new ScriptureMeaningDTO({ ...data, language });
  }
}

export type T_ScriptureConfinedDTOConstructorParameters =
  T_ScriptureBaseDTOConstructorParameters;
export type T_ScriptureConfinedDTOConstructorParametersJSON =
  T_ScriptureBaseDTOConstructorParametersJSON;

export abstract class ScriptureConfinedDTO extends ScriptureBaseDTO {
  constructor(data: T_ScriptureConfinedDTOConstructorParameters) {
    super({ ...data });
  }
}

export type T_ScriptureUpperConfinedDTOConstructorParameters =
  T_ScriptureConfinedDTOConstructorParameters;
export type T_ScriptureUpperConfinedDTOConstructorParametersJSON =
  T_ScriptureConfinedDTOConstructorParametersJSON;

export class ScriptureUpperConfinedDTO extends ScriptureConfinedDTO {
  constructor(data: T_ScriptureUpperConfinedDTOConstructorParameters) {
    super({ ...data });
  }

  static createFromJSON(
    data: T_ScriptureUpperConfinedDTOConstructorParametersJSON
  ): ScriptureUpperConfinedDTO {
    return new ScriptureUpperConfinedDTO({ ...data });
  }
}

export type T_ScriptureLowerConfinedDTOConstructorParameters =
  T_ScriptureConfinedDTOConstructorParameters & {
    sections: ReadonlyArray<SectionLowerConfinedDTO>;
  };
export type T_ScriptureLowerConfinedDTOConstructorParametersJSON =
  T_ScriptureConfinedDTOConstructorParametersJSON & {
    sections: ReadonlyArray<T_SectionLowerDTOConstructorParametersJSON>;
  };

export class ScriptureLowerConfinedDTO extends ScriptureConfinedDTO {
  private readonly sections: ReadonlyArray<SectionLowerConfinedDTO>;

  constructor(data: T_ScriptureLowerConfinedDTOConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static createFromJSON(
    data: T_ScriptureLowerConfinedDTOConstructorParametersJSON
  ): ScriptureLowerConfinedDTO {
    const sections = data.sections.map(SectionLowerConfinedDTO.createFromJSON);
    return new ScriptureLowerConfinedDTO({ ...data, sections });
  }

  getSections(): ReadonlyArray<SectionLowerConfinedDTO> {
    return this.sections;
  }
}

export type T_ScriptureMeanDTOConstructorParameters =
  T_ScriptureBaseDTOConstructorParameters & {
    meanings: Array<ScriptureMeaningDTO>;
  };
export type T_ScriptureMeanDTOConstructorParametersJSON =
  T_ScriptureBaseDTOConstructorParametersJSON & {
    meanings: Array<T_ScriptureMeaningDTOConstructorParametersJSON>;
  };

export class ScriptureMeanDTO extends ScriptureBaseDTO {
  private readonly meanings: Array<ScriptureMeaningDTO>;

  constructor(data: T_ScriptureMeanDTOConstructorParameters) {
    super({ ...data });
    this.meanings = data.meanings;
  }

  static createFromJSON(
    data: T_ScriptureMeanDTOConstructorParametersJSON
  ): ScriptureMeanDTO {
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureMeanDTO({ ...data, meanings });
  }

  getMeaningTextOrDefault(langCode: TLangCode): string {
    return (
      this.getMeanings()
        .find((t) => t.getLanguage().getLangCode() == langCode)
        ?.getText() ?? "Unknown Scripture"
    );
  }

  getMeanings(): ReadonlyArray<ScriptureMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }
}

export type T_ScriptureUpperMeanDTOConstructorParameters =
  T_ScriptureMeanDTOConstructorParameters;
export type T_ScriptureUpperMeanDTOConstructorParametersJSON =
  T_ScriptureMeanDTOConstructorParametersJSON;

export class ScriptureUpperMeanDTO extends ScriptureMeanDTO {
  constructor(data: T_ScriptureUpperMeanDTOConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_ScriptureUpperMeanDTOConstructorParametersJSON
  ): ScriptureUpperMeanDTO {
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureUpperMeanDTO({ ...data, meanings });
  }
}

export type T_ScriptureLowerMeanDTOConstructorParameters =
  T_ScriptureMeanDTOConstructorParameters & {
    sections: Array<SectionLowerMeanDTO>;
  };
export type T_ScriptureLowerMeanDTOConstructorParametersJSON =
  T_ScriptureMeanDTOConstructorParametersJSON & {
    sections: Array<T_SectionLowerDTOConstructorParametersJSON>;
  };

export class ScriptureLowerMeanDTO extends ScriptureMeanDTO {
  private readonly sections: Array<SectionLowerMeanDTO>;

  constructor(data: T_ScriptureLowerMeanDTOConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureLowerMeanDTOConstructorParametersJSON
  ): ScriptureLowerMeanDTO {
    const sections = data.sections.map(SectionLowerMeanDTO.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureLowerMeanDTO({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<SectionLowerMeanDTO> {
    return Object.freeze([...this.sections]);
  }
}

export type T_ScriptureThreeLevelLowerDTOConstructorParameters =
  T_ScriptureDTOConstructorParameters & {
    sections: Array<SectionTwoLevelLowerDTO>;
  };

export type T_ScriptureThreeLevelLowerDTOConstructorParametersJSON =
  T_ScriptureDTOConstructorParametersJSON & {
    sections: Array<T_SectionTwoLevelLowerDTOConstructorParametersJSON>;
  };

export class ScriptureThreeLevelLowerDTO extends ScriptureDTO {
  private readonly sections: ReadonlyArray<SectionTwoLevelLowerDTO>;

  constructor(data: T_ScriptureThreeLevelLowerDTOConstructorParameters) {
    super({ ...data });
    this.sections = data.sections;
  }

  static override createFromJSON(
    data: T_ScriptureThreeLevelLowerDTOConstructorParametersJSON
  ): ScriptureThreeLevelLowerDTO {
    const sections = data.sections.map(SectionTwoLevelLowerDTO.createFromJSON);
    const meanings = data.meanings.map(ScriptureMeaningDTO.createFromJSON);
    return new ScriptureThreeLevelLowerDTO({ ...data, sections, meanings });
  }

  getSections(): ReadonlyArray<SectionTwoLevelLowerDTO> {
    return Object.freeze([...this.sections]);
  }
}
