
export const convertToKhmerNumber = (number: number): string => {
    const khmerDigits: string[] = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    return number.toString().split('').map(digit => khmerDigits[parseInt(digit)]).join('');
  };
  
  export const getCurrentDateInKhmer = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
  
    const khmerMonths: string[] = [
      'មករា', 'កម្ភៃ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
      'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
    ];
  
    const day = convertToKhmerNumber(date.getDate());
    const month = khmerMonths[date.getMonth()];
    const year = convertToKhmerNumber(date.getFullYear());
  
    return `${day} ${month} ${year}`;
  };
  
  export const getCurrentDateForInput = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  