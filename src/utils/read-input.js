import { Console } from '@woowacourse/mission-utils';

export const readUserInput = async message => {
  return await Console.readLineAsync(message);
};

export const askProductNameAndCount = async () => {
  return await readUserInput('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
};
