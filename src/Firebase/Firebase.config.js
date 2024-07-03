// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkHuadv790ODLoQeBnH4qQzZAt2KqTCZs",
  authDomain: "user-email-pass-auth-m-50.firebaseapp.com",
  projectId: "user-email-pass-auth-m-50",
  storageBucket: "user-email-pass-auth-m-50.appspot.com",
  messagingSenderId: "21226087763",
  appId: "1:21226087763:web:e7b7b3e5b0545acf3f2da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app
const auth = getAuth(app);
export default auth