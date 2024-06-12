import AppLayout from "@components/AppLayout"
import Button from "@components/Button"
import useUser from "@/hooks/useUser"
import { useState } from "react"
import { addDevit } from "@/firebase/client"
export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)

    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Qué está pasando?"
            onChange={handleChange}
          ></textarea>
          <div>
            <Button disabled={message.length === 0}>Devitear</Button>
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
