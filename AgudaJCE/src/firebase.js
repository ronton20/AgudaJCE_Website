import { initializeApp } from "firebase/app";
import React, {useState, useEffect} from "react";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwM-r3r4pdgn5FKbiKY6CmrKOAOg1-zG0",
  authDomain: "agudajce-51667.firebaseapp.com",
  projectId: "agudajce-51667",
  storageBucket: "agudajce-51667.appspot.com",
  messagingSenderId: "371577645071",
  appId: "1:371577645071:web:9260b6eadf1d396b419b7a"
};

export const app = initializeApp(firebaseConfig);
// Get the Auth instance
export const auth = getAuth(app);
// Get the Firestore instance
export const db = getFirestore(app);