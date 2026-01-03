// 현재 product 재고 수량을 넣는 곳
// 관련 로직도 여기서 처리한다.

import { parseProductInputData } from '../utils/parse-data.js';
import { returnWhichPromotion } from '../utils/promotion.js';

// 로직은 utils에로 따로 빼기
class ProductModel {
  constructor() {
    this.productInput = null;
    this.productObject = null;
    this.promotionObject = null;
  }
  setProductInput(input) {
    this.productInput = input;
  }
  calculate() {
    const { productName, productCount } = parseProductInputData(this.productInput);
    const promotionName = returnWhichPromotion(productName);
  }
}

export default ProductModel;
