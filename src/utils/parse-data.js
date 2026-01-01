import { Console } from '@woowacourse/mission-utils';

export const parseProductsData = data => {
  // /n은 과 \r\n은 줄바꿈(Linux&macOcs , windows)
  const splitRegex = /\n|\r\n/;

  // 줄바꿈으로 split과 공백
  const result = data
    .trim()
    .split(splitRegex)
    .map(line => line.trim())
    .filter(Boolean);

  // 헤더제거
  const [, ...rows] = result;
  // 정리하기
  const products = rows.map(product => {
    const [name, price, quantity, promotion] = product.split(',').map(item => item.trim());
    return {
      name,
      price: Number(price),
      quantity: Number(quantity),
      promotion: promotion === 'null' ? null : promotion,
    };
  });
  return products;
};

export const printProducts = data => {
  const grouped = {};
  const groupedResult = [];
  data.forEach(p => {
    const key = `${p.name}_${p.price}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(p);
  });
  Object.values(grouped).forEach(items => {
    items.forEach(item => {
      const { name, price, quantity, promotion } = item;
      const formattedPrice = price.toLocaleString();
      let line = `- ${name} ${formattedPrice}원`;
      if (quantity > 0) {
        line += ` ${quantity}개`;
      }
      if (promotion) {
        line += ` ${promotion}`;
      }
      groupedResult.push(line);
    });
  });
  Console.print(groupedResult.join('\n'));
};

export const parseInputData = data => {
  const [productName, productAmount] = data.replace('[', '').replace(']', '').split('-');
  return {
    productName,
    productAmount,
  };
};
