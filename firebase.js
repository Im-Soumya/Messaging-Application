// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMrOTDEbn_BGFq2FFAZ8-UWqqaKv--MB8",
  authDomain: "chat-app-30239.firebaseapp.com",
  projectId: "chat-app-30239",
  storageBucket: "chat-app-30239.appspot.com",
  messagingSenderId: "663912275410",
  appId: "1:663912275410:web:295a5f16ea91a59f343c0b",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAMrOTDEbn_BGFq2FFAZ8-UWqqaKv--MB8",
//   authDomain: "chat-app-30239.firebaseapp.com",
//   projectId: "chat-app-30239",
//   storageBucket: "chat-app-30239.appspot.com",
//   messagingSenderId: "663912275410",
//   appId: "1:663912275410:web:295a5f16ea91a59f343c0b",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
