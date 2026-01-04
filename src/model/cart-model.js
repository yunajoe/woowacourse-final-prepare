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
    const existingItem = this.cartItems.find(item => item.productName === productName);
    if (existingItem) {
      existingItem.setProductCount(productCount);
      return;
    }
    this.cartItems.push(new CartItem(productName, productCount));
  }
}

export default CartModel;
