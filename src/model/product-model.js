// 현재 product 재고 수량을 넣는 곳

import { parseProductFileData } from '../utils/parse-data.js';

class ProductModel {
  constructor() {
    this.currentProducts = parseProductFileData();
  }
}

export default ProductModel;
