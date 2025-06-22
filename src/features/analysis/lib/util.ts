
export const dayNumberToDate = (dayNumber: number, year: number = new Date().getFullYear()): string => {
  if (dayNumber < 1 || dayNumber > 365) {
    throw new Error('Day number must be between 1 and 365');
  }
  const date = new Date(year, 0);
  date.setDate(dayNumber);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  return `${day} ${month}`;
};