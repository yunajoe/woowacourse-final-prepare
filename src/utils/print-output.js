import { Console } from '@woowacourse/mission-utils';
import { INTRO_MESSAGES } from '../constants/input-message.js';

export const printOutput = message => {
  Console.print(message);
};

export const printIntroduceConvenience = () => {
  printOutput(INTRO_MESSAGES.INTRODUCE);
};
