import { Console } from '@woowacourse/mission-utils';

export const retryInput = async callback => {
  while (true) {
    try {
      return await callback();
    } catch (error) {
      Console.print(error.message);
    }
  }
};
