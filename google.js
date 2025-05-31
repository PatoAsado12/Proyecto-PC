import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut  } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZPfGmTOgtmULrebeqeE8DpEztV9R9LRw  s",
  authDomain: "protecto-pc.firebaseapp.com",
  projectId: "protecto-pc",
  storageBucket: "protecto-pc.firebasestorage.app",
  messagingSenderId: "189719485021",
  appId: "1:189719485021:web:f0ead10f5ffea99a254bb4",
  measurementId: "G-7GHDBL7KMP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { signInWithPopup, auth, provider, signOut };