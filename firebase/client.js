import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import getBase64 from "@/plaiceholder/client"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

// Check that firebase has not already been initialized
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUserObject = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    username: displayName,
    avatar: photoURL,
    email,
    uid,
  }
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((user) => {
      return mapUserFromFirebaseAuthToUserObject(user.user)
    })
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user
      ? mapUserFromFirebaseAuthToUserObject(user)
      : null
    onChange(normalizedUser)
  })
}

export const addDevit = async ({ avatar, content, img, userId, userName }) => {
  const devitData = {
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  }

  if (img) {
    try {
      const imgBase64 = await getBase64(img)
      devitData.img = img
      devitData.imgBase64 = imgBase64
    } catch (error) {
      console.error("Error converting image to base64:", error)
      throw new Error("Image processing failed")
    }
  }

  return db.collection("devits").add(devitData)
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (onChange) => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map((doc) => {
        return mapDevitFromFirebaseToDevitObject(doc)
      })
      onChange(newDevits)
    })
}

/*export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        return mapDevitFromFirebaseToDevitObject(doc)
      })
    })
}*/

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)

  return task
}
