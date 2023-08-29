// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxrS8mvZzKi-2SjIEsrcm6vTSM04N5C8Q",
  authDomain: "dooalpha-b6b10.firebaseapp.com",
  projectId: "dooalpha-b6b10",
  storageBucket: "dooalpha-b6b10.appspot.com",
  messagingSenderId: "344156837296",
  appId: "1:344156837296:web:41e90dcded4f24d5e0f275",
  measurementId: "G-QHGXVMG6MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {storage};