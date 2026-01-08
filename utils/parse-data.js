export const parseFileData = data => {
  const resultArr = [];
  const [, ...rows] = data.split('\n');
  const map = new Map();
  rows.forEach(row => {
    const [name, date] = row.trim().split(',');
    const [attendanceDate, attendanceTime] = date.split(' ');
    const valueList = map.get(name) ?? [];
    valueList.push({
      attendanceDate,
      attendanceTime,
    });
    map.set(name, valueList);
  });
  return Array.from(map, ([name, data]) => {
    return {
      name,
      data,
    };
  });
};

export const filterData = (data, conditionFunc) => {
  return data.filter(conditionFunc);
};

export const parseDate = dateTimes => {
  const daysArr = ['월', '화', '수', '목', '금', '토', '일'];
  const formatDate = new Date(dateTimes);
  const month = formatDate.getMonth() + 1;
  const date = formatDate.getDate();
  const dayIndex = formatDate.getDay() - 1;
  return {
    month,
    date,
    day: daysArr[dayIndex],
  };
};
