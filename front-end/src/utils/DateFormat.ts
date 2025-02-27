export const formatDateUs = (date: Date): string =>  {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-4);

  return `${year}/${month}/${day}`
}

export const endOfDay = (date: Date): string => {
  date.setHours(23, 59, 59)
  return date.toISOString();
}
