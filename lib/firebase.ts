import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCDsgfBfx301SoUxtykMRA1fqNLP44qp48",
  authDomain: "ohome-9be4d.firebaseapp.com",
  databaseURL: "ohome-9be4d.firebaseapp.com",
  projectId: "ohome-9be4d",
  storageBucket: "ohome-9be4d.firebasestorage.app",
  messagingSenderId:"574380709966",
  appId: "1:574380709966:web:36f683c3ccf9c42f7ecb1f",
};

const app = initializeApp(firebaseConfig);

// 기존 Realtime Database
export const database = getDatabase(app);


// Google 로그인에 사용하는 인증 설정
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);



