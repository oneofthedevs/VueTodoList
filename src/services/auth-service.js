import firebase from "firebase";

export const login = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const register = async (obj) => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(obj.username, obj.password);
};

export const signOut = async () => {
  await firebase.auth().signOut();
};
