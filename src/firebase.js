// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVgwRf_9RDmNnj8zfRetKSoJPtTUFI-dE",
    authDomain: "fortniteprogressdata.firebaseapp.com",
    projectId: "fortniteprogressdata",
    storageBucket: "fortniteprogressdata.firebasestorage.app",
    messagingSenderId: "598366329794",
    appId: "1:598366329794:web:aa843d8a39967a3a1a545b",
    measurementId: "G-6M8B4HZ75Z"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
