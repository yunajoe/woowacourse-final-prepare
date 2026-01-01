// validate는 static 메서드  사용하기
class InputValidate {
  static checkEmpty(input) {
    if (!input) {
      throw new Error('[ERROR] 입력값이 없습니다.');
    }
  }
}

export default InputValidate;
