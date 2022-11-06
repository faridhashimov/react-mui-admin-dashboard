// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCe9ubv0aIm5yTrNdDlTMN7m8LXtTJ3da4',
    authDomain: 'react-ecommerce-admin.firebaseapp.com',
    projectId: 'react-ecommerce-admin',
    storageBucket: 'react-ecommerce-admin.appspot.com',
    messagingSenderId: '362715646395',
    appId: '1:362715646395:web:cf22dae0a5d15ff8b1dc9e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
