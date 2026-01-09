import { ErrorMessage } from '../constants/error-messge.js';

const InputValidate = {
  validEmpty(input) {
    if (!input || input.length === 0) {
      throw new Error(ErrorMessage.format);
    }
  },
  validateNumber(input) {
    if (Number.isNaN(input)) {
      throw new Error(ErrorMessage.format);
    }
  },
  validateToday(input) {
    const { month, date, day } = input;
    if ((day === '토') | (day === '일')) {
      throw new Error(`[ERROR] ${month}월 ${date}일 ${day}요일은 등교하는 날이 아닙니다.`);
    }
  },
};

export default InputValidate;
