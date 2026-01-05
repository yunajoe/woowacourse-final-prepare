class ReceiptModel {
  constructor() {
    this.purchaseItems = []; // {상품명, 수량, 금액}
    this.nonPromotionPurchasedItems = []; //  { productName: '물', productCount: 3, productPrice: 1500 },
    this.promotionPurchasedItems = [];
    this.totalPrice = 0; // 프로모션 + 비프로모션 상품의 총 가격
    this.totalCount = 0; // 프로모션 + 비프로모션 상품의 총 갯수
    this.nonPromotionPrice = 0; //  비프로모션 상품의 총 가격
    this.nonPromotionCount = 0; // /  비프로모션 상품의 총 갯수
    this.promotionPrice = 0; //  비프로모션 상품의 총 가격
    this.promotionCount = 0; // /  비프로모션 상품의 총 갯수
    this.promotionDiscount = 0; // 행사 할인 값
    this.memberShipInput = 'N';
    this.membershipDiscount = 0; // 멤버십 할인 값
    this.payAmount = 0; // 지불해야할 돈
  }
  calculateProduct() {
    this.purchaseItems = [...this.nonPromotionPurchasedItems, ...this.promotionPurchasedItems];
    this.calculateNonPromotionItem(); // 비프로모션 계산
    this.calculatePromotionItem(); // 프로모션 계산
    this.calculateMembershipDiscount(this.memberShipInput); // 멤버십 계산
    this.calculateTotalPrice(); // 총 가격 계산
    this.calculateTotalCount(); // 총 갯수 계산
    this.calculatePayment(); // 지불해야 할 돈 계산
  }

  calculateTotalPrice() {
    this.totalPrice = this.nonPromotionPrice + this.promotionPrice;
  }
  calculateTotalCount() {
    this.totalCount = this.nonPromotionCount + this.promotionCount;
  }

  calculatePayment() {
    this.payAmount = this.totalPrice - this.promotionDiscount - this.membershipDiscount;
  }

  // 멤버신 계산 . 멤버신 계산은 비 프로모션 합계의 30%
  calculateMembershipDiscount(input) {
    if (input.toUpperCase() === 'Y') {
      this.membershipDiscount = Math.min(this.nonPromotionPrice * 0.3, 8000);
    }
  }

  createNonPromotionItem(productInfo, cartItem) {
    const price = productInfo.price * cartItem.productCount;
    const itemObject = { productName: cartItem.productName, productCount: cartItem.productCount, productPrice: price };
    this.nonPromotionPurchasedItems.push(itemObject);
  }

  // 비 프로모션의 총 합과, 총 갯수 return
  calculateNonPromotionItem() {
    const result = this.nonPromotionPurchasedItems.reduce(
      (acc, { productCount, productPrice }) => {
        acc['totalCount'] += productCount;
        acc['totalPrice'] += productPrice * productCount;
        return acc;
      },
      {
        totalCount: 0,
        totalPrice: 0,
      },
    );
    this.nonPromotionPrice = result.totalPrice;
    this.nonPromotionCount = result.totalCount;
  }

  // 프로모션 총 합과 , 총 갯수 return
  calculatePromotionItem() {}
}

export default ReceiptModel;
