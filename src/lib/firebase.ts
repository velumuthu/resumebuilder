// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "resumai-z3ftb",
  appId: "1:321201702568:web:97464d3e631d70f06aa49d",
  storageBucket: "resumai-z3ftb.firebasestorage.app",
  apiKey: "AIzaSyAl7QQdlr_zDAfyWm3GCMYBI8mcNpiq0Ws",
  authDomain: "resumai-z3ftb.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "321201702568",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
