const NAME_WIDTH = 16;
const COUNT_WIDTH = 6;
const PRICE_WIDTH = 10;

export const printReceipt = purchasedItems => {
  Console.print('============== W 편의점 ==============');
  Console.print(`${'상품명'.padEnd(NAME_WIDTH)}${'수량'.padStart(COUNT_WIDTH)}${'금액'.padStart(PRICE_WIDTH)}`);

  for (const item of purchasedItems) {
    const { productName, productCount, productPrice } = item;

    Console.print(`${productName.padEnd(NAME_WIDTH)}` + `${String(productCount).padStart(COUNT_WIDTH)}` + `${productPrice.toLocaleString().padStart(PRICE_WIDTH)}`);
  }

  Console.print('=============== 증    정 ===============');
  Console.print('======================================');

  Console.print(`${'총구매액'.padEnd(NAME_WIDTH)}${'5'.padStart(COUNT_WIDTH)}${'2,500'.padStart(PRICE_WIDTH)}`);
  Console.print(`${'행사할인'.padEnd(NAME_WIDTH + COUNT_WIDTH)}${'-0'.padStart(PRICE_WIDTH)}`);
  Console.print(`${'멤버십할인'.padEnd(NAME_WIDTH + COUNT_WIDTH)}${'-750'.padStart(PRICE_WIDTH)}`);
  Console.print(`${'내실돈'.padEnd(NAME_WIDTH + COUNT_WIDTH)}${'1,750'.padStart(PRICE_WIDTH)}`);
};
