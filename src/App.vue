<template>
  <div id="app">
    <Navbar :key="$route.fullPath" />
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/navbar";
export default {
  components: {
    Navbar,
  },
  mounted() {
    document.title = "Todo List";
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
.container {
  margin: 0 25%;
  padding: 20px 0;
}

.mt-1 {
  margin-top: 1rem;
}
.container-fluid {
  margin: 10px;
}

.d-flex {
  display: flex;
}
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
  input {
    padding: 7px 2px 4px 2px;
  }
  button {
    padding: 10px 2px;
  }
  input,
  button {
    font-size: 1rem;
    width: 100%;
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

@media screen and (max-width: 967px) {
  .container {
    margin: 0 10px;
  }
}
</style>
