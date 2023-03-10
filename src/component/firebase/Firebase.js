// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuxI3NV-6Rpzp1vD33H29mIOEua1Wq2_0",
  authDomain: "logins-fa0d7.firebaseapp.com",
  projectId: "logins-fa0d7",
  storageBucket: "logins-fa0d7.appspot.com",
  messagingSenderId: "739813219699",
  appId: "1:739813219699:web:2c78b4be2e9127c7a3b906",
  measurementId: "G-B1280BX9RM",
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
