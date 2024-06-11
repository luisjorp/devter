// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send(
    JSON.stringify([
      {
        id: "1",
        username: "luisjo",
        name: "Luis Jo",
        message: "Hello, world!",
        avatar:
          "https://avatars.githubusercontent.com/u/67595890?s=400&u=fb2c3c0e4d6846e73bfdbbde76c52ed06f14c9ef&v=4",
      },
      {
        id: "2",
        username: "luisjo",
        name: "Luis Jo",
        message: "Another tweet!",
        avatar:
          "https://avatars.githubusercontent.com/u/67595890?s=400&u=fb2c3c0e4d6846e73bfdbbde76c52ed06f14c9ef&v=4",
      },
      {
        id: "3",
        username: "luisjo",
        name: "Luis Jo",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar:
          "https://avatars.githubusercontent.com/u/67595890?s=400&u=fb2c3c0e4d6846e73bfdbbde76c52ed06f14c9ef&v=4",
      },
      {
        id: "4",
        username: "luisjo",
        name: "Luis Jo",
        message:
          "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        avatar:
          "https://avatars.githubusercontent.com/u/67595890?s=400&u=fb2c3c0e4d6846e73bfdbbde76c52ed06f14c9ef&v=4",
      },
      {
        id: "5",
        username: "luisjo",
        name: "Luis Jo",
        message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        avatar:
          "https://avatars.githubusercontent.com/u/67595890?s=400&u=fb2c3c0e4d6846e73bfdbbde76c52ed06f14c9ef&v=4",
      },
    ]),
  )
}
