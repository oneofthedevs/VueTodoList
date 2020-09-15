const rules = {
  required: (value) => !!value || "Required.",
  counter: (value) => value.length <= 20 || "Max 20 characters",
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
  password: (value) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
    return (
      pattern.test(value) ||
      "Password must contain lower case, uppercare character and a symbol"
    );
  },
  minLength: (value) => value.length > 8 || "Password must be 8 characters",
};

export default rules;
