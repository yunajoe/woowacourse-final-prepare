class ReceiptModel {
  constructor() {
    this.purchaseItems = []; // {상품명, 수량, 금액}
    this.totalPrice = 0; // purchasedItem의 합
    this.promotionDiscount = 0;
    this.membershipDiscount = 0;
    this.payAmount = 0;
  }
  calculateTotalPrice() {
    const sum = this.purchaseItems.reduce((acc, item) => {
      acc += item.productPrice;
      return acc;
    }, 0);
    this.totalPrice = sum;
  }
  calculateNonPromotionItem(productInfo, cartItem) {
    const price = productInfo.price * cartItem.productCount;
    const itemObject = { productName: cartItem.productName, productCount: cartItem.productCount, productPrice: price };
    this.purchaseItems.push(itemObject);
  }
}

export default ReceiptModel;
