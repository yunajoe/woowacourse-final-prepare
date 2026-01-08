import { Console, MissionUtils } from '@woowacourse/mission-utils';
import { parseDate } from '../../utils/parse-data.js';
import { OutputMessage } from '../constants/message.js';

const OutputView = {
  printToday() {
    const dateTimes = MissionUtils.DateTimes.now();
    const { month, date, day } = parseDate(dateTimes);
    Console.print(`오늘은 ${month}월 ${date}일 ${day}요일 입니다.`);
  },
  printIntro() {
    Console.print(`1. ${OutputMessage.first}`);
    Console.print(`2. ${OutputMessage.second}`);
    Console.print(`3. ${OutputMessage.third}`);
    Console.print(`4. ${OutputMessage.fourth}`);
    Console.print(`Q. ${OutputMessage.quit}`);
  },
};
export default OutputView;
