import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Firebase configuration
// Replace these values with your Firebase project config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfuX4srO7CWafGs5IkOJcjTS4MgX0eUiE",
    authDomain: "learnloop-388db.firebaseapp.com",
    projectId: "learnloop-388db",
    storageBucket: "learnloop-388db.firebasestorage.app",
    messagingSenderId: "252744377644",
    appId: "1:252744377644:web:fb1a459434d5daec25f889",
    measurementId: "G-9BML25X5Q5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app

