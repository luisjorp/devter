import { firestore } from "@/firebase/admin"

export default async (req, res) => {
  const { query } = req
  const { id } = query

  try {
    const doc = await firestore.collection("devits").doc(id).get()

    if (!doc.exists) {
      return res.status(404).json({ error: "Document not found" })
    }

    const data = doc.data()
    const createdAt = data.createdAt.toDate()
    const response = {
      ...data,
      id: doc.id,
      createdAt: +createdAt,
    }

    res.status(200).json(response)
  } catch (error) {
    console.error("Error fetching document:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
