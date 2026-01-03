class InputValidate {
  static checkEmpty(input) {
    if (input.length === 0) throw new Error('[ERROR] 입력 형식에 맞춰 상품을 입력해야 합니다.');
  }
}

export default InputValidate;
