import firebase from "firebase/app";
import "firebase/firestore";
import fbConfig from "./firebaseConfig";

const firebaseAPP = firebase.initializeApp(fbConfig);
export default firebaseAPP.firestore();

// const firebaseConfig = {
//   apiKey: "AIzaSyAgHWW1FuylAigl_Sj7K1pfiFy7gRm2rTE",
//   authDomain: "vuejs-todos-dc.firebaseapp.com",
//   databaseURL: "https://vuejs-todos-dc.firebaseio.com",
//   projectId: "vuejs-todos-dc",
//   storageBucket: "vuejs-todos-dc.appspot.com",
//   messagingSenderId: "57552574197",
//   appId: "1:57552574197:web:14df393d386d6f23fb17bc",
//   measurementId: "G-KJW16GB8R8"
// };
