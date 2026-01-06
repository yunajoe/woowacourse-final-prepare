import { ERROR_MESSAGE } from '../constants/message.js';
import InputValidate from './input-validate.js';

const VisitDateInputValidate = {
  validate(input) {
    InputValidate.validateEmpty(input, ERROR_MESSAGE.date);
    const numInput = Number(input);
    InputValidate.validateNumber(numInput, ERROR_MESSAGE.date);
    this.validateRangeNumber(numInput);
  },

  // 1 ~ 31안에 있는지 확인
  validateRangeNumber(input) {
    if (input < 1 || input > 31) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  },
};

export default VisitDateInputValidate;
