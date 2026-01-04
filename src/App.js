import { Console } from '@woowacourse/mission-utils';
import CartModel from './model/cart-model.js';
import { finalParseProductInputData, parseProductFileData, parseProductWithPromotionFileData, parsePromotionFileData } from './utils/parse-data.js';
import { printProductsData, printReceipt } from './utils/print-data.js';
import { checkPromotion, findTargetItemAndPromotion } from './utils/promotion.js';
import { askMemberShipDisCount, askProductNameAndCount } from './utils/read-input.js';
import { retryInput } from './utils/retry-input.js';
import MemberShipInputValidate from './validate/membership-input-validate.js';
import ProductInputValidate from './validate/product-input-validate.js';

class App {
  async run() {
    const cartModel = new CartModel();
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n\n');
    const parsedProductData = parseProductFileData();
    printProductsData(parsedProductData); // 편의점 재고수량 출력

    const productInputs = await retryInput(async () => {
      const input = await askProductNameAndCount();
      ProductInputValidate.validate(input, parsedProductData);
      return finalParseProductInputData(input);
    });
    cartModel.addItemToCart(productInputs);
    const parsedPromotionData = parsePromotionFileData();
    const parsedProductPromotionData = parseProductWithPromotionFileData();

    for (const cartItem of cartModel.cartItems) {
      //  { productName: '콜라', productCount: 3, promotionQuantity: 0 }
      const { targetProduct, targetPromotion } = findTargetItemAndPromotion(cartItem, parsedPromotionData, parsedProductPromotionData);
      // 프로모션이 있을 때
      if (targetPromotion) {
        console.log('프로모션이 있어용');
        checkPromotion(cartItem, targetProduct, targetPromotion);
      }

      // 프로모션이 없을 때
      if (!targetPromotion) {
        console.log('프로모션이 없어용');
        retryInput(async () => {
          const membershipInput = await askMemberShipDisCount();
          MemberShipInputValidate.validate(membershipInput);
          printReceipt();
        });
      }
    }
  }
}

export default App;
