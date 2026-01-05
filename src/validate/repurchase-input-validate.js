import InputValidate from './input-validate.js';

class RepurchaseInputValidate {
  static validate(input) {
    InputValidate.checkEmpty(input);
    this.#validateYesOrNo(input);
  }

  static #validateYesOrNo(input) {
    const upperCaseInput = input.toUpperCase();
    if (upperCaseInput !== 'Y' && upperCaseInput !== 'N') throw new Error('[ERROR] Y 혹은 N만 입력이 가능합니다.');
  }
}
export default RepurchaseInputValidate;
