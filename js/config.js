import { getAuth, onAuthStateChanged } from "firebase/auth";
// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwk3LpzmfZptO78BKWS4YIPW_YTHR31NI",
  authDomain: "authwithfirebase-1.firebaseapp.com",
  projectId: "authwithfirebase-1",
  storageBucket: "authwithfirebase-1.appspot.com",
  messagingSenderId: "477033394428",
  appId: "1:477033394428:web:4b3cf282fddb3b305e2779",
  measurementId: "G-9LSS9XLLDL"
};


// Initialize Firebase
export var app = initializeApp(firebaseConfig);
export var auth = getAuth();


  