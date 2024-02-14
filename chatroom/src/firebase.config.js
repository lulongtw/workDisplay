// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getDatabase,ref} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVpSxaQx3bNc4nHi7sUWpReE1CDwBLUNc",
  authDomain: "testchat-5a344.firebaseapp.com",
  projectId: "testchat-5a344",
  storageBucket: "testchat-5a344.appspot.com",
  messagingSenderId: "515399875291",
  appId: "1:515399875291:web:8cf7d2307f47fff619aafe",
  measurementId: "G-PPR8X1EVJH",
  databaseURL:"https://testchat-5a344-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const msgRef = ref(database,"msg")
const countRef = ref(database,"count")

export {msgRef,countRef,database}

