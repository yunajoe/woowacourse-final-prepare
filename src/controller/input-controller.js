import { Console } from '@woowacourse/mission-utils';
import { askPurchaseProductNameAndAmount } from '../utils/read-input.js';
import ProductAmountInputValidate from '../validate/product-amount-input-validate.js';

class InputController {
  async readProductInput() {
    while (true) {
      try {
        const input = await askPurchaseProductNameAndAmount();
        ProductAmountInputValidate.validate(input);
        return input;
      } catch (error) {
        Console.print(error);
      }
    }
  }
  parseProductInput(input) {
    const [name, amount] = input.replace('[', '').replace(']', '').split('-');
    return {
      productName: name,
      productAmount: Number(amount),
    };
  }
}

export default InputController;
