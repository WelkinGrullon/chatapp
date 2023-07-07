
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD4E8gb3zCDZhHTTshYXhg_i9JXalnDdD0",
  authDomain: "chatapp-92f39.firebaseapp.com",
  projectId: "chatapp-92f39",
  storageBucket: "chatapp-92f39.appspot.com",
  messagingSenderId: "287151120817",
  appId: "1:287151120817:web:c41baecfb220a74e121d90"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()