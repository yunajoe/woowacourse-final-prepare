import { MENU_DOMAIN } from '../constants/menu.js';
import { ERROR_MESSAGE } from '../constants/message.js';
import InputValidate from './input-validate.js';

const MenuInputValidate = {
  validate(input) {
    InputValidate.validateEmpty(input, ERROR_MESSAGE.menu);
    this.validateFormat(input);
  },

  validateFormat(input) {
    input.split(',').forEach(item => {
      const [menu, count] = item.split('-');
      this.validateMenuExist(menu);
      InputValidate.validateNumber(Number(count), ERROR_MESSAGE.menu);
      this.validateMenuCount(Number(count));
    });
  },
  validateMenuExist(menu) {
    if (!MENU_DOMAIN[menu]) {
      throw new Error(ERROR_MESSAGE.menu);
    }
  },
  validateMenuCount(count) {
    if (count <= 0 || count > 20) {
      throw new Error(ERROR_MESSAGE.menu);
    }
  },
};

export default MenuInputValidate;
