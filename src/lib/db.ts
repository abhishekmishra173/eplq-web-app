import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 1. Configuration: Pulls from your .env.local file
// If these are missing, the app will crash immediately (as it should).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 2. Singleton Pattern: Prevents creating multiple connections in Next.js hot-reloading
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 3. Exports: We export the direct instances. 
// We do NOT export a helper function like 'queryLocations' because
// the encryption/decryption logic (EPLQ) needs to happen in the Service Layer, not here.
export const db = getFirestore(app);
export const auth = getAuth(app);