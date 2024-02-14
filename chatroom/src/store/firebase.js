// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRZ5G6aqp2HtJcVuc83tAV0-vCgYMD6ZI",
  authDomain: "mygod-86854.firebaseapp.com",
  databaseURL: "https://mygod-86854-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mygod-86854",
  storageBucket: "mygod-86854.appspot.com",
  messagingSenderId: "761936058687",
  appId: "1:761936058687:web:b2b803d210c26434ce9b8a",
  measurementId: "G-7ZCG07HTGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

export default database




