import { Console } from '@woowacourse/mission-utils';
import WorkerModel from './model/worker-model.js';
import { askHoliDayWorkers, askWeekDayWorkers, askWorkMonthAndDay } from './utils/read-input.js';
import HolidayDayInputValidate from './validate/holiday-input-validate.js';
import WeekDayInputValidate from './validate/week-day-input-validate.js';
import WorkMonthDayInputValidate from './validate/work-month-day-input-validate.js';

class App {
  async run() {
    const workerModel = new WorkerModel();
    // 월과 요일
    while (true) {
      try {
        const input1 = await askWorkMonthAndDay();
        const trimmedInput1 = input1.trim();
        WorkMonthDayInputValidate.validate(trimmedInput1);
        workerModel.setWorkDay(trimmedInput1);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    // 근무 사원
    while (true) {
      try {
        const input2 = await askWeekDayWorkers();
        const trimmedInput2 = input2.trim();
        WeekDayInputValidate.validate(trimmedInput2);
        workerModel.setWeekDayWorkers(trimmedInput2);
        const input3 = await askHoliDayWorkers();
        const trimmedInput3 = input3.trim();
        HolidayDayInputValidate.validate(trimmedInput3);
        workerModel.setHoliDayWorkers(trimmedInput3);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    // 출력
    workerModel.printWorkSchedule();
  }
}

export default App;
