import { MissionUtils } from '@woowacourse/mission-utils';
import { FoodCategory } from '../constants/food-category.js';

export const parseCSVData = data => {
  const splitData = data.split('\n');
  const [, ...rows] = splitData;
  const categoryObject = {};
  rows.forEach(row => {
    const [category, menu] = row.split(',');
    const trimmedCategory = category.trim();
    if (!trimmedCategory) return;
    if (!categoryObject[trimmedCategory]) {
      categoryObject[trimmedCategory] = [];
    }
    categoryObject[trimmedCategory].push(menu);
  });
  return categoryObject;
};

export const parseDataList = datas => {
  return datas.split(',').map(data => data.trim());
};

export const parseFoodCategory = () => {
  let cateGoryNums;
  while (true) {
    cateGoryNums = [];
    for (let i = 0; i < 5; i++) {
      const num = MissionUtils.Random.pickNumberInRange(1, 5);
      cateGoryNums.push(num);
    }
    const result = checkCategoryCount(cateGoryNums);
    if (result) break;
  }

  return cateGoryNums;
};

export const checkCategoryCount = numsArr => {
  const map = new Map();
  for (const num of numsArr) {
    if (!map.has(num)) {
      map.set(num, 1);
    } else {
      const value = map.get(num);
      if (value >= 2) return false;
      map.set(num, value + 1);
    }
  }
  return true;
};

export const returnDayName = numsArr => {
  const dayNameObject = {};
  const days = ['월', '화', '수', '목', '금'];
  numsArr.forEach((num, index) => {
    dayNameObject[days[index]] = FoodCategory[num];
  });
  return dayNameObject;
};
