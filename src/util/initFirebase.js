// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ptugG-7U8EcTXQk-5nCje3OvAvrXHMw",
  authDomain: "airquality-6d70f.firebaseapp.com",
  databaseURL: "https://airquality-6d70f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "airquality-6d70f",
  storageBucket: "airquality-6d70f.appspot.com",
  messagingSenderId: "7154904290",
  appId: "1:7154904290:web:ad50df5bd8f77b05b482bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log("Firebase initialized");