// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmzFelduBxKZ68fTr7BzohXRIUqdNp8VE",
  authDomain: "project-wedding-suparta.firebaseapp.com",
  projectId: "project-wedding-suparta",
  storageBucket: "project-wedding-suparta.appspot.com",
  messagingSenderId: "687119645306",
  appId: "1:687119645306:web:104522b8b013dd08bb99c3",
  measurementId: "G-F42ZH54EYG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
