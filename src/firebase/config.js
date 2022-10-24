import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCM-WR1uAUFYINlI7oSwJu11X7-syx6k2U",
    authDomain: "thefriendslist.firebaseapp.com",
    projectId: "thefriendslist",
    storageBucket: "thefriendslist.appspot.com",
    messagingSenderId: "23673726720",
    appId: "1:23673726720:web:c2e1e74680807ead8f35e5"
  };

// initialize firestore
firebase.initializeApp(firebaseConfig)

// initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }