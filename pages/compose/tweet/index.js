import Button from "@components/Button"
import useUser from "@/hooks/useUser"
import { useEffect, useState } from "react"
import { addDevit, uploadImage } from "@/firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"
import { colors } from "@styles/theme"
import Avatar from "@components/Avatar"

const FORM_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(FORM_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(FORM_STATES.LOADING)
    console.log(message)

    addDevit({
      avatar: user.avatar,
      content: message,
      img: imgURL,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        setStatus(FORM_STATES.SUCCESS)
        router.push("/home")
      })
      .catch((err) => {
        setStatus(FORM_STATES.ERROR)
        console.error(err)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    console.log()

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    message.length === 0 || status === FORM_STATES.LOADING

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const OnComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url)
          setImgURL(url)
        })
      }

      task.on("state_changed", onProgress, onError, OnComplete)
    }
  }, [task])

  return (
    <>
      <Head>
        <title>Crear un Devit / Devter 🐦</title>
      </Head>
      <section className="form-container">
        <section className="avatar-container">
          {user && <Avatar src={user.avatar} alt={user.username} />}
        </section>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Qué está pasando?"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <Image
                src={imgURL}
                alt="image"
                width={0}
                height={0}
                sizes="(max-width: 600px) 100vw, 600px"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>

      <style jsx>
        {`
          form {
            padding: 10px;
          }

          .form-container {
            display: flex;
            align-items: flex-start;
          }

          .avatar-container {
            padding-top: 20px;
            padding-left: 10px;
          }

          .remove-img {
            position: relative;
          }

          button {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 999px;
            border: 0;
            color: ${colors.white};
            cursor: pointer;
            font-size: 24px;
            height: 32px;
            position: absolute;
            right: 15px;
            top: 15px;
            width: 32px;
          }

          img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            //position: relative;
          }

          textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"};
            border-radius: 10px;
            font-size: 21px;
            min-height: 200px;
            outline: 0;
            padding: 15px;
            resize: none;
            width: 100%;
          }

          div {
            padding: 15px;
          }
        `}
      </style>
    </>
  )
}
