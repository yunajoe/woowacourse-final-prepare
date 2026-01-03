import { readProductsFile, readPromotionFile } from './read-file.js';

export const parseProductFileData = () => {
  const data = readProductsFile();
  const rows = removeColumns(data);
  const productObject = makeProductObject(rows);
  return productObject;
};

export const parsePromotionFileData = () => {
  const data = readPromotionFile();
  const rows = removeColumns(data);
  const promotionObject = makePromotionObject(rows);
  return promotionObject;
};

// column을 지우고 오직 rows 데이터만 return
const removeColumns = data => {
  const [, ...rows] = data.split('\n');
  return rows.filter(item => item);
};

// {"콜라":[{name:콜라, price:1000, count:10, promotion:...}, {}], "사이다":[]}
const makeProductObject = rows => {
  const productObject = {};
  rows.forEach(row => {
    const [name, price, count, promotion] = row.split(',').map(item => item.trim());
    if (!productObject[name]) {
      productObject[name] = [];
    }
    productObject[name].push({
      name,
      price: Number(price),
      count: Number(count),
      promotion: promotion === 'null' ? false : promotion,
    });
  });
  return productObject;
};

const makePromotionObject = rows => {
  const promotionObject = {};
  rows.forEach(row => {
    const [promotion, buy, get, startDate, endDate] = row.split(',').map(item => item.trim());
    if (!promotionObject[promotion]) {
      promotionObject[promotion] = {};
    }
    promotionObject[promotion] = {
      promotion,
      buy: Number(buy),
      get: Number(get),
      startDate: startDate,
      endDate: endDate,
    };
  });
  return promotionObject;
};
export const parseProductInputData = input => {
  const [productName, productCount] = input.replace('[', '').replace(']', '').split('-');
  return {
    productName,
    productCount: Number(productCount),
  };
};
