import AppLayout from "@components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "@components/Devit"
import useUser from "@/hooks/useUser"
import { fetchLatestDevits } from "@/firebase/client"
import Loader from "@components/Loader"

export default function Home() {
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
                key={devit.id}
                userId={devit.userId}
                userName={devit.userName}
              />
            ))}
          </section>
        )}
        <nav></nav>
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

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #ffffff;
          bottom: -1px;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
