// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Added this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHuCnBWSbEN9NQILma4IS6YWeCRHfAbRA",
  authDomain: "orion-ai-e6dcf.firebaseapp.com",
  projectId: "orion-ai-e6dcf",
  storageBucket: "orion-ai-e6dcf.firebasestorage.app",
  messagingSenderId: "375874957618",
  appId: "1:375874957618:web:bd4b45e1d8a6b9bbd1a72b",
  measurementId: "G-Z69FHHRNY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app); // Now this will correctly initialize Firestore