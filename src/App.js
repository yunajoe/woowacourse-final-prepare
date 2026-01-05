import { Console } from '@woowacourse/mission-utils';
import CartModel from './model/cart-model.js';
import ProductModel from './model/product-model.js';
import ReceiptModel from './model/receipt-model.js';
import { finalParseProductInputData, parseProductWithPromotionFileData, parsePromotionFileData } from './utils/parse-data.js';
import { printProductsData, printReceipt } from './utils/print-data.js';
import { findTargetItemAndPromotion } from './utils/promotion.js';
import { askMemberShipDisCount, askProductNameAndCount } from './utils/read-input.js';
import { retryInput } from './utils/retry-input.js';
import MemberShipInputValidate from './validate/membership-input-validate.js';
import ProductInputValidate from './validate/product-input-validate.js';

class App {
  async run() {
    const cartModel = new CartModel();
    const productModel = new ProductModel();
    const receiptModel = new ReceiptModel();
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n\n');
    printProductsData(productModel.currentProducts); // 편의점 재고수량 출력
    const productInputs = await retryInput(async () => {
      const input = await askProductNameAndCount();
      ProductInputValidate.validate(input, productModel.currentProducts);
      return finalParseProductInputData(input);
    });
    cartModel.addItemToCart(productInputs);
    const parsedPromotionData = parsePromotionFileData();
    const parsedProductPromotionData = parseProductWithPromotionFileData();

    for (const cartItem of cartModel.cartItems) {
      const { productInfo, promotionInfo } = findTargetItemAndPromotion(cartItem, parsedPromotionData, parsedProductPromotionData);
      // 프로모션이 있을 때
      if (promotionInfo) {
        console.log('프로모션이 있어용 ===>');
      }
      // 프로모션이 없을 때
      if (!promotionInfo) {
        console.log('프로모션이 없어용 ====>');
        receiptModel.createNonPromotionItem(productInfo, cartItem);
      }
    }

    await retryInput(async () => {
      const membershipInput = await askMemberShipDisCount();
      MemberShipInputValidate.validate(membershipInput);
    });
    // 영수증 출력
    receiptModel.calculateProduct();
    printReceipt(receiptModel.purchaseItems, receiptModel.totalPrice, receiptModel.totalCount, receiptModel.promotionDiscount);

    //
  }
}
export default App;
