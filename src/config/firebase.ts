// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration

const apiKey = process.env.API_KEY
const authDomain = process.env.AUTHDOMAIN
// const projectId = process.env.PROJECTID
// console.log(projectId)
const storageBucket = process.env.STORAGEBUCKET
const messagingSenderId = process.env.MESSAGINGSENDERID
const appId = process.env.APPID

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId: 'hackathon-midudev',
  storageBucket,
  messagingSenderId,
  appId

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


export { db }

export default app
