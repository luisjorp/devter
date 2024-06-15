export default function getBase64(src) {
  return fetch("/api/getBase64", {
    method: "POST",
    body: JSON.stringify({ url: src }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.base64
    })
}
