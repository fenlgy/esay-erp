import dayjs from 'dayjs';

export function formatDate(timestamp: number, short: boolean = false) {
  if (!timestamp) return '';
  const formatter = short ? 'YY/M/D' : 'YYYY-MM-DD';
  return dayjs(timestamp).format(formatter);
}

export function formatTime(timestamp: number, short: boolean = false) {
  if (!timestamp) return '';
  const formatter = short ? 'YY/M/D h:m' : 'YYYY-MM-DD hh:mm';
  return dayjs(timestamp).format(formatter);
}
