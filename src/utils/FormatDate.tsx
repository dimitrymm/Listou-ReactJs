export default function FormatDate(dateInput: string | Date) {
  let dateString: string;
  if (dateInput instanceof Date) {
    dateString = dateInput.toISOString().split("T")[0];
  } else {
    dateString = dateInput;
  }

  const regex = /(\d{4})-(\d{2})-(\d{2})/;
  const match = dateString.match(regex);
  if (match) {
    const [_, year, month, day] = match;

    const dateObj = new Date(`${year}-${month}-${day}`);

    if (!isNaN(dateObj.getTime())) {
      return `${day}/${month}/${year}`;
    } else {
      console.error(`Invalid date: ${dateString}`);
      return null;
    }
  }
  console.error(`Invalid date Format: ${dateString}`);
  return null;
}
