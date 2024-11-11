import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQJIpykjceIx3KK_yfojXDsYeM2-keXdA",
  authDomain: "ommitus.firebaseapp.com",
  projectId: "ommitus",
  storageBucket: "ommitus.appspot.com",
  messagingSenderId: "530215286990",
  appId: "1:530215286990:web:14e5b1cf43d7b678a8b89f"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);