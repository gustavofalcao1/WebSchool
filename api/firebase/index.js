// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoT3c-RrEOt_7vxIOx07HAIiCtoBhV-oo",
  authDomain: "school-9dbb4.firebaseapp.com",
  projectId: "school-9dbb4",
  storageBucket: "school-9dbb4.appspot.com",
  messagingSenderId: "1021627004984",
  appId: "1:1021627004984:web:42d818139f30e1a17c0ecd",
  measurementId: "G-TBWV5T584T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);