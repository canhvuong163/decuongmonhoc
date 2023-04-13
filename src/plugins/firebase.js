import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "firebase/compat/firestore";
import "firebase/compat/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6fZTzj8y-38M0UqGfWO3s_cRB8M9jib4",
  authDomain: "de-cuong-mon-hoc.firebaseapp.com",
  projectId: "de-cuong-mon-hoc",
  storageBucket: "de-cuong-mon-hoc.appspot.com",
  messagingSenderId: "1055033819159",
  appId: "1:1055033819159:web:8b365bcfdbae1741b1dc52",
  measurementId: "G-7KCBQFN9GF"
};

firebase.initializeApp(firebaseConfig)

export default firebase