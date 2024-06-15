import Avatar from "@components/Avatar"
import useTimeAgo from "@/hooks/useTimeAgo"
import Image from "next/image"

export default function Devit({
  avatar,
  userName,
  id,
  img,
  content,
  createdAt,
  userId,
}) {
  const timeAgo = useTimeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <time>{timeAgo}</time>
          </header>
          <p>{content}</p>
          {img && (
            <Image
              src={img}
              alt={content}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                borderRadius: "10px",
                height: "auto",
                marginTop: "10px",
                width: "100%",
              }}
            />
          )}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
