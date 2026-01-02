import { Console } from '@woowacourse/mission-utils';
import InputController from './controller/input-controller.js';
import ProductModel from './model/product-model.js';
import loadData from './utils/load-data.js';
import { parseProductsData, printProducts } from './utils/parse-data.js';
import { printIntroduceConvenience } from './utils/print-output.js';
class App {
  async run() {
    printIntroduceConvenience(); // 인사말 출력
    const inputController = new InputController();
    const productData = loadData('public/products.md');
    const productObject = parseProductsData(productData);
    const model = new ProductModel(productObject);

    printProducts(productObject); // 편의점 상품 출력

    // 오류가 날시 입력 계속하여 받기
    //  재고 확인 및 구매
    while (true) {
      try {
        // 상품 입력
        const productInput = await inputController.readProductInput();
        const parsedProductInput = inputController.parseProductInput(productInput); // { productName: '사이다', productAmount: 2 }
        model.checkProducts(parsedProductInput);
        model.purchaseProducts(parsedProductInput);
        break;
      } catch (error) {
        Console.print(error);
      }
    }

    // // 멤버십 할인 여부
    // const isMember = await inputController.askMembership();

    // // 영수증 출력
    // model.checkout(isMember);
  }
}

export default App;
