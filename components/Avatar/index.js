import Image from "next/image"

import styles from "@components/Avatar/styles.module.css"

export default function Avatar({ src, alt, text, withText }) {
  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt={alt}
        className={styles.avatar}
        height={49}
        width={49}
      />
      {withText && <strong>{text || alt}</strong>}
    </div>
  )
}
