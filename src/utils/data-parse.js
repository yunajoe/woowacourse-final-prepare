import { MENU_DOMAIN } from '../constants/menu.js';

export const makeMenuObject = menus => {
  const arr = menus.split(',').map(item => item.trim());
  const result = arr.map(menu => {
    let menuObject = {};
    const [menuName, menuCount] = menu.split('-');
    menuObject = {
      menu: menuName,
      count: Number(menuCount),
      domain: MENU_DOMAIN[menuName].domain,
    };
    return menuObject;
  });
  return result;
};

export const calculateBeforeDiscountTotalPrice = menusList => {
  const sum = menusList.reduce((acc, item) => {
    const { menu, count } = item;
    acc += count * MENU_DOMAIN[menu].price;
    return acc;
  }, 0);
  return sum;
};

export const returnFreeItem = beforeDiscountTotalPrice => {
  if (beforeDiscountTotalPrice >= 120000) return '샴페인';
  return null;
};

const filterItems = (items, conditionFunc) => {
  return items.filter(conditionFunc);
};

const calculateTotalSpecificItem = itemsArr => {
  return itemsArr.reduce((acc, item) => {
    return (acc += item.count);
  }, 0);
};

export const returnEventList = (beforeDiscountTotalPrice, day, date, menuList, freeItems) => {
  const specialEventDays = [3, 10, 17, 24, 25, 31];
  if (beforeDiscountTotalPrice < 10000) {
    return false;
  }

  const christmasDdayEvent = 1000 + (date - 1) * 100;
  let normalDayEvent = 0;
  let holiDayEvent = 0;
  let specialDayEvent = specialEventDays.includes(Number(date)) ? 1000 : 0;
  let freeEvent = freeItems ? 25000 : 0;
  if (day === '일' || day === '월' || day === '화' || day === '수' || day === '목') {
    // 디저트 메뉴
    const onlyDessertMenuList = filterItems(menuList, menu => menu.domain === 'dessert');
    const totalDessertCount = calculateTotalSpecificItem(onlyDessertMenuList);
    normalDayEvent = totalDessertCount * 2023;
  } else if (day === '금' || day === '토') {
    // 메인 메뉴
    const onlyMainMenuList = filterItems(menuList, menu => menu.domain === 'main');
    const totalMainCount = calculateTotalSpecificItem(onlyMainMenuList);
    holiDayEvent = totalMainCount * 2023;
  }

  return {
    christmasDdayEvent,
    normalDayEvent,
    holiDayEvent,
    specialDayEvent,
    freeEvent,
  };
};
