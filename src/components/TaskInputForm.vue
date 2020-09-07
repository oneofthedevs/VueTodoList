<template>
  <div class="container form--width-setter">
    <form @submit.prevent="onSubmit()" autocomplete="off">
      <div class="form-items">
        <label for="title">Title</label>
        <span class="d-flex">
          <input name="title" type="text" v-model="title" class="form-item" ref="title" />
          <select class="select-box" name="priority" v-model="priority">
            <option value="null" selected disabled>Select Priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </span>
      </div>
      <div class="form-items" v-if="title !== '' && priority !== null">
        <label for="desc">Description</label>
        <textarea name="desc" v-model="desc" class="form-item-textarea" ref="description"></textarea>
      </div>
      <div class="form-items">
        <input type="submit" :disabled="title === ''" class="btn btn-primary" ref="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import { vueBus } from "./../main";

export default {
  data() {
    return {
      title: "",
      desc: "",
      priority: null
    };
  },
  methods: {
    onSubmit() {
      var obj = {
        title: this.title,
        description: this.desc,
        priority: Number.parseInt(this.priority),
        completed: false
      };
      vueBus.$emit("Submit", obj);
      this.title = "";
      this.desc = "";
      this.priority = null;
    }
  }
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
    font-size: 1.1rem;
    font-weight: 500;
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
  }
  input {
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
  textarea {
    width: 100%;
    border: 0;
    height: 50px;
    border-bottom: 1px solid var(--clr-font);
    transition: 250ms ease-in-out;
  }
  textarea:focus {
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
}
</style>
