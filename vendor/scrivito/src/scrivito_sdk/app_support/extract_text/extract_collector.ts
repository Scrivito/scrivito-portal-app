export class ExtractCollector {
  private currentLength: number = 0;
  private readonly extracts: string[] = [];

  constructor(private readonly maxLength: number) {}

  isMaxLengthReached(): boolean {
    return this.currentLength >= this.maxLength;
  }

  push(extract: string): void {
    if (!extract) return;
    this.currentLength += extract.length + (this.extracts.length ? 1 : 0);
    this.extracts.push(extract);
  }

  toString(): string {
    const extractedText = this.extracts.join(' ');
    const shortenedText = extractedText.substring(0, this.maxLength);
    return shortenedText.replace(/ $/, '');
  }
}
