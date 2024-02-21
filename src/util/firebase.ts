import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC0zPno6V8_AQOkvK2qbCFAyyRuLcPoKVU",
  authDomain: "electmynou.firebaseapp.com",
  projectId: "electmynou",
  storageBucket: "electmynou.appspot.com",
  messagingSenderId: "599641262980",
  appId: "1:599641262980:web:b08af93e298d19ff022bd1",
  measurementId: "G-RWQG6H7GHZ"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }