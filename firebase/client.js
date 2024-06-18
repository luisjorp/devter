import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import getBase64 from "@/plaiceholder/client"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd_YQkyWqcBXih6fM6eQvbZqGLi6QTw_w",
  authDomain: "devter-luisjo.firebaseapp.com",
  projectId: "devter-luisjo",
  storageBucket: "devter-luisjo.appspot.com",
  messagingSenderId: "283260943802",
  appId: "1:283260943802:web:771233a800b6b259887183",
  measurementId: "G-0RCMVYZVZX",
}

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

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)

  return task
}
