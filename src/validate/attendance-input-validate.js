import { ErrorMessage } from '../constants/error-messge.js';
import InputValidate from './input-validate.js';

const AttendanceInputValidate = {
  validateDateTime(input) {
    InputValidate.validEmpty(input);
    const [hours, minutes] = input.split(':');
    if (hours.length !== 2 || minutes.length !== 2) {
      throw new Error(ErrorMessage.format);
    }
    const [numHours, numMinutes] = [Number(hours), Number(minutes)];

    InputValidate.validateNumber(numHours);
    InputValidate.validateNumber(numMinutes);
    if (numHours >= 24) {
      throw new Error(ErrorMessage.format);
    }
    if (numMinutes >= 60) {
      throw new Error(ErrorMessage.format);
    }
  },
};

export default AttendanceInputValidate;
