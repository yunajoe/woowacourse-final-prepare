import { ErrorMessage } from '../constants/message.js';
import InputValidate from './input-validate.js';

const CoachNameValidate = {
  validate(names) {
    InputValidate.checkEmpty(names, ErrorMessage.coachNames);
    const namesArr = names.split(',').map(name => name.trim());
    this.validateMinMaxPerson(namesArr);
  },

  validateMinMaxPerson(namesArr) {
    if (namesArr.length < 2 || namesArr.length > 5) {
      throw new Error(ErrorMessage.coachNames);
    }
  },
  validateMinMaxNameLength(namesArr) {
    namesArr.forEach(name => {
      if (name.length < 1 || name.length > 4) {
        throw new Error(ErrorMessage.coachNames);
      }
    });
  },
};

export default CoachNameValidate;
