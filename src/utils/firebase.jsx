import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyCSU_VY6Buyr2cnZG5A6OQgHVvS-HnmF3s",
    authDomain: "mernai-947b0.firebaseapp.com",
    projectId: "mernai-947b0",
    storageBucket: "mernai-947b0.firebasestorage.app",
    messagingSenderId: "1029131145732",
    appId: "1:1029131145732:web:c7342859e7c4bcf83adb51",
    measurementId: "G-Y91L5GYYFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  security guard for firebase
// Ye gate hai jahan se sab log enter hote hain.
// auth ke bina Firebase ko pata hi nahi chalega ki login kahan karwana hai.
const auth = getAuth(app);
// google authentication provider
// Ye batata hai ki user Google account se login karega.
const provider = new GoogleAuthProvider();

export { auth, provider };
