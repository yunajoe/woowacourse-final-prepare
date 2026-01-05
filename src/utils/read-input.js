import { Console } from '@woowacourse/mission-utils';

export const readUserInput = async message => {
  return await Console.readLineAsync(message);
};

export const askProductNameAndCount = async () => {
  return await readUserInput('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
};

export const askMemberShipDisCount = async () => {
  return await readUserInput('멤버십 할인을 받으시겠습니까? (Y/N)\n');
};

export const askRePurchaseInput = async () => {
  return await readUserInput('감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n');
};
