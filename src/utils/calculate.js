import { Console } from '@woowacourse/mission-utils';

const MONTH_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_DAY_HOLIDAY = [[1], [], [1], [], [5], [6], [], [15], [], [3, 9], [], [25]];
const DAY = ['월', '화', '수', '목', '금', '토', '일'];

export const calculate = (month, day, weekdayWorkers, holidayWorkers) => {
  const days = generateDailyInfo(month, day);
  const assigned = assignWorkers(days, weekdayWorkers, holidayWorkers);
  const adjusted = adjustedWorkers(assigned);
  printSchedule(month, adjusted);
};

export const generateDailyInfo = (month, day) => {
  // month = 5라고 하면은
  const result = [];
  const endDay = MONTH_DAY[month - 1]; // 31
  const startIndex = DAY.indexOf(day); // 0
  const holidays = MONTH_DAY_HOLIDAY[month - 1]; // [5]

  for (let i = 1; i <= endDay; i++) {
    const dayName = DAY[(startIndex + i - 1) % 7];
    result.push({
      day: i,
      dayName,
      isHoliday: isHoliday(dayName, holidays, i),
    });
  }
  return result;
};
export const isHoliday = (dayName, holidays, day) => {
  if (dayName === '토' || dayName === '일') return true;
  if (holidays.includes(day)) return true;
  return false;
};
export const assignWorkers = (days, weekdayWorkers, holidayWorkers) => {
  //  [{ day: 1, dayName: '월', isHoliday: false, worker:"루루" },
  //  { day: 2, dayName: '월', isHoliday: false, worker:"히히" }];
  let weekdayIndex = 0;
  let holidayIndex = 0;
  return days.map(day => {
    return {
      ...day,
      worker: day.isHoliday ? generateWorker(holidayWorkers, holidayIndex++) : generateWorker(weekdayWorkers, weekdayIndex++),
    };
  });
};
export const generateWorker = (workers, index) => {
  return workers[index % workers.length];
};

export const adjustedWorkers = schedule => {
  const result = [...schedule];
  for (let i = 1; i < result.length - 1; i++) {
    if (result[i].worker === result[i - 1].worker) {
      [result[i].worker, result[i + 1].worker] = [result[i + 1].worker, result[i].worker];
    }
  }
  return result;
};

export const printSchedule = (month, schedule) => {
  schedule.forEach(item => {
    const { day, dayName, isHoliday, worker } = item;
    const suffix = isHoliday && !['토', '일'].includes(dayName) ? '(휴일)' : '';
    Console.print(`${month}월 ${day}일 ${dayName}${suffix} ${worker}`);
  });
};
