import { getNowDate } from './read-today-date.js';

export const findTargetItemAndPromotion = (cartItem, parsedPromotionData, parsedProductPromotionData) => {
  const targetProduct = parsedProductPromotionData[cartItem.productName];
  const targetPromotion = parsedPromotionData[targetProduct.promotion];
  return {
    targetProduct,
    targetPromotion,
  };
};

export const checkPromotion = (cartItem, targetProduct, targetPromotion) => {
  const isPromotionDatePossible = checkPromotionDate(targetPromotion);
  console.log('isProotionPossbible', isPromotionDatePossible);
};

// promotion date날짜 확인
export const checkPromotionDate = targetPromotion => {
  const startDate = targetPromotion.startDate; // 2024-01-01
  const endDate = targetPromotion.endDate; // 2024-12-31
  const today = getNowDate();
  return today >= new Date(startDate) && today <= new Date(endDate);
};

// 수량 확인
