
export const formatDateToYMD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Parses a date string in YYYY-MM-DD format and returns a Date object
  export const parseYMDToDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  };
  
  // Example function to get the current date in YYYY-MM-DD format
  export const getCurrentDate = (): string => {
    return formatDateToYMD(new Date());
  };
  