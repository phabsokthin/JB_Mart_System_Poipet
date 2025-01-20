import React, { useEffect, useState } from "react";
import { getCurrentDate } from "../../../composable/utils/dateFormateUtils";

interface DateInputProps {
  initialValue?: string; // Optional initial date in YYYY-MM-DD format
  onDateChange?: (date: string) => void; // Callback for date changes
}

const DateInputFormat: React.FC<DateInputProps> = ({
  initialValue,
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    if (initialValue) {
      setCurrentDate(initialValue);
    } else {
      setCurrentDate(getCurrentDate()); // Use a utility function to get the current date
    }
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setCurrentDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const today = new Date().toISOString().split('T')[0];


  return (
    <input
      type="date"
      className="input_text "
      value={currentDate}
      onChange={handleChange}
      max={today}
    />
  );
};

export default DateInputFormat;
