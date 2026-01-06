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
  },
};

export default OutputView;
