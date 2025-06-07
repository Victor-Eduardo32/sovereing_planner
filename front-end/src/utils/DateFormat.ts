export const formatDateUs = (rawDate: Date | string): string =>  {
  const parsedDate  = new Date(rawDate);

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = String(parsedDate.getFullYear()).slice(-4);

  return `${year}/${month}/${day}`
}

export const endOfDay = (date: Date): string => {
  date.setHours(23, 59, 59)
  return date.toISOString();
}

export const stringToDate = (value: string) => {
  const formattedDate = value.replace(/\//g, '-');
  return new Date(formattedDate);
}
