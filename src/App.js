import { Console } from '@woowacourse/mission-utils';
import LunchMenuModel from './model/lunch-menu-model.js';
import { parseCSVData } from './utils/parse-data.js';
import { readFile } from './utils/read-file.js';
import { retryInput } from './utils/retry-input.js';
import CoachNameValidate from './validate/coach-name-validate.js';
import InputView from './view/input-view.js';

class App {
  async run() {
    const lunchMenuModel = new LunchMenuModel();
    const fileData = readFile('public/menu.csv');
    const parseObject = parseCSVData(fileData);
    // coach name 이름 받기
    const namesInput = await retryInput(async () => {
      const input = await InputView.readCoachNames();
      const trimmedInput = input.trim();
      CoachNameValidate.validate(trimmedInput);
      return trimmedInput; // 토미,제임스,포코
    });

    // coach names input 저장
    lunchMenuModel.getCoachNameList(namesInput);

    await lunchMenuModel.getNonMenuRecommandList();

    Console.print('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
    lunchMenuModel.getFoodCategoryList(); // 카테고리
    lunchMenuModel.getMenuRecommandList(parseObject); // 각 사람한테 메뉴추천
  }
}

export default App;
