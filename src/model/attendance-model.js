import { filterData, parsePushDate, parsePushTime } from '../../utils/parse-data.js';
import AttendanceInputValidate from '../validate/attendance-input-validate.js';
import InputValidate from '../validate/input-validate.js';
import NicknameInputValidate from '../validate/nickname-input-validate.js';
import InputView from '../view/input-view.js';
import OutputView from '../view/output-view.js';

class AttendanceModel {
  constructor() {
    this.today = null; // {  year: 2026, month: 1, date: 9, day: '금'}
    this.attendanceTime = null;
    this.parsedData = null;
    this.selectedNumber = null; // 1,2,
  }

  async getSelectedNumberOne() {
    // 주말인지 확인하는 유효성 검증
    InputValidate.validateToday(this.today);

    // 이름
    const nickname = await InputView.readNickName();
    NicknameInputValidate.validate(nickname, this.parsedData);

    // 출석 시간
    const attendanceTime = await InputView.readAttendanceTime();
    AttendanceInputValidate.validateDateTime(attendanceTime);
    this.attendanceTime = attendanceTime; // 출석 시간 저장

    // 오늘이미 출석체크가 되어 있는지 확인
    AttendanceInputValidate.validateAlreadyAttendanceCheck(this.today, this.parsedData, nickname);

    // 다 통과하면은 그떄서야 push

    const formattedToday = parsePushDate(this.today);
    const formattedTodayTime = parsePushTime(this.attendanceTime);

    const { name, data } = filterData(this.parsedData, item => item.name === nickname)[0];
    data.push({
      attendanceDate: formattedToday,
      attendanceTime: formattedTodayTime,
    });

    OutputView.printAttendance(this.today, this.attendanceTime);
  }
}

export default AttendanceModel;
