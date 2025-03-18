// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB7IcBaMLX6s_rMLmiPs1uVlSlv-ui8pQU",
    authDomain: "musicplayer-23d44.firebaseapp.com",
    projectId: "musicplayer-23d44",
    storageBucket: "musicplayer-23d44.firebasestorage.app",
    messagingSenderId: "30489025112",
    appId: "1:30489025112:web:e5522a60f2f5c2eeb6082d",
    measurementId: "G-9FPL1XT31R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }
