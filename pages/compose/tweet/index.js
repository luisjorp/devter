import AppLayout from "@components/AppLayout"
import Button from "@components/Button"
import useUser from "@/hooks/useUser"
import { useState } from "react"
import { addDevit } from "@/firebase/client"
import { useRouter } from "next/router"

const FORM_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}
export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(FORM_STATES.USER_NOT_KNOWN)

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

  const isButtonDisabled =
    message.length === 0 || status === FORM_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Qué está pasando?"
            onChange={handleChange}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>

      <style jsx>
        {`
          textarea {
            border: 0;
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
