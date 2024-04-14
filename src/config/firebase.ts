// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSir49kBMCYLOMEsFEbFgkCg-_qmnk2ZU",
  authDomain: "movie-mania-e9031.firebaseapp.com",
  projectId: "movie-mania-e9031",
  storageBucket: "movie-mania-e9031.appspot.com",
  messagingSenderId: "885786915785",
  appId: "1:885786915785:web:27bffb658ec535b38b6e18",
  measurementId: "G-N7FHCRWXT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);