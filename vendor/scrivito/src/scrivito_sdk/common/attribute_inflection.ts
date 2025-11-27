const CONVERT_TO_CAMELCASE = /(_+)(\w)/g;
const CONVERT_TO_UNDERSCORE = /([A-Z])/g;

const TEST_ABBR_OR_NUMBER = /[A-Z]+|\d+/g;
const TEST_CAMEL_CASE = /^_?(_+[A-Z0-9]|[^_])+$/;
const TEST_SEPARATOR = /[_\s]+/g;
const TEST_TITLE_CASE_WORD = /[A-Z][a-z]+/g;
const TEST_UNDERSCORE = /^[a-z0-9_:]+$/;

export function isUnderscore(name: string): boolean {
  return TEST_UNDERSCORE.test(name);
}

export function isCamelCase(name: string): boolean {
  return TEST_CAMEL_CASE.test(name);
}

export function underscore(name: string): string {
  const underscored = name.replace(
    CONVERT_TO_UNDERSCORE,
    (_match, group) => `_${group.toLowerCase()}`
  );

  return underscored[0] === '_' && name[0] !== '_'
    ? underscored.substring(1)
    : underscored;
}

export function camelCase(name: string): string {
  return name.replace(
    CONVERT_TO_CAMELCASE,
    (match, underscores, nextChar, index) => {
      if (!index) {
        return match;
      }
      if (nextChar.toUpperCase() === nextChar) {
        return match;
      }

      return `${underscores.substr(1)}${nextChar.toUpperCase()}`;
    }
  );
}

export function classify(name: string): string {
  const camelCased = camelCase(name);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

export function sentenceCase(name: string): string {
  return name
    .replace(TEST_SEPARATOR, ' ')
    .replace(TEST_TITLE_CASE_WORD, (word) => ` ${word.toLowerCase()}`)
    .replace(TEST_ABBR_OR_NUMBER, (word) => ` ${word}`)
    .trim()
    .replace(/./, (c) => c.toUpperCase());
}
