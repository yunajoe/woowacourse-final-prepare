import fs from 'fs';
import path from 'path';

export const readFile = filePath => {
  try {
    const fullFilePath = path.join(process.cwd(), filePath);
    const data = fs.readFileSync(fullFilePath, 'utf-8');
    return data;
  } catch (error) {
    throw new Error('[ERROR] 파일을 읽을 수 없습니다.');
  }
};
