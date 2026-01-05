// 현재 product 재고 수량을 넣는 곳

import { parseProductFileData } from '../utils/parse-data.js';

class ProductModel {
  constructor() {
    this.currentProducts = parseProductFileData();
  }

  // 유저가 결제에 성공하면은 그 아이템을 현재 카트 아이템에서 뺴기
  deductCartProduct(purchasedItems) {
    purchasedItems.forEach(item => {
      const { productName, productCount, promotionCount } = item;
      const currentStocks = this.currentProducts[productName];
      const normalStock = currentStocks.filter(stock => !stock.promotion);
      const promotionStock = currentStocks.filter(stock => stock.promotion);

      // 일반 상품 차감
      if (productCount > 0) {
        // 일반 재고 목록에서 차감
        normalStock.forEach(stock => {
          stock.count = stock.count - productCount;
        });
        this.currentProducts[productName] = [];
        this.currentProducts[productName].push(...normalStock);
        this.currentProducts[productName].push(...promotionStock);
      }
      // 프로모션 상품 차감
      if (promotionCount > 0) {
        promotionStock.forEach(stock => {
          stock.count = stock.count - promotionCount;
        });
        this.currentProducts[productName] = [];
        this.currentProducts[productName].push(...promotionStock);
        this.currentProducts[productName].push(...normalStock);
      }
    });
  }
}

export default ProductModel;
