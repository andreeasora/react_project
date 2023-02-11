// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.REACT_APP_APP_ID_FIREBASE
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();