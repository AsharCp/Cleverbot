import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcK5_kUqtWtCeNmc9mfsEaQA2Geg3exKQ",
  authDomain: "cleverbotgecw.firebaseapp.com",
  projectId: "cleverbotgecw",
  storageBucket: "cleverbotgecw.appspot.com",
  messagingSenderId: "957695892740",
  appId: "1:957695892740:web:2c31744656061841d68451",
  measurementId: "G-DRX7VM3588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);