import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHq7vfMQBRHttJDgLXK0OBp65g15yiGOs",
  authDomain: "pantry-project-d3562.firebaseapp.com",
  projectId: "pantry-project-d3562",
  storageBucket: "pantry-project-d3562.appspot.com",
  messagingSenderId: "894150631096",
  appId: "1:894150631096:web:7ef00bf46887fc94e1de4d",
  measurementId: "G-8TX30V8LS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore};
