import { filterData } from '../../utils/parse-data.js';
import InputValidate from './input-validate.js';

const NicknameInputValidate = {
  validate(input, parsedData) {
    InputValidate.validEmpty(input);
    this.validateNickname(input, parsedData);
  },
  validateNickname(input, parsedData) {
    const result = filterData(parsedData, value => value.name === input);
    if (result.length === 0) {
      throw new Error('[ERROR] 등록되지 않은 닉네임입니다.');
    }
  },
};

export default NicknameInputValidate;
