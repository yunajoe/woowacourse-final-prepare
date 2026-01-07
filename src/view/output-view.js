import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printIntroduce() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n');
  },
  printEventIntro(day) {
    Console.print(`12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },
  printMenu(menuList) {
    Console.print('<주문 메뉴>');
    menuList.forEach(item => {
      const { menu, count } = item;
      Console.print(`${menu} ${count}개`);
    });
    Console.print('\n');
  },
  printBeforeDiscountTotalPrice(totalPrice) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(totalPrice.toLocaleString());
    Console.print('\n');
  },
  printFreeItem(freeItem) {
    Console.print('<증정 메뉴>');
    Console.print(`${freeItem ? freeItem : '없음'}`);
    Console.print('\n');
  },
  printEvent(result) {
    Console.print('<혜택 내역>');
    if (!result) {
      Console.print('없음');
    } else {
      const { christmasDdayEvent, normalDayEvent, holiDayEvent, specialDayEvent, freeEvent } = result;
      Console.print(`크리스마스 디데이 할인: -${christmasDdayEvent.toLocaleString()}원`);
      normalDayEvent && Console.print(`평일 할인: -${normalDayEvent.toLocaleString()}`);
      holiDayEvent && Console.print(`주말 할인: -${holiDayEvent.toLocaleString()}원`);
      Console.print(`특별 할인: -${specialDayEvent.toLocaleString()}원`);
      Console.print(`증정 이벤트: -${freeEvent.toLocaleString()}원`);
    }

    Console.print('\n');
  },
};

export default OutputView;
