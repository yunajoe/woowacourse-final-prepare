import { Console } from '@woowacourse/mission-utils';

export const retryInput = async callback => {
  while (true) {
    try {
      const result = await callback();
      return result;
    } catch (error) {
      Console.print(error.message);
    }
  }
};
