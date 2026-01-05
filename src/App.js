import { Console } from '@woowacourse/mission-utils';
import CartModel from './model/cart-model.js';
import ProductModel from './model/product-model.js';
import ReceiptModel from './model/receipt-model.js';
import { finalParseProductInputData, parseProductWithPromotionFileData, parsePromotionFileData } from './utils/parse-data.js';
import { printProductsData, printReceipt } from './utils/print-data.js';
import { findTargetItemAndPromotion } from './utils/promotion.js';
import { askMemberShipDisCount, askProductNameAndCount, askRePurchaseInput } from './utils/read-input.js';
import { retryInput } from './utils/retry-input.js';
import MemberShipInputValidate from './validate/membership-input-validate.js';
import ProductInputValidate from './validate/product-input-validate.js';
import RepurchaseInputValidate from './validate/repurchase-input-validate.js';

class App {
  constructor() {
    this.cartModel = new CartModel();
    this.productModel = new ProductModel();
    this.receiptModel = new ReceiptModel();
  }
  async run() {
    // const cartModel = new CartModel();
    // const productModel = new ProductModel();
    // const receiptModel = new ReceiptModel();
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n\n');
    printProductsData(this.productModel.currentProducts); // 편의점 재고수량 출력
    const productInputs = await retryInput(async () => {
      const input = await askProductNameAndCount();
      ProductInputValidate.validate(input, this.productModel.currentProducts);
      return finalParseProductInputData(input);
    });
    this.cartModel.addItemToCart(productInputs);
    const parsedPromotionData = parsePromotionFileData();
    const parsedProductPromotionData = parseProductWithPromotionFileData();

    for (const cartItem of this.cartModel.cartItems) {
      const { productInfo, promotionInfo } = findTargetItemAndPromotion(cartItem, parsedPromotionData, parsedProductPromotionData);
      // 프로모션이 있을 때
      if (promotionInfo) {
        console.log('프로모션이 있어용 ===>');
        this.receiptModel.createPromotionItem(productInfo, promotionInfo, cartItem);
      }
      // 프로모션이 없을 때
      if (!promotionInfo) {
        console.log('프로모션이 없어용 ====>');
        this.receiptModel.createNonPromotionItem(productInfo, cartItem);
      }
    }

    // 멤버십 할인 물어보기
    await retryInput(async () => {
      const membershipInput = await askMemberShipDisCount();
      MemberShipInputValidate.validate(membershipInput);
      this.receiptModel.memberShipInput = membershipInput;
    });
    // 영수증 출력
    this.receiptModel.calculateProduct();
    // product 재고에서 구매한 상품 차감
    this.productModel.deductCartProduct(this.receiptModel.purchaseItems);
    printReceipt(
      this.receiptModel.purchaseItems,
      this.receiptModel.totalPrice,
      this.receiptModel.totalCount,
      this.receiptModel.promotionDiscount,
      this.receiptModel.membershipDiscount,
      this.receiptModel.payAmount,
    );
    await retryInput(async () => {
      const repurchaseInput = await askRePurchaseInput();
      RepurchaseInputValidate.validate(repurchaseInput);
      if (repurchaseInput.toUpperCase() === 'N') return;
    });

    // 추가 구매 물어보기
    await retryInput(async () => {
      await this.run();
    });
  }
}
export default App;
