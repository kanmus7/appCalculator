import { onValidateDate } from "./js/validations.js";
import { EMPTY_ERROR } from "./js/constants.js";
const inputs = document.querySelectorAll(".input-compute");
const labels = document.querySelectorAll(".title-compute");
const arrowButton = document.querySelector("img");
const outputsError = document.querySelectorAll(".error__title");
const resultsOutput = document.querySelectorAll(".result");

//Remove every error class when the input is being focus
onClearErrors();

arrowButton.addEventListener("click", () => {
  outputsError.forEach((output) => output.classList.remove("--error"));
  labels.forEach((label) => label.classList.remove("--error"));
  inputs.forEach((input) => input.classList.remove("--error"));
  outputsError.forEach((output) => (output.innerHTML = ""));

  const day = inputs[0].value;
  const month = inputs[1].value;
  const year = inputs[2].value;
  const monthDays = new Date(year, month, 0).getDate();

  //Validate inputs
  const isValid = handleValidateInputs(monthDays);
  if (isValid.some((item) => item === false)) {
    outputsError.forEach((output) => output.classList.add("--error"));
    labels.forEach((label) => label.classList.add("--error"));
    inputs.forEach((input) => input.classList.add("--error"));
    resultsOutput[0].innerHTML = "- -";
    resultsOutput[1].innerHTML = "- -";
    resultsOutput[2].innerHTML = "- -";
    return;
  }

  //Compute age
  const age = handleComputeAge({ day, month, year, monthDays });
  resultsOutput[0].innerHTML = age.yearsAge;
  resultsOutput[1].innerHTML = age.monthsAge;
  resultsOutput[2].innerHTML = age.daysAge;
});

function handleValidateInputs(monthDays) {
  let isValid = [];
  inputs.forEach((input, index) => {
    const isEmptyValue = input.value;
    const validateValue = onValidateDate({ monthDays, inputElement: input });
    outputsError[index].innerHTML = !isEmptyValue
      ? EMPTY_ERROR
      : validateValue
      ? validateValue
      : "";

    if (!isEmptyValue || validateValue) {
      isValid.push(false);
    } else {
      isValid.push(true);
    }
  });
  return isValid;
}

function handleComputeAge({ day, month, year, monthDays }) {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let yearsAge = currentYear - year;
  let monthsAge = currentMonth - month;
  let daysAge = currentDay - day;

  if (daysAge < 0) {
    monthsAge--;
    daysAge += monthDays;
  }

  if (monthsAge < 0) {
    yearsAge--;
    monthsAge += 12;
  }

  return {
    yearsAge,
    monthsAge,
    daysAge,
  };
}

function onClearErrors() {
  inputs.forEach((input, index) => {
    input.addEventListener("focus", () => {
      input.classList.remove("--error");
      outputsError[index].classList.remove("--error");
      outputsError[index].innerHTML = "";
      labels[index].classList.remove("--error");
    });
  });
}
