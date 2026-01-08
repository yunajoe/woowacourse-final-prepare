import { Console } from '@woowacourse/mission-utils';
import { InputMessage } from '../constants/message.js';

const InputView = {
  async readSelectedNumber() {
    const input = await Console.readLineAsync('');
    return input.trim();
  },
  async readNickName() {
    const input = await Console.readLineAsync(InputMessage.nickname);
    return input.trim();
  },
};
export default InputView;
