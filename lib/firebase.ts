import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:"AIzaSyCDsgfBfx301SoUxtykMRA1fqNLP44qp48",
  authDomain: "ohome-9be4d.firebaseapp.com",
  databaseURL: "ohome-9be4d.firebaseapp.com",
  projectId: "ohome-9be4d.firebasestorage.app",
  storageBucket: "ohome-9be4d.firebasestorage.app",
  messagingSenderId: "574380709966",
  appId: "1:574380709966:web:36f683c3ccf9c42f7ecb1f",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
