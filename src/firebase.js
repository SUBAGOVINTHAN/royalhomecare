import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Values come from your .env file (see .env.example). Vite only exposes variables that start with VITE_.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

if (!isFirebaseConfigured) {
  console.warn('[Reviews] Firebase is not configured. Add your VITE_FIREBASE_* values to .env')
}

// null when not configured, so the rest of the site keeps working
export const db = isFirebaseConfigured ? getFirestore(initializeApp(firebaseConfig)) : null