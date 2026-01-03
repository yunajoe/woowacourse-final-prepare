import * as fs from 'fs';
export const readFile = filePath => {
  return fs.readFileSync(filePath, 'utf-8');
};

export const readProductsFile = () => {
  return readFile('public/products.md');
};

export const readPromotionFile = () => {
  return readFile('public/promotions.md');
};
