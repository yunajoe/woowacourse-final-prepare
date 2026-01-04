class CartItem {
  constructor(productName, productCount) {
    this.productName = productName;
    this.productCount = productCount;
  }

  getProductName() {
    return this.productName;
  }
  getProductCount() {
    return this.productCount;
  }

  setProductCount(productCount) {
    this.productCount += productCount;
  }
}

export default CartItem;
