import db from "../firebase";
import firebase from "firebase";

const todo = {
  getAll: async () => {
    let list = [];
    await db
      .collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docu) => {
          db.collection("users")
            .doc(docu.id)
            .collection("todos")
            .get()
            .then((item) => {
              item.forEach((i) => {
                const data = {
                  id: i.id,
                  todoData: i.data(),
                };
                list.push(data);
              });
            });
        });
      });
    return list;
  },
  add: (obj) => {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then((user) => {
        console.log(user);
        user.forEach((element) => {
          db.collection("users")
            .doc(element.id)
            .collection("todos")
            .add(obj)
            .then(() => {
              // this.$store.dispatch("addToList", obj);
              return true;
            })
            .catch(() => {
              return false;
            });
        });
      })
      .catch(() => {
        return false;
      });
  },
};

export default todo;
