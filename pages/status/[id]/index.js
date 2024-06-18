import Devit from "@components/Devit"
import { firestore } from "@/firebase/admin"
import Loader from "@components/Loader"
import { useRouter } from "next/router"
export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <>
      <Devit {...props}></Devit>
      <style jsx>
        {`
          h1 {
            color: red;
          }
        `}
      </style>
    </>
  )
}

//this data fetching method is called on the build time, so it will be cached
//and the page will be static
//this is good for SEO
//this is good for performance
//this is good for the user
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "BZ3HrwhxARw34NnnPerF" } }],
    fallback: true,
  }
}
export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  try {
    const doc = await firestore.collection("devits").doc(id).get()

    if (!doc.exists) {
      return { error: "Document not found" }
    }

    const data = doc.data()
    const createdAt = data.createdAt.toDate()
    const props = {
      ...data,
      id: doc.id,
      createdAt: +createdAt,
    }

    return { props }
  } catch (error) {
    console.error("Error fetching document:", error)
    return { error: "Internal Server Error" }
  }
}

// THIS data fetching method is called on the server on each request
/*export async function getServerSideProps(context) {
  //params, res, req, query, preview
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(404).end()
  }
}*/

// This is rendered on the server on each request, showing a blank page
// this is deprecated
/*DevitPage.getInitialProps = (context) => {
  const { query, res } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
    if (res) {
      res.writeHead(404).end()
    }
  })
}*/
