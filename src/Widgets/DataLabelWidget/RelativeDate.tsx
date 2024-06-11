import { useEffect, useState } from 'react'
import {
  formatDateMonthAndYear,
  formatDayAndMonth,
  formatFullDateTime,
} from '../../utils/formatDate'
import { connect, currentLanguage } from 'scrivito'

const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000

export const RelativeDate = connect(function RelativeDate({
  date,
}: {
  date: Date
}) {
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
})

const DisplayDate = connect(function DisplayDate({
  currentDate,
  date,
}: {
  currentDate: Date
  date: Date
}) {
  const youngerThanOneMonth =
    currentDate.getTime() - date.getTime() < MONTH_IN_MS

  if (youngerThanOneMonth) {
    return formatDistance(date, currentDate)
  }

  if (date.getUTCFullYear() === currentDate.getUTCFullYear()) {
    return formatDayAndMonth(date)
  }

  return formatDateMonthAndYear(date)
})

function formatDistance(date: Date, currentDate: Date) {
  const days = Math.round(
    (date.getTime() - currentDate.getTime()) / (24 * 3600 * 1000),
  )
  const months = Math.round(days / 30.436875)
  const years = date.getFullYear() - new Date(currentDate).getFullYear()

  const relativeTimeFormat = new Intl.RelativeTimeFormat(
    currentLanguage() ?? 'en',
    {
      numeric: 'auto',
    },
  )

  if (years !== 0) return relativeTimeFormat.format(years, 'year')
  if (months !== 0) return relativeTimeFormat.format(months, 'month')
  return relativeTimeFormat.format(days, 'day')
}
