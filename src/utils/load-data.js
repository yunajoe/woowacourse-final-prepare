import fs from 'fs';

const loadData = filePath => {
  return fs.readFileSync(filePath, 'utf-8');
};

export default loadData;
