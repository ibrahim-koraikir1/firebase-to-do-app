
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-AklCLKKoTpwVfjCpT20FOYmK0W6Vyxk",
  authDomain: "to-do-app-e1363.firebaseapp.com",
  projectId: "to-do-app-e1363",
  storageBucket: "to-do-app-e1363.appspot.com",
  messagingSenderId: "596896387012",
  appId: "1:596896387012:web:3eecc537816381d761de91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =  getFirestore(app);