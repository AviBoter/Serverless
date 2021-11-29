import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
window._config = {

  apiKey: "AIzaSyCwk3LpzmfZptO78BKWS4YIPW_YTHR31NI",
  authDomain: "authwithfirebase-1.firebaseapp.com",
  projectId: "authwithfirebase-1",
  storageBucket: "authwithfirebase-1.appspot.com",
  messagingSenderId: "477033394428",
  appId: "1:477033394428:web:4b3cf282fddb3b305e2779",
  measurementId: "G-9LSS9XLLDL"
};

// Initialize Firebase
const app = firebase.initializeApp(window._config);
const auth = firebase.getAuth();
onAuthStateChanged(auth, user => { console.log(user); });