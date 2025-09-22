import { TVocalizationKey } from "../utility/types";
import {
  LanguageDTO,
  Meaning,
  T_MeaningConstructorParameters,
  T_MeaningConstructorParametersJSON,
} from "./Language";
import {
  RootDTO,
  RootLowerConfinedDTO,
  T_RootDTOConstructorParametersJSON,
  T_RootLowerConfinedDTOConstructorParametersJSON,
} from "./Root";
import {
  VerseUpperDTO,
  VerseDTO,
  VerseUpperConfinedDTO,
  TextVariationDTO,
  T_TextVariationDTOConstructorParametersJSON,
  T_VerseUpperDTOConstructorParametersJSON,
  T_VerseDTOConstructorParametersJSON,
  T_VerseUpperConfinedDTOConstructorParametersJSON,
} from "./Verse";

export type T_WordBaseDTOConstructorParameters = {
  id: number;
  sequenceNumber: number;
};
export type T_WordBaseDTOConstructorParametersJSON =
  T_WordBaseDTOConstructorParameters;

export abstract class WordBaseDTO {
  protected readonly id: number;
  protected readonly sequenceNumber: number;

  constructor(data: T_WordBaseDTOConstructorParameters) {
    this.id = data.id;
    this.sequenceNumber = data.sequenceNumber;
  }

  getId(): number {
    return this.id;
  }

  getSequenceNumber(): number {
    return this.sequenceNumber;
  }
}

export type T_WordSimpleDTOConstructorParameters =
  T_WordBaseDTOConstructorParameters & {
    variation: TextVariationDTO;
    meanings: Array<WordMeaningDTO>;
  };
export type T_WordSimpleDTOConstructorParametersJSON =
  T_WordBaseDTOConstructorParametersJSON & {
    variation: T_TextVariationDTOConstructorParametersJSON;
    meanings: Array<T_WordMeaningDTOConstructorParametersJSON>;
  };

export abstract class WordSimpleDTO extends WordBaseDTO {
  protected readonly variation: Readonly<TextVariationDTO>;
  protected readonly meanings: ReadonlyArray<WordMeaningDTO>;

  constructor(data: T_WordSimpleDTOConstructorParameters) {
    super({ ...data });
    this.variation = data.variation;
    this.meanings = data.meanings;
  }

  getVariation(): Readonly<TextVariationDTO> {
    return Object.freeze(this.variation);
  }

  getMeanings(): ReadonlyArray<WordMeaningDTO> {
    return Object.freeze([...this.meanings]);
  }
}

export type T_WordDTOConstructorParameters =
  T_WordSimpleDTOConstructorParameters;
export type T_WordDTOConstructorParametersJSON =
  T_WordSimpleDTOConstructorParametersJSON;

export class WordDTO extends WordSimpleDTO {
  constructor(data: T_WordDTOConstructorParameters) {
    super({ ...data });
  }

  getTextOfVariationOrUsual(variation: TVocalizationKey) {
    return (
      this.getVariation().getTextWithVariation(variation) ??
      this.getVariation().getUsual()
    );
  }

  static createFromJSON(data: T_WordDTOConstructorParametersJSON): WordDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    return new WordDTO({ ...data, meanings, variation });
  }
}

export type T_WordUpperDTOConstructorParameters =
  T_WordDTOConstructorParameters & { verse: VerseUpperDTO };
export type T_WordUpperDTOConstructorParametersJSON =
  T_WordDTOConstructorParametersJSON & {
    verse: T_VerseUpperDTOConstructorParametersJSON;
  };

export class WordUpperDTO extends WordDTO {
  private verse: VerseUpperDTO;

  constructor(data: T_WordUpperDTOConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_WordUpperDTOConstructorParametersJSON
  ): WordUpperDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    const verse = VerseUpperDTO.createFromJSON(data.verse);
    return new WordUpperDTO({ ...data, variation, meanings, verse });
  }

  getVerse(): VerseUpperDTO {
    return this.verse;
  }
}

export type T_WordOneLevelUpperDTOConstructorParameters =
  T_WordDTOConstructorParameters & { verse: VerseDTO };
export type T_WordOneLevelUpperDTOConstructorParametersJSON =
  T_WordDTOConstructorParametersJSON & {
    verse: T_VerseDTOConstructorParametersJSON;
  };

export class WordOneLevelUpperDTO extends WordDTO {
  private readonly verse: Readonly<VerseDTO>;

  constructor(data: T_WordOneLevelUpperDTOConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_WordOneLevelUpperDTOConstructorParametersJSON
  ): WordOneLevelUpperDTO {
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    const verse = VerseDTO.createFromJSON(data.verse);

    return new WordOneLevelUpperDTO({ ...data, variation, meanings, verse });
  }

  getVerse(): Readonly<VerseDTO> {
    return Object.freeze(this.verse);
  }
}

export type T_WordLowerDTOConstructorParameters =
  T_WordDTOConstructorParameters & { roots: Array<RootDTO> };
export type T_WordLowerDTOConstructorParametersJSON =
  T_WordDTOConstructorParametersJSON & {
    roots: Array<T_RootDTOConstructorParametersJSON>;
  };

export class WordLowerDTO extends WordDTO {
  private readonly roots: ReadonlyArray<RootDTO>;

  constructor(data: T_WordLowerDTOConstructorParameters) {
    super({ ...data });
    this.roots = data.roots;
  }

  static override createFromJSON(
    data: T_WordLowerDTOConstructorParametersJSON
  ): WordLowerDTO {
    const roots = data.roots.map((r) => RootDTO.createFromJSON(r));
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    return new WordLowerDTO({ ...data, roots, variation, meanings });
  }

  getRoots(): ReadonlyArray<RootDTO> {
    return Object.freeze([...this.roots]);
  }
}

export type T_WordBothDTOConstructorParameters =
  T_WordDTOConstructorParameters & {
    verse: VerseDTO;
    roots: Array<RootDTO>;
  };
export type T_WordBothDTOConstructorParametersJSON =
  T_WordDTOConstructorParametersJSON & {
    verse: T_VerseDTOConstructorParametersJSON;
    roots: Array<T_RootDTOConstructorParametersJSON>;
  };

export class WordBothDTO extends WordDTO {
  private readonly verse: Readonly<VerseDTO>;
  private readonly roots: ReadonlyArray<RootDTO>;

  constructor(data: T_WordBothDTOConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
    this.roots = data.roots;
  }

  static override createFromJSON(
    data: T_WordBothDTOConstructorParametersJSON
  ): WordBothDTO {
    const roots = data.roots.map((r) => RootDTO.createFromJSON(r));
    const variation = TextVariationDTO.createFromJSON(data.variation);
    const meanings = data.meanings.map((m) => Meaning.createFromJSON(m));
    const verse = VerseDTO.createFromJSON(data.verse);
    return new WordBothDTO({ ...data, roots, meanings, variation, verse });
  }

  getVerse(): Readonly<VerseDTO> {
    return Object.freeze(this.verse);
  }

  getRoots(): ReadonlyArray<RootDTO> {
    return Object.freeze([...this.roots]);
  }
}

export type T_WordMeaningDTOConstructorParameters =
  T_MeaningConstructorParameters;
export type T_WordMeaningDTOConstructorParametersJSON =
  T_MeaningConstructorParametersJSON;

export class WordMeaningDTO extends Meaning {
  constructor(data: T_WordMeaningDTOConstructorParameters) {
    super({ ...data });
  }

  static override createFromJSON(
    data: T_WordMeaningDTOConstructorParametersJSON
  ): WordMeaningDTO {
    const language = LanguageDTO.createFromJSON(data.language);
    return new WordMeaningDTO({ ...data, language });
  }
}

export type T_WordConfinedDTOConstructorParameters =
  T_WordBaseDTOConstructorParameters;
export type T_WordConfinedDTOConstructorParametersJSON =
  T_WordBaseDTOConstructorParametersJSON;

export abstract class WordConfinedDTO extends WordBaseDTO {
  constructor(data: T_WordConfinedDTOConstructorParameters) {
    super({ ...data });
  }
}

export type T_WordUpperConfinedDTOConstructorParameters =
  T_WordConfinedDTOConstructorParameters & {
    verse: VerseUpperConfinedDTO;
  };
export type T_WordUpperConfinedDTOConstructorParametersJSON =
  T_WordConfinedDTOConstructorParametersJSON & {
    verse: T_VerseUpperConfinedDTOConstructorParametersJSON;
  };

export class WordUpperConfinedDTO extends WordConfinedDTO {
  private readonly verse: Readonly<VerseUpperConfinedDTO>;

  constructor(data: T_WordUpperConfinedDTOConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static createFromJSON(
    data: T_WordUpperConfinedDTOConstructorParametersJSON
  ): WordUpperConfinedDTO {
    const verse = VerseUpperConfinedDTO.createFromJSON(data.verse);

    return new WordUpperConfinedDTO({ ...data, verse });
  }

  getVerse(): Readonly<VerseUpperConfinedDTO> {
    return Object.freeze(this.verse);
  }
}

export type T_WordLowerConfinedDTOConstructorParameters =
  T_WordConfinedDTOConstructorParameters & {
    roots: Array<RootLowerConfinedDTO>;
  };
export type T_WordLowerConfinedDTOConstructorParametersJSON =
  T_WordConfinedDTOConstructorParametersJSON & {
    roots: Array<T_RootLowerConfinedDTOConstructorParametersJSON>;
  };

export class WordLowerConfinedDTO extends WordConfinedDTO {
  private readonly roots: ReadonlyArray<RootLowerConfinedDTO>;

  constructor(data: T_WordLowerConfinedDTOConstructorParameters) {
    super({ ...data });
    this.roots = data.roots;
  }

  static createFromJSON(
    data: T_WordLowerConfinedDTOConstructorParametersJSON
  ): WordLowerConfinedDTO {
    const roots = data.roots.map((r) => RootLowerConfinedDTO.createFromJSON(r));
    return new WordLowerConfinedDTO({ ...data, roots });
  }

  getRoots(): ReadonlyArray<RootLowerConfinedDTO> {
    return Object.freeze([...this.roots]);
  }
}
