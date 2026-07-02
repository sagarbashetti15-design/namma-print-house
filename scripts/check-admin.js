import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

async function checkAdmin() {
  const uid = "23yQIx6LDyFTdKAwz7zwOLH6Coz2";
  console.log(`Checking if ${uid} is in admins collection...`);
  
  try {
    const d = await getDoc(doc(db, 'admins', uid));
    if (d.exists()) {
      console.log("Document exists!", d.data());
    } else {
      console.log("Document does NOT exist.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
}

checkAdmin();
