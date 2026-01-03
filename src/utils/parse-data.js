// 데이터 형 변환만 하기

export const parseMonthAndDay = input => {
  const [month, day] = input.split(',');
  return { workMonth: Number(month), workDay: day };
};

export const parseWorkers = input => input.split(',').map(worker => worker.trim());
