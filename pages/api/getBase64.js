import { getPlaiceholder } from "plaiceholder"

export default async (req, res) => {
  const { body } = req
  const { url } = body

  const buffer = await fetch(url).then(async (res) => {
    return Buffer.from(await res.arrayBuffer())
  })

  const { base64 } = await getPlaiceholder(buffer)

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ base64 }))
}
