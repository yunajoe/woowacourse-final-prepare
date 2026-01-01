import { Console } from '@woowacourse/mission-utils';
import ProductAmountInputValidate from '../validate/product-amount-input-validate.js';

class InputController {
  constructor(inputView) {
    this.inputView = inputView;
  }
  async readProductAndAmount() {
    while (true) {
      try {
        const input = await this.inputView.getPurchaseProductNameAndAmount();
        ProductAmountInputValidate.validate(input);
        return input;
      } catch (error) {
        Console.print(error);
      }
    }
  }
}

export default InputController;
