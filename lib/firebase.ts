import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || '',
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: metaEnv.VITE_FIREBASE_APP_ID || '',
};

// Check if Firebase is fully configured on the client
export const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let app;
let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('Firebase Web SDK initialization failed:', error);
    app = null as any;
    auth = null as any;
    db = null as any;
    storage = null as any;
  }
} else {
  // Safe mock placeholders for import resolution when Firebase isn't configured
  app = null as any;
  auth = null as any;
  db = null as any;
  storage = null as any;
}

export { app, auth, db, storage };
