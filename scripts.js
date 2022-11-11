const regExpressions = {
  user: /^[a-zA-Z0-9]{3,10}$/,
  name: /^[a-zA-Z]{2,16}\s?[a-zA-Z]*$/,
  password: /^[a-zA-Z0-9!@#$%&]{4,15}/,
  email: /^[a-zA-Z0-9._#-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/,
  phone: /^\d{3}-\d{3}-\d{4}$/,
};
const fields = {
  user: false,
  name: false,
  password: false,
  password2: false,
  email: false,
  phone: false,
};
const form = document.getElementById("form");
const inputs = document.querySelectorAll(".inputs input");

let validateHelper = (inputName, inputValue) => {
  if (regExpressions[inputName].test(inputValue)) {
    document
      .querySelector(`.form__${inputName}`)
      .classList.add("input--correct");
    document
      .querySelector(`.form__${inputName}`)
      .classList.remove("input--incorrect");
    document
      .querySelector(`.form__${inputName} i`)
      .classList.remove("fa-circle-xmark");
    document
      .querySelector(`.form__${inputName} i`)
      .classList.add("fa-circle-check");
    fields[inputName] = true;
  } else {
    document
      .querySelector(`.form__${inputName}`)
      .classList.remove("input--correct");
    document
      .querySelector(`.form__${inputName}`)
      .classList.add("input--incorrect");
    document
      .querySelector(`.form__${inputName} i`)
      .classList.add("fa-circle-xmark");
    document
      .querySelector(`.form__${inputName} i`)
      .classList.remove("fa-circle-check");
    fields[inputName] = false;
  }
};

let validateRepeatPassword = () => {
  const pass1 = document.querySelector(".input__password input");
  const pass2 = document.querySelector(".input__password2 input");
  if (pass1.value === pass2.value) {
    document
      .querySelector(`.form__${pass2.name}`)
      .classList.add("input--correct");
    document
      .querySelector(`.form__${pass2.name}`)
      .classList.remove("input--incorrect");
    document
      .querySelector(`.form__${pass2.name} i`)
      .classList.remove("fa-circle-xmark");
    document
      .querySelector(`.form__${pass2.name} i`)
      .classList.add("fa-circle-check");
    fields.password2 = true;
  } else {
    document
      .querySelector(`.form__${pass2.name}`)
      .classList.remove("input--correct");
    document
      .querySelector(`.form__${pass2.name}`)
      .classList.add("input--incorrect");
    document
      .querySelector(`.form__${pass2.name} i`)
      .classList.add("fa-circle-xmark");
    document
      .querySelector(`.form__${pass2.name} i`)
      .classList.remove("fa-circle-check");
    fields.password2 = false;
  }
};

let validateInput = (e) => {
  switch (e.target.name) {
    case "user":
      validateHelper(e.target.name, e.target.value);
      break;
    case "name":
      validateHelper(e.target.name, e.target.value);
      break;
    case "password":
      validateHelper(e.target.name, e.target.value);
      validateRepeatPassword();
      break;
    case "password2":
      validateRepeatPassword();
      break;
    case "email":
      validateHelper(e.target.name, e.target.value);
      break;
    case "phone":
      validateHelper(e.target.name, e.target.value);
      break;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let t = document.getElementById("terms").checked;
  if (
    fields.user &&
    fields.name &&
    fields.password &&
    fields.password2 &&
    fields.email &&
    fields.phone &&
    t
  ) {
    document.querySelector(".form__missing__fields").style.opacity = "0";
    document.querySelector(".button__message").style.opacity = 1;
    form.reset();
    setTimeout(() => {
      document.querySelector(".button__message").style.opacity = 0;
    }, 3000);
  } else {
    console.log(t);
    document.querySelector(".form__missing__fields").style.opacity = "1";
  }
});

inputs.forEach((input) => {
  input.addEventListener("keyup", validateInput);
  input.addEventListener("blur", validateInput);
});
