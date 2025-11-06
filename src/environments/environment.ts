// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// (para Firebase JS SDK v7.20.0 e posterior, measurementId é opcional)
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBpd3Z3J7SefPXOGzhOnKDFQGXQGfKn9EE",
    authDomain: "formadora-3-db40e.firebaseapp.com",
    projectId: "formadora-3-db40e",
    storageBucket: "formadora-3-db40e.firebasestorage.app",
    messagingSenderId: "252732364961",
    appId: "1:252732364961:web:876d441e729f12ac6e38e0",
    measurementId: "G-0QZEEW1Y87"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
