import CartItem from './cart-item.model.js';

class CartModel {
  constructor() {
    this.cartItems = [];
  }

  addItemToCart(items) {
    items.forEach(item => {
      const { productName, productCount } = item;
      this.addItem(productName, productCount);
    });
  }
  addItem(productName, productCount) {
    // 기존에 카트에 있을시 즉, {productName: 사이다, count:2},{productName: 사이다, count:2},
    const existingItem = this.cartItems.find(item => item.productName === productName);
    if (existingItem) {
      existingItem.setProductCount(productCount);
      return;
    }
    this.cartItems.push(new CartItem(productName, productCount));
  }
}

export default CartModel;
