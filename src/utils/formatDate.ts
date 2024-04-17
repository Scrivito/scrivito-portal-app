import { getCurrentLanguage } from './currentLanguage'

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat(getCurrentLanguage(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

export function formatFullDateTime(date: Date): string {
  return new Intl.DateTimeFormat(getCurrentLanguage(), {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
}

export function formatDayAndMonth(date: Date) {
  return new Intl.DateTimeFormat(getCurrentLanguage(), {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatFullDayAndMonth(date: Date) {
  return new Intl.DateTimeFormat(getCurrentLanguage(), {
    dateStyle: 'full',
  }).format(date)
}

export function formatDateMonthAndYear(date: Date) {
  return new Intl.DateTimeFormat(getCurrentLanguage(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
