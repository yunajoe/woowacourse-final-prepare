class ProductModel {
  constructor(products) {
    this.products = products;
  }

  checkProduct(productName, productAmount) {
    this.checkProductName(productName);
    this.checkProductInStock(productName, productAmount);
  }
  // name이 해당 product에 있는지 확인하기
  checkProductName(productName) {
    const onlyProductNames = Array.from(
      new Set(
        this.products.flatMap(product => {
          const { name } = product;
          return name;
        }),
      ),
    );
    if (!onlyProductNames.includes(productName)) {
      throw new Error('[ERROR] 상품을 찾을 수 없습니다. 다시 입력해 주세요.');
    }
  }

  // 상품 재고 수량이 충분한지 확인하기
  checkProductInStock(productName, productAmount) {}
}

export default ProductModel;
