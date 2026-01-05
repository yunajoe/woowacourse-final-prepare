import { Console } from '@woowacourse/mission-utils';

export const printProductsData = data => {
  for (const [key, values] of Object.entries(data)) {
    values.forEach(value => {
      let line = '';
      const { name, price, count, promotion } = value;
      line = `- ${name} ${price.toLocaleString()}원 ${count}${count !== '재고 없음' ? '개' : ''} ${Boolean(promotion) ? promotion : ''}`;
      console.log(line);
    });
  }
};

export const printReceipt = (purchasedItems, totalPrice, totalCount, promotionDiscount, membershipDiscount, payAmount) => {
  const NAME_WIDTH = 18;
  const COUNT_WIDTH = 6;
  const PRICE_WIDTH = 10;
  const PADDING_WIDTH = 4;

  Console.print('============== W 편의점 ==============');
  Console.print(`${'상품명'.padEnd(NAME_WIDTH)}` + `${'수량'.padStart(COUNT_WIDTH)}` + `${'금액'.padStart(PRICE_WIDTH)}`);
  for (const item of purchasedItems) {
    const { productName, productCount, productPrice } = item;
    Console.print(`${productName.padEnd(NAME_WIDTH)}` + `${String(productCount).padStart(COUNT_WIDTH)}` + `${productPrice.toLocaleString().padStart(PRICE_WIDTH)}`);
  }
  Console.print('=============== 증    정 ===============');
  Console.print('======================================');
  Console.print(`${'총구매액'.padEnd(NAME_WIDTH + COUNT_WIDTH)}` + `${String(totalCount).padEnd(COUNT_WIDTH)}` + `${totalPrice}`);
  Console.print(`${'행사할인'.padEnd(NAME_WIDTH + COUNT_WIDTH + PADDING_WIDTH)}` + `${'-' + String(promotionDiscount)}`);
  Console.print(`${'멤버십할인'.padEnd(NAME_WIDTH + COUNT_WIDTH + PADDING_WIDTH)}` + `${'-' + String(membershipDiscount)}`);
  Console.print(`${'내실돈'.padEnd(NAME_WIDTH + COUNT_WIDTH + PADDING_WIDTH)}` + `${String(payAmount)}`);
};
