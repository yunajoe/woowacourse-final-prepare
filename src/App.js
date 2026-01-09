import { Console } from '@woowacourse/mission-utils';
import { parseFileData } from '../utils/parse-data.js';
import { readFile } from '../utils/read-file.js';
import AttendanceModel from './model/attendance-model.js';
import OutputView from './view/output-view.js';

class App {
  constructor() {
    this.model = new AttendanceModel();
    const fileData = readFile('public/attendance.csv');
    const parseData = parseFileData(fileData);
    this.model.parsedData = parseData;
  }
  async run() {
    try {
      OutputView.printToday(this.model);
      OutputView.printIntro();

      const selectedNum = await Console.readLineAsync('');
      // 1번(출석 확인) 하였을떄
      if (Number(selectedNum) === 1) {
        await this.model.getSelectedNumberOne();
        await this.run();
      } else if (Number(selectedNum) === 2) {
        await this.model.getSelectedNumberTwo();
        await this.run();
      } else if (selectedNum === 'Q') {
        return;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default App;
