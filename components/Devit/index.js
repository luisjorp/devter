import Avatar from "@components/Avatar"
import useTimeAgo from "@/hooks/useTimeAgo"
import Image from "next/image"
import useDateTimeFormat from "@/hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  avatar,
  content,
  createdAt,
  id,
  img,
  imgBase64,
  userId,
  userName,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormatted = useDateTimeFormat(createdAt)
  const router = useRouter()
  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <time title={createdAtFormatted}>{timeAgo}</time>
            </Link>
          </header>
          <p>{content}</p>
          {img && (
            <Image
              src={img}
              alt={content}
              placeholder="blur"
              blurDataURL={imgBase64}
              width={0}
              height={0}
              priority={true}
              sizes="(max-width: 600px) 100vw, 600px" // if the viewport is less than 600px, the image will take up 100% of the viewport width, otherwise it will take up 600px since is mobile only
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

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        section {
          flex: 1;
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

        header :global(a) {
          text-decoration: none;
        }

        header :global(a):hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
