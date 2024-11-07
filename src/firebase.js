// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVXz93zSkYI8mbFPwKlw2jV7jp3s6FJgY",
    authDomain: "product-56765.firebaseapp.com",
    projectId: "product-56765",
    storageBucket: "product-56765.appspot.com",
    messagingSenderId: "453209527052",
    appId: "1:453209527052:web:56b590863642a2687baf29",
    measurementId: "G-TPNC7QGR91"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// Initialize Firestore
