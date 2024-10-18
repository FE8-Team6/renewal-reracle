import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCDV_aekyWg0rB8Aw-Mp64f9ZvGBf85SYY',
  authDomain: 'reracle-4edc5.firebaseapp.com',
  projectId: 'reracle-4edc5',
  storageBucket: 'reracle-4edc5.appspot.com',
  messagingSenderId: '583801148706',
  appId: '1:583801148706:web:557e6d0e0e4836db2a417b',
  measurementId: 'G-3J11YLBKRP',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
