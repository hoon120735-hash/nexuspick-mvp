import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc1ieXZEOPpNiCEA1NPopQmR0h08UInw8",
  authDomain: "nexuspick-88b83.firebaseapp.com",
  projectId: "nexuspick-88b83",
  storageBucket: "nexuspick-88b83.appspot.com",
  messagingSenderId: "106940810503",
  appId: "1:106940810503:web:890ee697bddf1c0fbf31a2",
  measurementId: "G-YWJETLEW7V",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
