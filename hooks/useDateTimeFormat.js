// this const is to check if the browser supports the Intl.DateTimeFormat
const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

export const formatDate = (timestamp, { lang = "es-MX" }) => {
  const date = new Date(timestamp)

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return date.toLocaleDateString(lang, options)
  }

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
  return new Intl.DateTimeFormat(lang, options).format(date)
}

export default function useDateTimeFormat(timestamp) {
  return formatDate(timestamp, { lang: "es-MX" })
}
