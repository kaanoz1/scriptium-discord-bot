import { TScriptureCode } from "../utility/types";
import { ScriptureLimitIndicator } from "./scriptureLimitIndicator";

export abstract class ScriptureDetail {
  protected abstract _defaultTranslationId: number;
  protected abstract _number: number;

  constructor(
    private code: TScriptureCode,
    private readonly _scriptureLimiter: Readonly<ScriptureLimitIndicator>
  ) {}

  getLimitIndicator() {
    return this._scriptureLimiter;
  }

  getCode() {
    return this.code;
  }

  isVerseExist(
    sectionNumber: number,
    chapterNumber: number,
    verseNumber: number
  ) {
    return (
      this._scriptureLimiter
        .getNthSectionLimiter(sectionNumber)
        ?.isVerseExist(chapterNumber, verseNumber) ?? false
    );
  }

  getDefaultTranslationId() {
    return this._defaultTranslationId;
  }

  getNumber() {
    return this._number;
  }
}

export class TorahDetails extends ScriptureDetail {
  protected override _number: number;
  protected override _defaultTranslationId: number;
  constructor(limiter: ScriptureLimitIndicator) {
    super("t", limiter);
    this._defaultTranslationId = 1;
    this._number = 1;
  }
}
