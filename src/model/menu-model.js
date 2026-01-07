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
    this.totalEventPrice = null;
    this.afterDiscountTotalPrice = null;
    this.badge = null;
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
    if (!this.eventObject) {
      this.totalEventPrice = 0;
    } else {
      const { christmasDdayEvent, normalDayEvent, holiDayEvent, specialDayEvent, freeEvent } = this.eventObject;
      let sum = christmasDdayEvent + normalDayEvent + holiDayEvent + specialDayEvent + freeEvent;
      this.totalEventPrice = sum;
    }

    Console.print(`${this.totalEventPrice !== 0 ? '-' : ''}${this.totalEventPrice.toLocaleString()}원`);
    Console.print('\n');
  }

  printCalculateAfterDiscountTotalPrice() {
    Console.print('<할인 후 예상 결제 금액>');
    if (this.totalEventPrice === 0) {
      this.afterDiscountTotalPrice = 0;
    } else {
      this.afterDiscountTotalPrice = this.beforeDiscountTotalPrice - this.totalEventPrice + 25000;
    }
    Console.print(`${this.afterDiscountTotalPrice.toLocaleString()}원`);
    Console.print('\n');
  }
  printEventBadge() {
    Console.print('<12월 이벤트 배지>');
    let badge = null;
    if (this.totalEventPrice >= 5000) {
      badge = '별';
    } else if (this.totalEventPrice >= 10000) {
      badge = '트리';
    } else {
      badge = '산타';
    }
    this.badge = badge;
    Console.print(this.badge ?? '없음');
  }
}

export default MenuModel;
