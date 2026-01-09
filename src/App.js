import { Console } from '@woowacourse/mission-utils';
import { parseFileData } from '../utils/parse-data.js';
import { readFile } from '../utils/read-file.js';
import AttendanceModel from './model/attendance-model.js';
import OutputView from './view/output-view.js';

class App {
  async run() {
    try {
      const model = new AttendanceModel();
      const fileData = readFile('public/attendance.csv');
      const parseData = parseFileData(fileData);
      model.parsedData = parseData;

      OutputView.printToday(model);
      OutputView.printIntro();

      const selectedNum = await Console.readLineAsync('');
      Console.print('\n');
      // 1번을 선택 하였을떄
      if (Number(selectedNum) === 1) {
        await model.getSelectedNumberOne();
      }
    } catch (error) {
      throw error;
    }
  }
}

export default App;
