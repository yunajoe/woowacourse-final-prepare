import { adjustedWorkers, assignWorkers, generateDailyInfo, isHoliday } from '../src/utils/calculate.js';

describe('근무 스케줄 도메인 로직 테스트', () => {
  describe('isHoliday 함수', () => {
    test.each([
      ['토', [], 1, true],
      ['일', [], 1, true],
    ])('요일=%s, 공휴일=%p, 날짜=%d, 휴일여부=%s', (dayName, holidays, day, expected) => {
      expect(isHoliday(dayName, holidays, day)).toBe(expected);
    });
  });
  describe('generateDailyInfo 함수', () => {
    test('month 5, day 월 일떄 테스팅 하기', () => {
      const result = generateDailyInfo(5, '월');
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
    test('month 5, day 월 일떄 테스팅 하기', () => {
      const result = generateDailyInfo(5, '월');
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            day: 5,
            dayName: '금',
            isHoliday: true,
          }),
        ]),
      );
    });
  });
  describe('assignWorkers 함수', () => {
    const days = [
      { day: 1, dayName: '월', isHoliday: false },
      { day: 2, dayName: '화', isHoliday: false },
      { day: 3, dayName: '수', isHoliday: false },
      { day: 4, dayName: '목', isHoliday: false },
      { day: 5, dayName: '금', isHoliday: true },
      { day: 6, dayName: '토', isHoliday: false },
    ];
    const weekdayWorkers = ['연아', '묭묭', '툐툐', '재은', '정현'];
    const holidayWorkers = ['재은', '연아', '묭묭', '툐툐', '정현'];
    const result = assignWorkers(days, weekdayWorkers, holidayWorkers);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          day: 1,
          dayName: '월',
          isHoliday: false,
          worker: '연아',
        }),
      ]),
    );
  });
  describe('adjustDuplicateWorkers 함수', () => {
    const schedule = [
      { day: 1, dayName: '월', isHoliday: false, worker: '연아' },
      { day: 2, dayName: '화', isHoliday: false, worker: '묭묭' },
      { day: 3, dayName: '수', isHoliday: false, worker: '툐툐' },
      { day: 4, dayName: '목', isHoliday: false, worker: '재은' },
      { day: 5, dayName: '금', isHoliday: true, worker: '재은' },
      { day: 6, dayName: '토', isHoliday: false, worker: '정현' },
    ];
    const result = adjustedWorkers(schedule);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          day: 5,
          dayName: '금',
          isHoliday: true,
          worker: '정현',
        }),
      ]),
    );
  });
});
