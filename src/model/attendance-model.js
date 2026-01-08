import NicknameInputValidate from '../validate/nickname-input-validate.js';
import InputView from '../view/input-view.js';

class AttendanceModel {
  constructor() {
    this.parsedData = null;
    this.selectedNumber = null;
  }

  async getSelectedNumberOne() {
    const input = await InputView.readNickName();
    NicknameInputValidate.validate(input, this.parsedData);
  }
}

export default AttendanceModel;
