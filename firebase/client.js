import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd_YQkyWqcBXih6fM6eQvbZqGLi6QTw_w",
  authDomain: "devter-luisjo.firebaseapp.com",
  projectId: "devter-luisjo",
  storageBucket: "devter-luisjo.appspot.com",
  messagingSenderId: "283260943802",
  appId: "1:283260943802:web:771233a800b6b259887183",
  measurementId: "G-0RCMVYZVZX"
}

// Check that firebase has not already been initialized
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUserObject = (user) => {
  const {displayName, email, photoURL} = user

  return {
    username: displayName,
    avatar: photoURL,
    email
  }
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
    .then(user => {
      return mapUserFromFirebaseAuthToUserObject(user.user)
    })
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged(user => {
      const normalizedUser = user ? mapUserFromFirebaseAuthToUserObject(user) : null
      onChange(normalizedUser)
    }
  )
}