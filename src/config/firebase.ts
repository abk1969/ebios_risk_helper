// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCN4GaNMnshiDw0Z0dgGnhmgbokVyd7LmA",
    authDomain: "ebiosdatabase.firebaseapp.com",
    projectId: "ebiosdatabase",
    storageBucket: "ebiosdatabase.firebasestorage.app",
    messagingSenderId: "1065555617003",
    appId: "1:1065555617003:web:40e19393cc998406a74aae",
    measurementId: "G-HK67G5T9K2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };