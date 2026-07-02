import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
import { products } from "./src/data/catalog.js"; // This will be imported

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

async function seed() {
  console.log("Seeding Database...");
  const batch = writeBatch(db);
  
  // Seed Catalog
  for (const product of products) {
    const productRef = doc(db, 'catalog', product.id);
    batch.set(productRef, product);
  }
  
  // Seed Marketing State
  const marketingRef = doc(db, 'marketing', 'config');
  batch.set(marketingRef, {
    activeCampaign: 'none',
    activePromo: 'none',
    activeDiscount: 'none'
  });
  
  await batch.commit();
  console.log("Database Seeded Successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding Error:", err);
  process.exit(1);
});
