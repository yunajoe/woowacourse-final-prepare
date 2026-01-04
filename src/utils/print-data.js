import { Console } from '@woowacourse/mission-utils';

export const printProductsData = data => {
  for (const [key, values] of Object.entries(data)) {
    values.forEach(value => {
      let line = '';
      const { name, price, count, promotion } = value;
      line = `- ${name} ${price}원 ${count}개 ${Boolean(promotion) ? promotion : ''}`;
      console.log(line);
    });
  }
};

export const printReceipt = () => {
  Console.print('==============W 편의점================');
  Console.print('상품명,수량,금액');
  // 상품명, 수량, 금액
  Console.print('===============증    정===============');
  Console.print('======================================');
  Console.print('총 구매액 ');
  Console.print('행사 할인 ');
  Console.print('멤버십 할인');
  Console.print('내실돈');

  // ==============W 편의점================
  // 상품명              수량        금액
  // 물                  5           2,500
  // ===============증    정===============
  // ======================================
  // 총구매액            5           2,500
  // 행사할인                        -0
  // 멤버십할인                      -750
  // 내실돈                           1,750
};
