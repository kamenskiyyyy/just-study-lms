export function formatDate(date: Date) {
  const d = new Date(date);
  return ('0' + (d.getDate())).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}
