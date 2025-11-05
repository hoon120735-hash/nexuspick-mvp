// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ 이미지 저장용 추가!

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBc1ieXZEOPpNiCEA1NPopQmR0h08UInw8",
  authDomain: "nexuspick-88b83.firebaseapp.com",
  projectId: "nexuspick-88b83",
  storageBucket: "nexuspick-88b83.appspot.com",
  messagingSenderId: "106940818503",
  appId: "1:106940818503:web:890ee697bddf1c0fbf31a2",
  measurementId: "G-YWJETLEW7V"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore (데이터베이스)
export const db = getFirestore(app);

// Storage (이미지 저장용) ✅ 추가!
export const storage = getStorage(app);
