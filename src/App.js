import InputController from './controller/input-controller.js';
import ProductModel from './model/product-model.js';
import loadData from './utils/load-data.js';
import { parseInputData, parseProductsData, printProducts } from './utils/parse-data.js';
import InputView from './view/input-view.js';
import OutputView from './view/output-view.js';
class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();
    const inputController = new InputController(inputView);
    outputView.printIntro();
    const productData = loadData('public/products.md');
    const productObject = parseProductsData(productData);
    const model = new ProductModel(productObject);
    printProducts(productObject);
    const productAndAmountInput = await inputController.readProductAndAmount();
    const { productName, productAmount } = parseInputData(productAndAmountInput);
    model.checkProduct(productName, productAmount);
  }
}

export default App;
