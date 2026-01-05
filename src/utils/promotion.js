import { getNowDate } from './read-today-date.js';

export const findTargetItemAndPromotion = (cartItem, parsedPromotionData, parsedProductPromotionData) => {
  const productInfo = parsedProductPromotionData[cartItem.productName];
  const promotionInfo = parsedPromotionData[productInfo.promotion];
  return {
    productInfo,
    promotionInfo,
  };
};

// promotion date날짜 확인
export const checkPromotionDate = targetPromotion => {
  const startDate = targetPromotion.startDate; // 2024-01-01
  const endDate = targetPromotion.endDate; // 2024-12-31
  const today = getNowDate();
  return today >= new Date(startDate) && today <= new Date(endDate);
};
