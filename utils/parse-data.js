export const parseFileData = data => {
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
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth() + 1;
  const date = formatDate.getDate();
  const dayIndex = formatDate.getDay() - 1;
  return {
    year,
    month,
    date,
    day: daysArr[dayIndex],
  };
};

/**
 *
 * @param {
 *   year: 2026, month: 1, date: 9, day: '금'
 * } date
 *
 
 * }
 */
export const parsePushDate = today => {
  const { year, month, date } = today;
  const formattedToday = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  return formattedToday;
};

export const parsePushTime = time => {
  const [hours, minute] = time.split(':');
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  return formattedTime;
};
