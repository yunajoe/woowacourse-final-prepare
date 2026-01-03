import InputValidate from './input-validate.js';

class WorkMonthDayInputValidate {
  static validate(input) {
    InputValidate.checkEmpty(input);
    this.#validateMonthAndDay(input);
  }
  // private 메서드
  static #validateMonthAndDay(input) {
    const [month, day] = input.split(',');
    this.#validateMonth(month);
    this.#validateDay(day);
  }

  // month를 validate
  static #validateMonth(month) {
    if (month.startsWith('0')) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    const numMonth = Number(month);
    if (Number.isNaN(numMonth)) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    if (numMonth < 1 || numMonth > 12) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
  // day를 validate
  static #validateDay(day) {
    const daysArr = ['월', '화', '수', '목', '금', '토', '일'];
    const result = daysArr.some(element => element === day);
    if (!result) throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
}

export default WorkMonthDayInputValidate;
