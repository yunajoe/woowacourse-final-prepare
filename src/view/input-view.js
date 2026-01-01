import { Console } from '@woowacourse/mission-utils';
import { INTRO_MESSAGES } from '../constants/input-message.js';

class InputView {
  async getPurchaseProductNameAndAmount() {
    return await Console.readLineAsync(INTRO_MESSAGES.REQUEST_PRODUCT_NAME_AND_COUNT);
  }
}

export default InputView;
