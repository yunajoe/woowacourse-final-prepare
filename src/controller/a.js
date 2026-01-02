import { Console } from '@woowacourse/mission-utils';
import { askMembershipYN, askPurchaseProductNameAndAmount } from '../utils/read-input.js';
import ProductAmountInputValidate from '../validate/product-amount-input-validate.js';

class InputController {
  async readProductAndAmount() {
    while (true) {
      try {
        const input = await askPurchaseProductNameAndAmount();
        ProductAmountInputValidate.validate(input);
        return input;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  parseProductInput(input) {
    // 예: [사이다-2] -> { name: "사이다", amount: 2 }
    const arr = input.match(/\[([가-힣a-zA-Z]+)-(\d+)\]/);
    return {
      name: arr[1],
      amount: Number(arr[2]),
    };
  }

  async askMembership() {
    while (true) {
      const input = await askMembershipYN();
      const answer = input.trim().toUpperCase();
      if (answer === 'Y') return true;
      if (answer === 'N') return false;
      Console.print('[ERROR] Y 혹은 N만 입력이 가능합니다.');
    }
  }
}

export default InputController;
