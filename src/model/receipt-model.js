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
    console.log('총 가격을 계산해유 ----->', this.nonPromotionPrice + this.promotionPrice);
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

  async createPromotionItem(productInfo, promotionInfo, cartItem) {
    // console.log('프로모션 아이템', productInfo, promotionInfo, cartItem);
    const { buy, get } = promotionInfo;
    const requestCount = cartItem.productCount;
    const totalPrice = productInfo.price * requestCount;
    const promotionUnit = buy + get;
    let freeCount = 0; // 무료 증정 제품 갯수
    let promotionCount = 0;
    const divideValue = requestCount % promotionUnit;
    if (requestCount < buy) {
      console.log('요청한것이 최소 요구 사항보다 작다', requestCount);
      promotionCount = requestCount;
    } else if (divideValue === 0) {
      console.log('요청한것이 딱 떨어진당!');
      // promotionCount = requestCount / promotionUnit;
    } else if (divideValue !== 0) {
      console.log('요청한것이 딱 떨어지지 않는당!');
      // const quote = Math.floor(requestCount / promotionUnit);
      // const residual = requestCount - quote * unit;
      // if (residual === buy) {
      //   const response = await retryInput(async () => {
      //     const input = await askPromotionFreeItems();
      //     RepurchaseInputValidate.validate(input);
      //     return input.toUpperCase();
      //   });
      //   if (response === 'Y') {
      //     promotionCount = quote + get;
      //   } else {
      //     promotionCount = quote;
      //   }
      // } else if (residual < buy) {
      //   Console.print(`현재 콜라 ${get}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N))`);
      //   if (응답 === yes) {
      //     promotion = quote;
      //     count;
      //   } else {
      //   }
      // }
    }
    const itemObject = { productName: cartItem.productName, productCount: cartItem.productCount - promotionCount, productPrice: totalPrice, promotionCount: promotionCount };
    this.promotionPurchasedItems.push(itemObject);
  }

  // [{productName:물, productCount: 4, productPrice: }]
  createNonPromotionItem(productInfo, cartItem) {
    const price = productInfo.price * cartItem.productCount;
    const itemObject = { productName: cartItem.productName, productCount: cartItem.productCount, productPrice: price, promotionCount: 0 };
    this.nonPromotionPurchasedItems.push(itemObject);
  }

  // 비 프로모션의 총 합과, 총 갯수 return
  calculateNonPromotionItem() {
    const result = this.nonPromotionPurchasedItems.reduce(
      (acc, { productCount, productPrice }) => {
        acc['totalCount'] += productCount;
        acc['totalPrice'] += productPrice;
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
  calculatePromotionItem() {
    const result = this.promotionPurchasedItems.reduce(
      (acc, { productCount, productPrice }) => {
        acc['totalCount'] += productCount;
        acc['totalPrice'] += productPrice;
        return acc;
      },
      {
        totalCount: 0,
        totalPrice: 0,
      },
    );
    this.promotionPrice = result.totalPrice;
    this.promotionCount = result.totalCount;
  }

  setReset() {
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
}

export default ReceiptModel;
