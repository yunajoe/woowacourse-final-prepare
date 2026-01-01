import { Console } from '@woowacourse/mission-utils';
import { INTRO_MESSAGES } from '../constants/input-message.js';

class OutputView {
  async printIntro() {
    Console.print(INTRO_MESSAGES.INTRODUCE);
  }
}
export default OutputView;
