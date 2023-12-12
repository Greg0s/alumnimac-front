export function calcDuration(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const weekDuration = (endDate - startDate) / (1000 * 60 * 60 * 24 * 7);

  return Math.floor(weekDuration);
}
