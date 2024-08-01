// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8yNe2Xn3bJYWhyr6JAGgnC4qhv7yoctE",
  authDomain: "pantryapp-92efc.firebaseapp.com",
  projectId: "pantryapp-92efc",
  storageBucket: "pantryapp-92efc.appspot.com",
  messagingSenderId: "109155761072",
  appId: "1:109155761072:web:b293b5410e19794f76f475",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore}