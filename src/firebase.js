import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq-9ZZc-CpU4C9txvBZnQ97fpC0O9BfZc",
  authDomain: "namma-print-house.firebaseapp.com",
  projectId: "namma-print-house",
  storageBucket: "namma-print-house.firebasestorage.app",
  messagingSenderId: "183811755095",
  appId: "1:183811755095:web:4331120aeb04e02621a712",
  measurementId: "G-QQBF8G1223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with NO offline persistence (memory only)
// This prevents IndexedDB from being created on first load, which
// was causing Lighthouse mobile performance issues and slow first paint.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: false,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
