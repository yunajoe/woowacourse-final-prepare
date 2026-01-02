import { MissionUtils } from '@woowacourse/mission-utils';
import { printOutput } from './print-output.js';

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

export const groupingData = data => {
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.name]) {
      grouped[item.name] = [];
    }
    grouped[item.name].push(item);
  });
  return grouped;
};

export const printProducts = data => {
  const groupedResult = [];
  const grouped = groupingData(data);

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
  printOutput(groupedResult.join('\n'));
};

// promotion data
export const parsePromotionData = data => {
  const regex = /\n|\r\n/;
  const result = data.trim().split(regex);
  const [, ...rows] = result;
  const promotionObject = {};
  rows.forEach(item => {
    const [key, buy, get, startDate, endDate] = item.split(',').map(item => item.trim());
    promotionObject[key] = {
      promotionName: key,
      buy: Number(buy),
      get: Number(get),
      startDate,
      endDate,
    };
  });
  return promotionObject;
};

// export const returnToday = () => {
//   const dateTime = MissionUtils.DateTimes.now();
//   const formattedDate = new Date(dateTime);
//   return {
//     year: formattedDate.getFullYear(),
//     month: formattedDate.getMonth() + 1,
//     day: formattedDate.getDate(),
//   };
// };

export const IsDateInPromotionDate = (startDate, endDate) => {
  const dateTime = MissionUtils.DateTimes.now();
  const today = new Date(dateTime);
  return today >= new Date(startDate) && today <= new Date(endDate);
};
