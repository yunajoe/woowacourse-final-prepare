import { Console, MissionUtils } from '@woowacourse/mission-utils';
import { parseDate, parsePushTime } from '../../utils/parse-data.js';
import { OutputMessage } from '../constants/message.js';

const OutputView = {
  printToday(model) {
    const dateTimes = MissionUtils.DateTimes.now();
    const { year, month, date, day } = parseDate(dateTimes);
    model.today = { year, month, date, day }; // 모델에 저장
    Console.print(`오늘은 ${month}월 ${date}일 ${day}요일 입니다.`);
  },
  printIntro() {
    Console.print(`1. ${OutputMessage.first}`);
    Console.print(`2. ${OutputMessage.second}`);
    Console.print(`3. ${OutputMessage.third}`);
    Console.print(`4. ${OutputMessage.fourth}`);
    Console.print(`Q. ${OutputMessage.quit}`);
  },
  printAttendance(today, time) {
    const { month, date, day } = today;
    const formattedTodayTime = parsePushTime(time);
    Console.print(`${month}월 ${date}일 ${day}요일 ${formattedTodayTime} (출석)`);
  },
};
export default OutputView;
