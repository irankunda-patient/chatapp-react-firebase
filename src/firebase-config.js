// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAjXGpc1jzr4x94RAhZcyKWT58CQRvsvoU",
//   authDomain: "kuchat-5374d.firebaseapp.com",
//   projectId: "kuchat-5374d",
//   storageBucket: "kuchat-5374d.appspot.com",
//   messagingSenderId: "502285107902",
//   appId: "1:502285107902:web:e667cbcf8976126ae514ef"
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXGpc1jzr4x94RAhZcyKWT58CQRvsvoU",
  authDomain: "kuchat-5374d.firebaseapp.com",
  databaseURL: "https://kuchat-5374d-default-rtdb.firebaseio.com",
  projectId: "kuchat-5374d",
  storageBucket: "kuchat-5374d.appspot.com",
  messagingSenderId: "502285107902",
  appId: "1:502285107902:web:e667cbcf8976126ae514ef"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const firestore = getFirestore(app)
export const realtimeDb = getDatabase(app)