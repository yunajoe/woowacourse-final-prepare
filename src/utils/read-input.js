import { Console } from '@woowacourse/mission-utils';

export const readUserInput = async message => {
  return await Console.readLineAsync(message);
};

export const askWorkMonthAndDay = async () => {
  return await readUserInput('비상 근무를 배정할 월과 시작 요일을 입력하세요>');
};
