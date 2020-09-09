<template>
  <div class="container form--width-setter">
    <form @submit.prevent="onSubmit()" autocomplete="off">
      <div class="form-items">
        <label for="title">Title</label>
        <span class="d-flex">
          <input
            name="title"
            type="text"
            v-model="title"
            class="form-item"
            ref="title"
          />
          <select class="select-box" name="priority" v-model="priority">
            <option value="null" selected disabled>Select Priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </span>
      </div>
      <div
        class="form-items"
        :class="{
          'textarea-block': title === '' || priority === null,
          'textarea-block--visible': title !== '' && priority !== null
        }"
      >
        <label for="desc">Description</label>
        <textarea
          name="desc"
          v-model="desc"
          class="form-item-textarea"
          ref="description"
        ></textarea>
      </div>
      <div class="form-items d-flex">
        <!-- <input
          type="submit"
          :disabled="title === '' || priority === null"
          class="btn btn-primary"
          ref="submit"
        /> -->
        <button
          class="btn btn-primary"
          :disabled="title === '' || priority === null"
          ref="submit"
        >
          <span v-if="id === ''">Add</span>
          <span v-else>Edit</span>
        </button>
        <button class="btn btn-reset" @click.prevent="reset()">
          <i class="fa fa-repeat"></i> Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { vueBus } from "./../main";
import fb from "firebase";
import db from "../firebase";
export default {
  data() {
    return {
      id: "",
      title: "",
      desc: "",
      priority: null,
      completed: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.id === "") this.add();
      else this.edit();
    },
    onEdit(item) {
      this.id = item.id;
      this.title = item.todoData.title;
      this.desc = item.todoData.description;
      this.priority = item.todoData.priority;
      this.completed = item.todoData.completed;
    },
    reset() {
      this.id = "";
      this.title = "";
      this.desc = "";
      this.priority = null;
      this.completed = false;
    },
    async add() {
      var obj = {
        title: this.title,
        description: this.desc,
        priority: Number.parseInt(this.priority),
        completed: this.completed,
        email: fb.auth().currentUser.email,
      };
      await db
        .collection("todos")
        .add(obj)
        .then(() => {
          vueBus.$emit("Reload");
        })
        .catch((err) => {
          console.log(err);
        });
      this.reset();
    },
    edit() {
      var obj = {
        id: this.id,
        title: this.title,
        description: this.desc,
        priority: Number.parseInt(this.priority),
        completed: this.completed,
        email: fb.auth().currentUser.email,
      };
      db.collection("todos")
        .doc(this.id)
        .update(obj)
        .then(() => {
          vueBus.$emit("Reload");
        })
        .catch((err) => console.log(err));
      this.reset();
    },
  },
  mounted() {
    vueBus.$on("Edit", (item) => {
      this.onEdit(item);
    });
  },
};
</script>

<style lang="scss">
.form--width-setter {
  display: flex;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  flex-basis: 400px;
  label {
    font-size: 0.9rem;
    font-weight: 700;
  }
  .select-box {
    margin-left: 10px;
    border: 0;
    border-bottom: 1px solid var(--clr-font);
  }
  option {
    padding: 10px;
  }
  .form-items {
    margin: 0.5rem 0;
    position: relative;
  }
  input,
  button {
    width: 100%;
    padding: 7px 2px;
    border: 0;
    border-bottom: 1px solid var(--clr-font);
    transition: 250ms ease-in-out;
    flex: 1;
  }
  input:focus {
    border-bottom: 1px solid var(--clr-green);
  }
  .textarea-block {
    visibility: hidden;
    position: absolute;
    top: -150px;
  }

  .textarea-block--visible {
    visibility: visible;
  }
  .form-item-textarea {
    width: 100%;
    border: 0;
    height: 50px;
    border-bottom: 1px solid var(--clr-font);
    transition: 250ms ease-in-out;
  }
  .form-item-textarea:focus {
    border-bottom: 1px solid var(--clr-green);
  }
}
.btn {
  border-radius: 3px;
  border: 0;
  cursor: pointer;
}
.btn:disabled {
  cursor: default;
  background: lightgray;
}
.btn-primary {
  background: var(--clr-green);
  color: var(--clr-background);
  flex: 3;
}

.btn-reset {
  background: #ffc300;
  margin-left: 14px;
  padding: 0 20px;
}
</style>
