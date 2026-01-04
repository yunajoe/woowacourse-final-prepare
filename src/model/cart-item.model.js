class CartItem {
  constructor(productName, productCount) {
    this.productName = productName;
    this.productCount = productCount;
    this.promotionQuantity = 0;
  }

  getProductName() {
    return this.productName;
  }
  getProductCount() {
    return this.productCount;
  }
  getPromotionQuantity() {
    this.promotionQuantity;
  }

  setProductCount(productCount) {
    this.productCount += productCount;
  }
  setPromotionQuantity(promotionQuantity) {
    this.promotionQuantity += promotionQuantity;
  }
}

export default CartItem;

//   getNonPromotionQuantity() {
//     return this.#quantity - this.#promotionQuantity;
//   }

// export default CartItem;
