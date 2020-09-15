import firebase from "firebase";

export const login = async (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
