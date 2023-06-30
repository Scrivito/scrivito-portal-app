import { isFinite } from 'underscore';
import { InternalError } from 'scrivito_sdk/common';

const INTEGER_RANGE_START = -9007199254740991;
const INTEGER_RANGE_END = 9007199254740991;
const BACKEND_FORMAT_REGEXP = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;

export function deserializeAsInteger(value: unknown): number | null {
  if (typeof value === 'string' && value.match(/^-?\d+$/)) {
    return convertToInteger(value);
  }

  return typeof value === 'number' ? convertToInteger(value) : null;
}

export function isValidInteger(value: unknown): value is number {
  return (
    isInteger(value) &&
    INTEGER_RANGE_START <= value &&
    value <= INTEGER_RANGE_END
  );
}

export function isValidFloat(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value);
}

export function deserializeAsDate(value: unknown): Date | null {
  if (typeof value !== 'string') return null;

  if (!isValidDateString(value)) {
    // The value is not a valid ISO date time
    throw new InternalError();
  }

  return parseStringToDate(value);
}

export function parseStringToDate(
  dateString: string | null | undefined
): Date | null {
  if (!dateString) return null;

  const dateMatch = dateString.match(BACKEND_FORMAT_REGEXP);
  if (!dateMatch) return null;

  const [
    ,
    yearString,
    monthString,
    dayString,
    hoursString,
    minutesString,
    secondsString,
  ] = dateMatch;
  const year = parseInt(yearString, 10);
  const month = parseInt(monthString, 10);
  const day = parseInt(dayString, 10);
  const hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);
  const seconds = parseInt(secondsString, 10);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}

export function formatDateToString(date: Date): string {
  const yearMonth = `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}`;
  const dateHours = `${pad(date.getUTCDate())}${pad(date.getUTCHours())}`;
  const minutesSeconds = `${pad(date.getUTCMinutes())}${pad(
    date.getUTCSeconds()
  )}`;
  return `${yearMonth}${dateHours}${minutesSeconds}`;
}

export function isValidDateString(dateString: unknown): dateString is string {
  return typeof dateString === 'string' && !!dateString.match(/^\d{14}$/);
}

function pad(num: number): string | number {
  return num < 10 ? `0${num}` : num;
}

function isInteger(value: unknown): value is number {
  return isValidFloat(value) && Math.floor(value) === value;
}

function convertToInteger(valueFromBackend: number | string): number | null {
  const intValue = parseInt(valueFromBackend.toString(), 10);

  if (intValue === 0) {
    return 0; // otherwise -0 could be returned.
  } else if (isValidInteger(intValue)) {
    return intValue;
  }

  return null;
}
