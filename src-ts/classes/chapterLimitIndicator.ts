export class ChapterLimitIndicator {
  constructor(private readonly _verseLimit: number) {}

  getVerseLimit() {
    return this._verseLimit;
  }

  isVerseExist(verseNumber: number) {
    return verseNumber <= this._verseLimit;
  }
}
