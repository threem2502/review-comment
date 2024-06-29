// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRzYthE9jELJw0BjDt8g-6EVzX8ooL29I",
  authDomain: "datn-c8806.firebaseapp.com",
  projectId: "datn-c8806",
  storageBucket: "datn-c8806.appspot.com",
  messagingSenderId: "691372667410",
  appId: "1:691372667410:web:ee6f62bb26464c8bdedecb",
  measurementId: "G-MCMGF10S42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export { app, analytics, auth };
