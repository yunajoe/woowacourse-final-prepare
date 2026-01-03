import { parseProductFileData, parsePromotionFileData } from './parse-data.js';

// 어떠한 프로모션에 속하는지 return하는 함수
export const returnWhichPromotion = productName => {
  const parsedProductData = parseProductFileData();
  const parsedPromotionData = parsePromotionFileData();
  console.log('ggg', parsedProductData);
  console.log('ggg2222', productName);
  // 탄산 2 + 1, 9개 MD 추천 상품.. etc
};
