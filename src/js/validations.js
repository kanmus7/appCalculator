import {
  DAY_ERROR,
  MONTH_ERROR,
  YEAR_ERROR,
  CURRENT_YEAR,
} from "./constants.js";

export const onValidateDate = ({ monthDays, inputElement }) => {
  switch (inputElement.placeholder) {
    case "DD":
      if (inputElement.value < 0 || inputElement.value > monthDays) {
        return DAY_ERROR;
      }
      break;
    case "MM":
      if (inputElement.value < 0 || inputElement.value > 12) {
        return MONTH_ERROR;
      }
      break;

    case "YYYY":
      if (inputElement.value < 0 || inputElement.value > CURRENT_YEAR) {
        return YEAR_ERROR;
      }
      break;
  }

  return false;
};
