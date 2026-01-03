import { Console } from '@woowacourse/mission-utils';
import { parseProductFileData } from './utils/parse-data.js';
import { printProductsData } from './utils/print-data.js';
import { askProductNameAndCount } from './utils/read-input.js';
import { retryInput } from './utils/retry-input.js';
import ProductInputValidate from './validate/product-input-validate.js';

class App {
  async run() {
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n\n');
    const parsedData = parseProductFileData();
    printProductsData(parsedData); // 편의점 재고수량 출력

    retryInput(async () => {
      const input = await askProductNameAndCount();
      ProductInputValidate.validate(input);
    });
  }
}

export default App;

/***
 * 
 * npm run start를 하면은 아래와 같이 출력이 된다.
 * 
 *안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
 *
 *1. 구매 형식에 인풋에 안 맞으면은 ERROR 
1-1) [ ] 사이에 제품 - 수량갯수를 넣는다
1-2) 수량은 최소 1개 이상
1-3) 재고 수량은 넣으면 에러 (재고수량은 제품명이 같은 경우의 재고수량의 합을 기준으로 한다.)

 *
 *2. 구매 형식이 맞을 떄  (위에서 에러가 안 났을 떄)

 2-1)  해당 제품이 프로모션 중인지 아닌 프로모션이 아닌 것인지 확인한다 

 2-2) 프로모션이 없는 경우  (예를 들어 물)
 =>  [물-5] 라고 입력을 하면은
 =>  멤버십 할인을 받으시겠습니까? (Y/N) 라는 메시지가 출력
 =>  Y 라고 하면은  아래와 같은 메시지 출력 


==============W 편의점================
상품명              수량        금액        
물                  5           2,500       
===============증    정===============
======================================
총구매액            5           2,500 
행사할인                        -0 
멤버십할인                      -750 
내실돈                           1,750


멤버십 할인은?
- 멤버십 회원은 프로모션 미적용 금액의 30%을 할인 받는다.
- 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
- 멤버십 할인의 최대 한도는 8,000원 이다.

그 다음 
감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)


 2-3) 프로모션이 있는 경우 (예를 들어 콜라)
 => [콜라-5] 개 를 입력하면은 




 */
