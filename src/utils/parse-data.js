import { readProductsFile, readPromotionFile } from './read-file.js';

export const parseProductFileData = () => {
  const data = readProductsFile();
  const rows = removeColumns(data);
  const productObject = makeProductObject(rows);
  const finalproductObject = makeFinalProductFinalObject(productObject);
  return finalproductObject;
};

export const parseProductWithPromotionFileData = () => {
  const data = readProductsFile();
  const rows = removeColumns(data);
  const object = makeProductWithPromotionObject(rows);
  return object;
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

const makeProductWithPromotionObject = rows => {
  const productPromotionObject = {};
  rows.forEach(row => {
    const [name, price, count, promotion] = row.split(',').map(item => item.trim());
    if (!productPromotionObject[name]) {
      productPromotionObject[name] = {
        name,
        price: 0,
        count: 0,
        promotionCount: 0,
        promotion: null,
      };
    }
    const current = productPromotionObject[name];
    productPromotionObject[name] = {
      ...current,
      price: Number(price),
      count: promotion === 'null' ? current.count + Number(count) : current.count,
      promotionCount: promotion !== 'null' ? current.promotionCount + Number(count) : current.promotionCount,
      promotion: promotion !== 'null' ? promotion : current.promotion,
    };
  });
  return productPromotionObject;
};

const makeFinalProductFinalObject = productObject => {
  const copyProductObject = { ...productObject };
  Object.values(copyProductObject).forEach(item => {
    if (item.length < 2) {
      const obj = item[0];
      if (obj.promotion) {
        copyProductObject[obj.name].push({
          ...obj,
          count: '재고 없음',
          promotion: false,
        });
      }
    }
  });
  return copyProductObject;
};

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

export const finalParseProductInputData = inputs => {
  return inputs.split(',').map(input => {
    const [productName, productCount] = input.replace('[', '').replace(']', '').split('-');
    return {
      productName,
      productCount: Number(productCount),
    };
  });
};
