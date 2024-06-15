import AppLayout from "@components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "@components/Devit"
import useUser from "@/hooks/useUser"
import { fetchLatestDevits } from "@/firebase/client"
import Loader from "@components/Loader"
import Link from "next/link"
import Create from "@components/icons/Create"
import Home from "@components/icons/Home"
import Search from "@components/icons/Search"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useUser()

  useEffect(() => {
    if (user) {
      fetchLatestDevits().then((devits) => {
        setTimeline(devits)
        setLoading(false)
      })
    }
  }, [user])

  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Devter 🐦</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        {loading ? (
          <Loader />
        ) : (
          <section>
            {timeline.map((devit) => (
              <Devit
                avatar={devit.avatar}
                content={devit.content}
                createdAt={devit.createdAt}
                id={devit.id}
                img={devit.img}
                key={devit.id}
                userId={devit.userId}
                userName={devit.userName}
              />
            ))}
          </section>
        )}
        <nav>
          <Link href="/home">
            <Home stroke="#09f" width={32} height={32} />
          </Link>
          <Link href="/search">
            <Search stroke="#09f" width={32} height={32} />
          </Link>
          <Link href="/compose/tweet">
            <Create stroke="#09f" width={32} height={32} />
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          background-color: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #ccc;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
          display: flex;
          align-items: center;
        }

        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #ffffff;
          bottom: -1px;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }

        nav :global(a) {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav :global(a):hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
      `}</style>
    </>
  )
}
