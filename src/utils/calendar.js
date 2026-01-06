export const returnDay = date => {
  const day = ['월', '화', '수', '목', '금', '토', '일'];
  const startDayIndex = 4;
  for (let i = 1; i <= 31; i++) {
    if (i === date) {
      const value = (startDayIndex + i - 1) % 7;
      return day[value];
    }
  }
};
