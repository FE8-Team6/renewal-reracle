import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN3DWCVIUc05MLqFeY_FI5Y2x8UpmxJUI",
  authDomain: "web-game-5b1b6.firebaseapp.com",
  projectId: "web-game-5b1b6",
  storageBucket: "web-game-5b1b6.appspot.com",
  messagingSenderId: "512220286729",
  appId: "1:512220286729:web:32be683c83ad211b0d8dd8",
  measurementId: "G-080QL0GFHM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
