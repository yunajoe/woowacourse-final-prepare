const InputValidate = {
  checkEmpty(input, message) {
    if (!input || input.length === 0) {
      throw new Error(message);
    }
  },
};
export default InputValidate;
