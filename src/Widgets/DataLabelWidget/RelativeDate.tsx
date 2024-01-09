import { formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'

const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000
const dateTimeFormatLocale = 'en-GB'

export function RelativeDate({ date }: { date: Date }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 30_000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span title={formatFullDateTime(date)}>
      <DisplayDate currentDate={currentDate} date={date} />
    </span>
  )
}

function DisplayDate({ currentDate, date }: { currentDate: Date; date: Date }) {
  const youngerThanOneMonth =
    currentDate.getTime() - date.getTime() < MONTH_IN_MS

  if (youngerThanOneMonth) {
    return formatDistance(date, currentDate, { addSuffix: true })
  }

  if (date.getUTCFullYear() === currentDate.getUTCFullYear()) {
    return formatDayAndMonth(date)
  }

  return formatDateMonthAndYear(date)
}

function formatFullDateTime(date: Date): string {
  return new Intl.DateTimeFormat(dateTimeFormatLocale, {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
}

function formatDayAndMonth(date: Date) {
  return new Intl.DateTimeFormat(dateTimeFormatLocale, {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function formatDateMonthAndYear(date: Date) {
  return new Intl.DateTimeFormat(dateTimeFormatLocale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
