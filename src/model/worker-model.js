// 평일과 휴일 비상근무 자들을 저장해 놓는 모델
// “상태 관리 + 위임”
/**
 * 
 * ✔ Model은 데이터만 관리
 ✔ 계산 로직 은 하지 않기
 * 
 */
import { calculate } from '../utils/calculate.js';
import { parseMonthAndDay, parseWorkers } from '../utils/parse-data.js';

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
    const weekdayWorkers = parseWorkers(this.weekdayWorker);
    const holidayWorkers = parseWorkers(this.holidayWorker);
    calculate(workMonth, workDay, weekdayWorkers, holidayWorkers);
  }
}

export default WorkerModel;
