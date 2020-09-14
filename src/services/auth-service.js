import firebase from "firebase";

export const login = async () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(this.username, this.password)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
