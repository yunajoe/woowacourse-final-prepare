import InputValidate from './input-validate.js';

class WorkerListInputValidate {
  static validate(input) {
    InputValidate.checkEmpty(input);
    const workers = input.split(',');
    this.#checkDuplicated(workers);
    this.#checkLength(workers);
  }

  static #checkDuplicated(workers) {
    const size = new Set(workers).size;
    if (workers.length !== size) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }

  static #checkLength(workers) {
    if (workers.length < 5 || workers.length > 35) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
}

export default WorkerListInputValidate;
