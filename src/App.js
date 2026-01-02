import { Console } from '@woowacourse/mission-utils';
import { askWorkMonthAndDay } from './utils/read-input.js';
import WorkMonthDayInputValidate from './validate/work-month-day-input-validate.js';

class App {
  async run() {
    while (true) {
      try {
        const input1 = await askWorkMonthAndDay();
        console.log('input1===>', input1);
        WorkMonthDayInputValidate.validate(input1);
        // 정상이면은 break
        // error로 내려가면은 무한루프~
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default App;
