import { useEffect, useState, useCallback } from "react"
import { formatDate } from "@/hooks/useDateTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp, { lang: "es-MX" })
  }

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  })

  // Memoize the function that updates the timeAgo state
  const updateTimeAgo = useCallback(() => {
    const newTimeAgo = getDateDiffs(timestamp)
    setTimeAgo(newTimeAgo)
  }, [timestamp])

  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(updateTimeAgo, 5000)
      return () => clearInterval(interval)
    }
  }, [updateTimeAgo])

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
