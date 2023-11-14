import * as SpeakingURL from 'speakingurl';

export function convertToSlug(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }
  return SpeakingURL(input);
}
