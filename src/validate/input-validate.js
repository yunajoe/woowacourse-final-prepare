import { ErrorMessage } from '../constants/error-messge.js';

const InputValidate = {
  validEmpty(input) {
    if (!input || input.length === 0) {
      throw new Error(ErrorMessage.format);
    }
  },
};

export default InputValidate;
