import { Console } from '@woowacourse/mission-utils';

export const parseMonthAndDay = workday => {
  const [month, day] = workday.split(',');
  return {
    workMonth: Number(month),
    workDay: day,
  };
};

export const parseWeekdayWorkers = workers => {
  const arr = workers.split(',').map(worker => worker.trim());
  return arr;
};

export const parseHolidayWorkers = workers => {
  const arr = workers.split(',').map(worker => worker.trim());
  return arr;
};

const MONTH_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAY = ['월', '화', '수', '목', '금', '토', '일'];
const MONTH_DAY_HOLIDAY = [[1], [], [1], [], [5], [6], [], [15], [], [3, 9], [], [25]];

export const calculate = (workMonth, workDay, weekdayWorker, holidayWorker) => {
  const finalWorkNameList = [];
  const finalWorkDayList = [];
  const endDays = MONTH_DAY[workMonth - 1]; // 해당 월의 마지막 일 =>  31
  const thisMonthHolidays = MONTH_DAY_HOLIDAY[workMonth - 1]; // [5]
  const standardIndex = DAY.indexOf(workDay);
  let weekdayWorkerIndex = 0;
  let holidayWorkerIndex = 0;

  for (let i = 1; i <= endDays; i++) {
    const dayName = DAY[(standardIndex + i - 1) % 7];
    // true를 만족할 조건 => 평일이면서(토, 일 X)  해당 월에 포함이 되어 잇어야 한다.
    let isNormalHoliday = false;
    if (thisMonthHolidays.includes(i) && (dayName !== '토' || dayName == '일')) {
      isNormalHoliday = true;
    }
    let onDayWorkerName = '';
    // 주말이거나 평일(휴일) 일 경우
    if (isNormalHoliday || dayName === '토' || dayName === '일') {
      onDayWorkerName = holidayWorker[holidayWorkerIndex];
      holidayWorkerIndex++;
      holidayWorkerIndex = holidayWorkerIndex % holidayWorker.length;
    } else {
      onDayWorkerName = weekdayWorker[weekdayWorkerIndex];
      weekdayWorkerIndex++;
      weekdayWorkerIndex = weekdayWorkerIndex % weekdayWorker.length;
    }

    const finalDayName = `${dayName}${isNormalHoliday ? '(휴일)' : ''}`;
    finalWorkNameList.push(onDayWorkerName);
    finalWorkDayList.push(finalDayName);

    let temp = `${workMonth}월 ${i}일 ${finalDayName}${onDayWorkerName}`;
    // console.log(temp);
    // holiday worker는 토, 일, 혹은 isNormalHoliday = true인 경우
    isNormalHoliday = false;
  }

  // console.log('firstNameList ===>', firstNameList);
  // 이전값과 현재값이 같다면은 현재값과 현재값의 그 다음 값을 swap
  for (let i = 0; i < finalWorkNameList.length - 1; i++) {
    const value = finalWorkNameList[i];
    if (i > 0) {
      const prevValue = finalWorkNameList[i - 1];
      if (prevValue === value) {
        [finalWorkNameList[i], finalWorkNameList[i + 1]] = [finalWorkNameList[i + 1], finalWorkNameList[i]];
      }
    }
  }

  for (let i = 1; i <= endDays; i++) {
    const onDayWorkerName = finalWorkNameList[i - 1];
    const finalDayName = finalWorkDayList[i - 1];
    let temp = `${workMonth}월 ${i}일 ${finalDayName} ${onDayWorkerName}`;
    Console.print(temp);
  }
};
