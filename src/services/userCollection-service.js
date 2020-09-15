import db from "../firebase";
import firebase from "firebase";

export const addNewUser = async (obj) => {
  let req = delete obj.password;
  return await db.collection("users").add(req);
};

export const deleteCurrentUser = async () => {
  await firebase.auth().currentUser.delete();
};

export const checkLoggedIn = async () => {
  return !!firebase.auth().currentUser;
};
