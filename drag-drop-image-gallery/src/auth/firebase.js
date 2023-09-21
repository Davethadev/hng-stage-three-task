// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_DRAG_DROP_IMAGE_GALLERY_API_KEY,
  authDomain: "drag-drop-image-gallery-3a0f3.firebaseapp.com",
  projectId: "drag-drop-image-gallery-3a0f3",
  storageBucket: "drag-drop-image-gallery-3a0f3.appspot.com",
  messagingSenderId: "1054295835453",
  appId: "1:1054295835453:web:57fc621ddfa87d537fbb54",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
