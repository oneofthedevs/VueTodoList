<template>
  <div class="container">
    <form @submit.prevent="onSubmit()" autocomplete="off">
      <div class="form-items">
        <label for="title">Title</label>
        <input name="title" type="text" v-model="title" class="form-item" ref="title" />
      </div>
      <div class="form-items" v-if="title != ''">
        <label for="desc">Description</label>
        <textarea name="desc" class="form-item-textarea" ref="description"></textarea>
      </div>
      <div class="form-items" style="display: block">
        <input type="submit" :disabled="title === ''" class="btn btn-primary" ref="submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("clicked");
    }
  }
};
</script>

<style lang="scss">
.container {
  margin: 20px 25% 0 25%;
}
form {
  display: flex;
  flex-basis: 500px;
  flex-direction: column;
  label {
    font-size: 1.1rem;
    font-weight: 500;
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
