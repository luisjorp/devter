import AppLayout from "@components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "@components/Devit"
import useUser from "@/hooks/useUser"

export default function Home() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch("/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline)
  }, [user])

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
