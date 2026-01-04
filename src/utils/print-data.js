import { Console } from '@woowacourse/mission-utils';

export const printProductsData = data => {
  for (const [key, values] of Object.entries(data)) {
    values.forEach(value => {
      let line = '';
      const { name, price, count, promotion } = value;
      line = `- ${name} ${price}원 ${count}개 ${Boolean(promotion) ? promotion : ''}`;
      console.log(line);
    });
  }
};

export const printReceipt = (purchasedItems, totalPrice) => {
  const NAME_WIDTH = 18;
  const COUNT_WIDTH = 6;
  const PRICE_WIDTH = 10;
  Console.print('============== W 편의점 ==============');
  Console.print(`${'상품명'.padEnd(NAME_WIDTH)}` + `${'수량'.padStart(COUNT_WIDTH)}` + `${'금액'.padStart(PRICE_WIDTH)}`);
  for (const item of purchasedItems) {
    const { productName, productCount, productPrice } = item;
    Console.print(`${productName.padEnd(NAME_WIDTH)}` + `${String(productCount).padStart(COUNT_WIDTH)}` + `${productPrice.toLocaleString().padStart(PRICE_WIDTH)}`);
  }
  Console.print('=============== 증    정 ===============');
  Console.print('======================================');
  Console.print(`${'총구매역'.padEnd(NAME_WIDTH + COUNT_WIDTH)}${totalPrice}`);
  Console.print('행사 할인 ');
  Console.print('멤버십 할인');
  Console.print('내실돈');

  // ==============W 편의점================
  // 상품명              수량        금액
  // 물                  3           1,500
  // 비타민워터          3           4,500
  // ===============증    정===============
  // ======================================
  // 총구매액            5           2,500
  // 행사할인                        -0
  // 멤버십할인                      -750
  // 내실돈                           1,750

  //   =============W 편의점================
  // 상품명              수량        금액
  // 물                  3           1,500
  // 컵라면              1           1,700
  // ===============증    정===============
  // ======================================
  // 총구매액            4           3,200
  // 행사할인                        -0
  // 멤버십할인                      -960
  // 내실돈                           2,240
};
