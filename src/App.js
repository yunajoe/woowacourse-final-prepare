import MenuModel from './model/menu-model.js';
import { returnDay } from './utils/calendar.js';
import { retryInput } from './utils/retry-input.js';
import MenuInputValidate from './validate/menu-input-validate.js';
import VisitDateInputValidate from './validate/visit-date-input-validate.js';
import { default as InputView } from './view/input-view.js';
import OutputView from './view/output-view.js';

class App {
  async run() {
    OutputView.printIntroduce();
    // 요일
    const date = await retryInput(async () => {
      const input = await InputView.readDate();
      const trimmedInput = input.trim();
      VisitDateInputValidate.validate(trimmedInput);
      return trimmedInput;
    });
    const day = returnDay(Number(date)); // 월,화...

    // 메뉴
    const menus = await retryInput(async () => {
      const input = await InputView.readMenuAndCount();
      const trimmedInput = input.trim();
      MenuInputValidate.validate(trimmedInput);
      return trimmedInput;
    });
    OutputView.printEventIntro(date);

    const menuModel = new MenuModel(menus);
    menuModel.printMenuList();
  }
}

export default App;
