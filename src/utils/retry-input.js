/**
 *
 * @param {number} Function

 */

import { Console } from '@woowacourse/mission-utils';

export const retryInput = async action => {
  while (true) {
    try {
      await action();
      break;
    } catch (error) {
      Console.print(error.message);
    }
  }
};
