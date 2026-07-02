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

async function addAdmins() {
  const uids = [
    "23yQlX6LDyFTdKAwz7zwOLH6Coz2", // With lowercase L
    "23yQIx6LDyFTdKAwz7zwOLH6Coz2", // With uppercase I
    "23yQ1x6LDyFTdKAwz7zwOLH6Coz2"  // With number 1
  ];
  
  for (const uid of uids) {
    console.log(`Adding ${uid} to admins collection...`);
    try {
      await setDoc(doc(db, 'admins', uid), {
        role: 'owner',
        addedAt: new Date().toISOString()
      });
      console.log(`Success for ${uid}`);
    } catch (error) {
      console.error(`Failed for ${uid}:`, error.message);
    }
  }
  process.exit(0);
}

addAdmins();
