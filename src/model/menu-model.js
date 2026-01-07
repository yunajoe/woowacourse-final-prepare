import { Console } from '@woowacourse/mission-utils';
import { calculateBeforeDiscountTotalPrice, makeMenuObject, returnEventList, returnFreeItem } from '../utils/data-parse.js';
import OutputView from '../view/output-view.js';

// 주문한 메뉴를 저장
class MenuModel {
  constructor(day, date, menus) {
    this.day = day; // 사용자에게 받은 요일
    this.date = date; // 사용자에게 받은 날짜(1,2)...
    this.menus = menus; // 사용자에게 받은 인풋
    this.menuList = null;
    this.beforeDiscountTotalPrice = null;
    this.freeItem = null;
    this.eventObject = null;
  }

  printMenuList() {
    const result = makeMenuObject(this.menus);
    this.menuList = result;
    OutputView.printMenu(this.menuList);
  }

  printCalculateBeforeDiscountTotalPrice() {
    if (this.menuList) {
      const result = calculateBeforeDiscountTotalPrice(this.menuList);
      this.beforeDiscountTotalPrice = result;
      OutputView.printBeforeDiscountTotalPrice(this.beforeDiscountTotalPrice);
    }
  }
  printFreeMenuList() {
    const result = returnFreeItem(this.beforeDiscountTotalPrice);
    this.freeItem = result;
    OutputView.printFreeItem(this.freeItem);
  }

  printEventList() {
    const result = returnEventList(this.beforeDiscountTotalPrice, this.day, this.date, this.menuList, this.freeItem);
    this.eventObject = result;
    OutputView.printEvent(this.eventObject);
  }
  printTotalEventPrice() {
    Console.print('<총혜택 금액>');
  }
}

export default MenuModel;
