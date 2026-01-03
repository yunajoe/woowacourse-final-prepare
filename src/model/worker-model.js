// 평일과 휴일 비상근무 자들을 저장해 놓는 모델

import { calculate, parseHolidayWorkers, parseMonthAndDay, parseWeekdayWorkers } from '../utils/parse-data.js';

class WorkerModel {
  constructor() {
    this.workday = null;
    this.weekdayWorker = null;
    this.holidayWorker = null;
  }

  setWorkDay(workday) {
    this.workday = workday;
  }

  setWeekDayWorkers(workers) {
    this.weekdayWorker = workers;
  }

  setHoliDayWorkers(workers) {
    this.holidayWorker = workers;
  }

  printWorkSchedule() {
    const { workMonth, workDay } = parseMonthAndDay(this.workday);
    const weekdayWorkers = parseWeekdayWorkers(this.weekdayWorker);
    const holidayWorkers = parseHolidayWorkers(this.holidayWorker);
    calculate(workMonth, workDay, weekdayWorkers, holidayWorkers);
  }
}

export default WorkerModel;
