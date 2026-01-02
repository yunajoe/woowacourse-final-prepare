import InputValidate from './input-validate.js';

class HolidayDayInputValidate {
  static validate(input) {
    InputValidate.checkEmpty(input);
    const splitInput = input.split(',');
    this.#checkDuplicatedWorker(splitInput);
    this.#checkMinMaxLength(splitInput);
  }
  static #checkDuplicatedWorker(splitInput) {
    const size = new Set(splitInput).size;
    if (splitInput.length !== size) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
  static #checkMinMaxLength(splitInput) {
    if (splitInput.length < 5 || splitInput.length > 35) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
}

export default HolidayDayInputValidate;
