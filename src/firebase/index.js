// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwsx-afwPwykSQXS-XT5-DwKk3TvPh4NQ",
  authDomain: "taskmanager-f118c.firebaseapp.com",
  projectId: "taskmanager-f118c",
  storageBucket: "taskmanager-f118c.appspot.com",
  messagingSenderId: "374983210092",
  appId: "1:374983210092:web:fe83d206c2f7dd07a7d449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore and geg reference to the service
export const db = getFirestore(app)