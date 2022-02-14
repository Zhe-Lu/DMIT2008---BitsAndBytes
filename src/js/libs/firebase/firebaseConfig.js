// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw4eL3bz-HMkc6HEbIpymfZZ3sqJxPtLw",
    authDomain: "bitsandbytesonlinestore.firebaseapp.com",
    databaseURL: "https://bitsandbytesonlinestore-default-rtdb.firebaseio.com",
    projectId: "bitsandbytesonlinestore",
    storageBucket: "bitsandbytesonlinestore.appspot.com",
    messagingSenderId: "32842983952",
    appId: "1:32842983952:web:5ab4a11ca9b7058b603895"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const storage = getStorage(app)

export {db, storage, app}
