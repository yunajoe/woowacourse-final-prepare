import InputValidate from './input-validate.js';

// validate는 static 메서드 사용하기
class ProductAmountInputValidate {
  static validate(input) {
    InputValidate.checkEmpty(input);
    this.checkFormat(input);
    this.checkNonZeroProductAmount(input);
  }
  static checkFormat(input) {
    const PRODUCT_REGEX = /^\[[가-힣a-zA-Z]+-[0-9]\d*\]$/;
    if (!PRODUCT_REGEX.test(input)) {
      throw new Error('[ERROR] 입력 형식에 맞춰 상품을 입력해야 합니다.');
    }
  }
  static checkNonZeroProductAmount(input) {
    const splitArr = input.replace('[', '').replace(']', '').split('-');
    const [, count] = splitArr;
    if (Number(count) === 0) {
      throw new Error('[ERROR] 수량은 0개 이상 입력해야 합니다.');
    }
  }
}

export default ProductAmountInputValidate;
