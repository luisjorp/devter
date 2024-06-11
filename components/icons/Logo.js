import Image from "next/image"

export default function Logo() {
  return (
    <Image
      src="/luisjo-dev.svg"
      alt="Logo"
      title=""
      width={120}
      height={50}
      fetchpriority="high"
    />
  )
}
