import { createStateContainer } from 'scrivito_sdk/state';

const contentTagsForEmptyAttributes = createStateContainer<boolean>();

export function skipContentTagsForEmptyAttributes(): void {
  contentTagsForEmptyAttributes.set(false);
}

export function shouldContentTagsForEmptyAttributesBeSkipped(): boolean {
  return contentTagsForEmptyAttributes.get() === false;
}
