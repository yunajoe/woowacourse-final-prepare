import { generateDailyInfo } from '../src/utils/calculate.js';
test('month 5, start day 월일 때 day 1 확인', () => {
  const result = generateDailyInfo(5, '월');

  // day 1 검증
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        day: 1,
        dayName: '월',
        isHoliday: false,
      }),
    ]),
  );
});

describe('generateDailyInfo', () => {
  test.each([
    [4, '토', 1, '토', true],
    [4, '토', 2, '일', true],
    [4, '토', 3, '월', false],
  ])('%i월 %i일은 %s이고 휴일=%s', (month, startDay, date, expectedDay, expectedHoliday) => {
    const days = generateDailyInfo(month, startDay);
    expect(days[date - 1].dayName).toBe(expectedDay);
    expect(days[date - 1].isHoliday).toBe(expectedHoliday);
  });
});

import { assignWorkers } from '../src/utils/calculate.js';

describe('assignWorkers', () => {
  test.each([
    [
      [
        { day: 1, isHoliday: false },
        { day: 2, isHoliday: true },
      ],
      ['A', 'B'],
      ['X'],
      ['A', 'X'],
    ],
    [
      [
        { day: 1, isHoliday: false },
        { day: 2, isHoliday: false },
      ],
      ['A'],
      ['X'],
      ['A', 'A'],
    ],
  ])('근무자 배정 테스트', (days, weekdayWorkers, holidayWorkers, expected) => {
    const result = assignWorkers(days, weekdayWorkers, holidayWorkers);
    expect(result.map(d => d.worker)).toEqual(expected);
  });
});

import { calculate } from '../src/utils/calculate.js';

describe('calculate', () => {
  test.each([
    [1, '월', 31],
    [4, '토', 30],
  ])('%i월은 %i일이다', (month, startDay, expectedLength) => {
    const result = calculate(month, startDay, ['A', 'B', 'C', 'D', 'E'], ['X', 'Y', 'Z', 'W', 'Q']);

    expect(result).toHaveLength(expectedLength);
  });
});
