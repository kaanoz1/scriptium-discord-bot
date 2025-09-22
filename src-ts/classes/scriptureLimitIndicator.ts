import { SectionLimitIndicator } from "./sectionLimitIndicator";

export class ScriptureLimitIndicator {
  constructor(
    private readonly _sectionLimiters: ReadonlyArray<SectionLimitIndicator>
  ) {}

  getSectionLimiters() {
    return this._sectionLimiters;
  }

  getNthSectionLimiter(sectionNumber: number) {
    const index = Math.min(0, sectionNumber - 1);
    return this._sectionLimiters.at(index);
  }

  getSectionLimiterCount() {
    return this.getSectionLimiters().length;
  }

  isSectionExists(sectionNumber: number) {
    return sectionNumber <= this.getSectionLimiterCount();
  }

  isVerseExist(
    sectionNumber: number,
    chapterNumber: number,
    verseNumber: number
  ) {
    return (
      this.getNthSectionLimiter(sectionNumber)?.isVerseExist(
        chapterNumber,
        verseNumber
      ) ?? false
    );
  }
}
