
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4bjNlCPVEGEKLnZhQnJMPsPsgAnEmpSc",
  authDomain: "letter-drive-c9f76.firebaseapp.com",
  projectId: "letter-drive-c9f76",
  storageBucket: "letter-drive-c9f76.firebasestorage.app",
  messagingSenderId: "1089879297762",
  appId: "1:1089879297762:web:b83a2c2b957465864318bb",
  measurementId: "G-7WCXM2YV62"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: "select_account",
  // Add access to Google Drive API
  scope: "https://www.googleapis.com/auth/drive.file"
});

export { auth, googleProvider };
