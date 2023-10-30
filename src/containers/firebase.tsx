import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC1gV8OhcKhgh_zFGc_VX5L_nriVX9WX84",
  authDomain: "wasfa2023-76eeb.firebaseapp.com",
  projectId: "wasfa2023-76eeb",
  storageBucket: "wasfa2023-76eeb.appspot.com",
  messagingSenderId: "376160993158",
  appId: "1:376160993158:web:d1e07b6041d0acb92d7607"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
