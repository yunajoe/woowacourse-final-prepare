import { Console } from '@woowacourse/mission-utils';

export const retryInput = async callbackFunc => {
  while (true) {
    try {
      return await callbackFunc();
    } catch (error) {
      Console.print(error.message);
    }
  }
};
