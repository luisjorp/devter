import AppLayout from "@components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "@components/Devit"

export default function Home() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => (
            <Devit
              avatar={devit.avatar}
              id={devit.id}
              key={devit.id}
              message={devit.message}
              username={devit.username}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
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
        }

        section {
          padding-top: 56px;
        }
        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </>
  )
}
