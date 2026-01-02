import { groupingData, IsDateInPromotionDate } from '../utils/parse-data.js';
class ProductModel {
  constructor(products) {
    this.products = products;
  }

  checkProducts({ productName, productAmount }) {
    // 해당 상품이 있는지 확인해보기
    const product = groupingData(this.products)[productName];
    if (!product) throw new Error('[ERROR] 상품을 찾을 수 없습니다. 다시 입력해 주세요.');

    const matchedProducts = this.products.filter(product => product.name === productName);
    const totalStock = matchedProducts.reduce((acc, product) => {
      acc += product.quantity;
      return acc;
    }, 0);
    if (productAmount > totalStock) {
      throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
    }
  }

  purchaseProducts({ productName, productAmount }) {
    // 현재 상품이 어떠한 프로모션에 해당하는지 check
    const product = groupingData(this.products)[productName];
    //  { name: '사이다', price: 1000, quantity: 8, promotion: '탄산2+1' }
    const productPromotion = product.find(item => item.promotion !== null);

    // 해당 target에 promotion 이 없으면
    if (productPromotion) {
      const promotionName = productPromotion.promotion;
      const promotionsRaw = loadData('public/promotions.md');
      const promotions = parsePromotionData(promotionsRaw);
      const promotion = promotions[promotionName];

      // 해당 프로모션이 현재 promotions.md에 있으면은
      if (promotion) {
        const { buy, get, startDate, endDate } = promotion;
        // 기간이 적절한다면?
        if (IsDateInPromotionDate(startDate, endDate) && productAmount >= buy) {
        }
      }
    }
  }
}

export default ProductModel;
