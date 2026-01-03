import WorkerModel from './model/worker-model.js';
import { askHoliDayWorkers, askWeekDayWorkers, askWorkMonthAndDay } from './utils/read-input.js';
import { retryInput } from './utils/retry-input.js';
import WorkMonthDayInputValidate from './validate/work-month-day-input-validate.js';
import WorkerListInputValidate from './validate/worker-list-input-validate.js';
class App {
  async run() {
    const workerModel = new WorkerModel();
    // 월과 요일 입력
    await retryInput(async () => {
      const input = await askWorkMonthAndDay();
      const trimmedInput = input.trim();
      WorkMonthDayInputValidate.validate(trimmedInput);
      workerModel.setWorkDay(trimmedInput);
    });

    // 평일 / 휴일 근무자 입력
    await retryInput(async () => {
      // 평일 근무자 입력
      const weekdayInput = await askWeekDayWorkers();
      const trimmedWeekDayInput = weekdayInput.trim();
      WorkerListInputValidate.validate(trimmedWeekDayInput);
      workerModel.setWeekDayWorkers(trimmedWeekDayInput);

      // 휴일 근무자 입력
      const holidayInput = await askHoliDayWorkers();
      const trimmedHolidayInput = holidayInput.trim();
      WorkerListInputValidate.validate(trimmedHolidayInput);
      workerModel.setHoliDayWorkers(trimmedHolidayInput);
    });

    // 출력
    workerModel.printWorkSchedule();
  }
}

export default App;
