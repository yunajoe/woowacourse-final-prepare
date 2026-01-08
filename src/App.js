import { readFile } from '../utils/read-file.js';

class App {
  async run() {
    const fileData = readFile('public/attendance.csv');
  }
}

export default App;
