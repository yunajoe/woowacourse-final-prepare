import { Console } from '@woowacourse/mission-utils';
import { INTRO_MESSAGES } from '../constants/input-message.js';

export const readUserInput = async message => {
  return Console.readLineAsync(message);
};

export const askPurchaseProductNameAndAmount = async () => {
  return await readUserInput(INTRO_MESSAGES.REQUEST_PRODUCT_NAME_AND_COUNT);
};

export const askPromotionFreeCount = async (productName, promotionGetCount) => {
  return await readUserInput(`현재 ${productName}은(는) ${promotionGetCount}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
};

export const askMemberShipDiscount = async () => {
  return await readUserInput('멤버십 할인을 받으시겠습니까? (Y/N)');
};
