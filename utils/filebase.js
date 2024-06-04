// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-B1WeIz2t8vykxHqa4X6RWqVmWo85mc4",
  authDomain: "blog-326b3.firebaseapp.com",
  projectId: "blog-326b3",
  storageBucket: "blog-326b3.appspot.com",
  messagingSenderId: "728036694836",
  appId: "1:728036694836:web:e6c8e2e87217ca77c5e361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
  storage,
}