import { ChapterLimitIndicator } from "./chapterLimitIndicator";

export class SectionLimitIndicator {
  constructor(
    private readonly _chapterLimiters: ReadonlyArray<ChapterLimitIndicator>
  ) {}

  getChapterLimiters() {
    return this._chapterLimiters;
  }

  getChapterLimiterCount() {
    return this.getChapterLimiters().length;
  }

  getNthChapterLimiterCount(number: number) {
    const index = Math.max(0, number - 1);

    return this.getChapterLimiters().at(index);
  }

  isChapterExists(chapterNumber: number) {
    return chapterNumber < this.getChapterLimiterCount();
  }

  isVerseExist(chapterNumber: number, verseNumber: number) {
    return (
      this.getNthChapterLimiterCount(chapterNumber)?.isVerseExist(
        verseNumber
      ) ?? false
    );
  }
}
