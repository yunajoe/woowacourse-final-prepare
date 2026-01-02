import { Console } from '@woowacourse/mission-utils';
import { askHoliDayWorkers, askWeekDayWorkers, askWorkMonthAndDay } from './utils/read-input.js';
import HolidayDayInputValidate from './validate/holiday-input-validate.js';
import WeekDayInputValidate from './validate/week-day-input-validate.js';
import WorkMonthDayInputValidate from './validate/work-month-day-input-validate.js';

class App {
  async run() {
    while (true) {
      try {
        const input1 = await askWorkMonthAndDay();
        console.log('월과 요일 인풋 ===>', input1);
        WorkMonthDayInputValidate.validate(input1);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    while (true) {
      try {
        const input2 = await askWeekDayWorkers();
        console.log('평일 근무 사원 인풋===>', input2);
        WeekDayInputValidate.validate(input2);
        const input3 = await askHoliDayWorkers();
        console.log('휴일 근무 사원 인풋===>', input3);
        HolidayDayInputValidate.validate(input3);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default App;
