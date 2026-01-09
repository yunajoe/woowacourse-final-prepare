import AttendanceInputValidate from '../validate/attendance-input-validate.js';
import InputValidate from '../validate/input-validate.js';
import NicknameInputValidate from '../validate/nickname-input-validate.js';
import InputView from '../view/input-view.js';

class AttendanceModel {
  constructor() {
    this.today = null;
    this.parsedData = null;
    this.selectedNumber = null;
  }

  async getSelectedNumberOne() {
    InputValidate.validateToday(this.today);

    const input = await InputView.readNickName();
    NicknameInputValidate.validate(input, this.parsedData);

    const input2 = await InputView.readAttendanceTime();
    AttendanceInputValidate.validateDateTime(input2);
  }
}

export default AttendanceModel;
