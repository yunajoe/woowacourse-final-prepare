const InputValidate = {
  validateEmpty(input, message) {
    if (input.length === 0 || !input) {
      throw new Error(message);
    }
  },
  validateNumber(input, message) {
    if (Number.isNaN(input)) {
      throw new Error(message);
    }
  },
};

export default InputValidate;
