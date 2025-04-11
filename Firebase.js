// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNh_C1qJ2Xsn26DUHQjD7iRhN2GI7EhgM",
    authDomain: "tyschoolrollcallsystem.firebaseapp.com",
    databaseURL: "https://tyschoolrollcallsystem-default-rtdb.firebaseio.com",
    projectId: "tyschoolrollcallsystem",
    storageBucket: "tyschoolrollcallsystem.firebasestorage.app",
    messagingSenderId: "671512147664",
    appId: "1:671512147664:web:49cdabe49fa4e960b4d0d5",
    measurementId: "G-W484LMH96G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);