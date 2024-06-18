export default function useDateTimeFormat(timestamp) {
  const date = new Date(timestamp)
  const language = "es-ES"

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}
