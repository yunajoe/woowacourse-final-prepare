import { parseProductInputData } from '../utils/parse-data.js';
import InputValidate from './input-validate.js';

class ProductInputValidate {
  static validate(inputs, parsedProductData) {
    InputValidate.checkEmpty(inputs);
    inputs.split(',').forEach(input => {
      this.#validateFormat(input);
      const { productName, productCount } = parseProductInputData(input);
      this.#validateProductName(productName, parsedProductData);
      this.#validateNonZeroCount(productCount);
      this.#validateOverStockCount(productName, productCount, parsedProductData);
    });
  }
  static #validateFormat(input) {
    const regex = /\[([^\]-]+)-(\d+)\]/;
    if (!regex.test(input)) throw new Error('[ERROR] 입력 형식에 맞춰 상품을 입력해야 합니다.');
  }

  static #validateProductName(productName, parsedProductData) {
    if (!parsedProductData[productName]) throw new Error('[ERROR] 상품을 찾을 수 없습니다. 다시 입력해 주세요.');
  }
  static #validateNonZeroCount(productCount) {
    if (productCount < 1) throw new Error('[ERROR] 수량은 0개 이상 입력해야 합니다.');
  }
  static #validateOverStockCount(productName, productCount, parsedProductData) {
    const AllStock = parsedProductData[productName].reduce((acc, item) => {
      const { count } = item;
      acc += count;
      return acc;
    }, 0);
    if (productCount > AllStock) throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
  }
}

export default ProductInputValidate;
