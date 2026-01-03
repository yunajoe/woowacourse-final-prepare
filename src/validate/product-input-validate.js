import { parseProductFileData, parseProductInputData } from '../utils/parse-data.js';
import InputValidate from './input-validate.js';

class ProductInputValidate {
  static validate(input) {
    InputValidate.checkEmpty(input);
    this.#validateFormat(input);
    const { productName, productCount } = parseProductInputData(input);
    this.#validateProductName(productName);
    this.#validateProductCount(productCount);
  }
  static #validateFormat(input) {
    const regex = /\[([^\]-]+)-(\d+)\]/;
    if (!regex.test(input)) throw new Error('[ERROR] 입력 형식에 맞춰 상품을 입력해야 합니다.');
  }

  static #validateProductName(productName) {
    const parsedData = parseProductFileData();
    if (!parsedData[productName]) throw new Error('[ERROR] 상품을 찾을 수 없습니다. 다시 입력해 주세요.');
  }
  static #validateProductCount(productCount) {
    if (productCount < 1) throw new Error('[ERROR] 수량은 0개 이상 입력해야 합니다.');
  }
}

export default ProductInputValidate;
