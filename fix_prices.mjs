
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq-9ZZc-CpU4C9txvBZnQ97fpC0O9BfZc",
  authDomain: "namma-print-house.firebaseapp.com",
  projectId: "namma-print-house",
  storageBucket: "namma-print-house.firebasestorage.app",
  messagingSenderId: "183811755095",
  appId: "1:183811755095:web:4331120aeb04e02621a712",
  measurementId: "G-QQBF8G1223"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixPrices() {
  try {
    const querySnapshot = await getDocs(collection(db, "catalog"));
    for (const document of querySnapshot.docs) {
      await updateDoc(doc(db, "catalog", document.id), { price: 20 });
    }
    console.log("SUCCESS");
    process.exit(0);
  } catch (err) {
    console.error("ERROR", err);
    process.exit(1);
  }
}
fixPrices();
