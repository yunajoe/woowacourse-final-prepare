class InputValidate {
  static checkEmpty(input) {
    if (!input) {
      throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    }
  }
}

export default InputValidate;
