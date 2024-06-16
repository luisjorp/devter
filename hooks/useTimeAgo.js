import { useEffect, useState, useCallback } from "react"

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

  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: "short",
  })

  // Memoize the function that updates the timeAgo state
  const updateTimeAgo = useCallback(() => {
    const newTimeAgo = getDateDiffs(timestamp)
    setTimeAgo(newTimeAgo)
  }, [timestamp])

  useEffect(() => {
    const interval = setInterval(updateTimeAgo, 5000)
    return () => clearInterval(interval)
  }, [updateTimeAgo])

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
