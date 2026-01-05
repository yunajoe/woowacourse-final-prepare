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
    this.membershipDiscount = 0; // 멤버십 할인 값
    this.payAmount = 0;
  }
  calculateProduct() {
    this.purchaseItems = [...this.nonPromotionPurchasedItems, ...this.promotionPurchasedItems];
    this.calculateNonPromotionItem();
    this.calculatePromotionItem();
    this.calculateTotalPrice();
    this.calculateTotalCount();
  }
  calculateTotalPrice() {
    this.totalPrice = this.nonPromotionPrice + this.promotionPrice;
  }
  calculateTotalCount() {
    this.totalCount = this.nonPromotionCount + this.promotionCount;
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

  calculatePromotionItem() {}
}

export default ReceiptModel;
