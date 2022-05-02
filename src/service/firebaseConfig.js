// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1JA0cu6yrzwxBnRDqW3jAj4AMylXJhQ0",
  authDomain: "reactstagram-13fac.firebaseapp.com",
  databaseURL: "https://reactstagram-13fac-default-rtdb.firebaseio.com/",
  projectId: "reactstagram-13fac",
  storageBucket: "reactstagram-13fac.appspot.com",
  messagingSenderId: "637417332800",
  appId: "1:637417332800:web:fd7ddf53a9e51e4715ffa5",
  measurementId: "G-TESC0VX2P7",
};

// Initialize Firebase
const fbase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const firebase_db = firebase.database();
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const firebaseStorage = firebase.storage();
