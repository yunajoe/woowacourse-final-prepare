import { MissionUtils } from '@woowacourse/mission-utils';
import loadData from './load-data.js';
import { parsePromotionData } from './parse-data.js';
import { askPromotionFreeCount } from './read-input.js';

const parseDate = date => {
  const [year, month, day] = date.split('-');
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
};

export const returnTodayDate = () => {
  const date = MissionUtils.DateTimes.now(); // 2026-01-01T23:11:45.519Z
  const utcDate = new Date(date);
  const year = utcDate.getFullYear();
  const month = utcDate.getMonth() + 1;
  const day = utcDate.getDate();
  return {
    year,
    month,
    day,
  };
};

// promotion 네임이 있는지 확인하기
export const checkPromotionName = targetObj => {
  for (let i = 0; i < targetObj.length; i++) {
    const obj = targetObj[i];
    const { promotion } = obj;
    if (promotion) return promotion;
  }
  return null;
};

// promotion date가 해당되지 확인하기
export const checkPromotionDate = (promotionObject, promotionName) => {
  if (promotionObject[promotionName]) {
    const { startDate, endDate } = promotionObject[promotionName];
    const startParseDate = parseDate(startDate);
    const endParseDate = parseDate(endDate);
    const { year, month, day } = returnTodayDate();
    if (year < startParseDate.year || year > endParseDate.year) {
      return false;
    }
    if (month < startParseDate.month || month > endParseDate.month) {
      return false;
    }
    if (day < startParseDate.day || day > endParseDate.month) {
      return false;
    }
    return true;
  }
  return false;
};

// promotion 갯수에 해당되는지 확인하기
export const checkPromotionAmount = async (promotionObject, productName, promotionName, productAmount) => {
  const promotionBuyCount = promotionObject[promotionName].buy;
  const promotionGetCount = promotionObject[promotionName].get;
  if (promotionBuyCount === Number(productAmount)) {
    const yesOrNo = await askPromotionFreeCount(productName, promotionGetCount);
    if (yesOrNo.toUpperCase() !== 'Y' || yesOrNo.toUpperCase() !== 'N') {
      throw new Error('[ERROR] Y 혹은 N만 입력이 가능합니다.');
    }
  }
};

export const checkPromotion = (targetObj, productName, productAmount) => {
  const promotions = loadData('public/promotions.md');
  const promotionObject = parsePromotionData(promotions);
  const promotionName = checkPromotionName(targetObj); // 탄산 2 + 1
  const isPromotionAvailable = checkPromotionDate(promotionObject, promotionName);
  checkPromotionAmount(promotionObject, productName, promotionName, productAmount);
};
