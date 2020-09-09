import firebase from "firebase/app";
import "firebase/firestore";
import fbConfig from "./firebaseConfig";

const firebaseAPP = firebase.initializeApp(fbConfig);

// var pref = firebase.performance();
export default firebaseAPP.firestore();
