import { readProductsFile } from './read-file.js';

export const parseProductFileData = () => {
  const data = readProductsFile();
  const rows = removeColumns(data);
  const productObject = makeKeyObject(rows);
  return productObject;
};

// column을 지우고 오직 rows 데이터만 return
const removeColumns = data => {
  const [, ...rows] = data.split('\n');
  return rows.filter(item => item);
};

// {"콜라":[{name:콜라, price:1000, count:10, promotion:...}, {}], "사이다":[]}
const makeKeyObject = rows => {
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
      promotion: promotion === 'null' ? '' : promotion,
    });
  });
  return productObject;
};

export const parseProductInputData = input => {
  const [productName, productCount] = input.replace('[', '').replace(']', '').split('-');
  return {
    productName,
    productCount: Number(productCount),
  };
};
