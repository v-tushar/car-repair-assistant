// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-real-apikey",
  authDomain: "your-real-authdomain",
  projectId: "your-real-projectid",
  storageBucket: "your-real-storagebucket",
  messagingSenderId: "your-real-messagingsenderid",
  appId: "your-real-appid"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
