import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq-9ZZc-CpU4C9txvBZnQ97fpC0O9BfZc",
  authDomain: "namma-print-house.firebaseapp.com",
  projectId: "namma-print-house",
  storageBucket: "namma-print-house.firebasestorage.app",
  messagingSenderId: "183811755095",
  appId: "1:183811755095:web:4331120aeb04e02621a712"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addAdmin() {
  const uid = "23yQIx6LDyFTdKAwz7zwOLH6Coz2";
  console.log(`Adding ${uid} to admins collection...`);
  
  try {
    await setDoc(doc(db, 'admins', uid), {
      role: 'owner',
      addedAt: new Date().toISOString()
    });
    console.log("Success! You are now an admin.");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
}

addAdmin();
