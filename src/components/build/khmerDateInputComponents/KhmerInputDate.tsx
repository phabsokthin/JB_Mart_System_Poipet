import React, { useState, useEffect } from "react";
import { getCurrentDateForInput, getCurrentDateInKhmer } from "../../../composable/utils/dateUtils";


interface KhmerDateInputProps {
  label: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const KhmerDateInput: React.FC<KhmerDateInputProps> = ({
  required = false,
  onChange,
}) => {
  const [dateValue, setDateValue] = useState<string>("");
  const [khmerDateValue, setKhmerDateValue] = useState<string>("");

  useEffect(() => {
    const initialDate = getCurrentDateForInput();
    setDateValue(initialDate);
    setKhmerDateValue(getCurrentDateInKhmer(initialDate));
  }, []);

  // Handle input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; 
    setDateValue(newValue);
    setKhmerDateValue(getCurrentDateInKhmer(newValue)); // Update Khmer display

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      {/* Display input field with Khmer date */}
      <input
        type="text"
        id="khmer-date"
        readOnly
        value={khmerDateValue}
        className="input_text p-[7px] text-gray-500 bg-gray-100"
      />
      {/* Hidden input to handle actual date */}
      <input
        type="date"
        id="date"
        required={required}
        className="input_text p-[7px] hidden"
        value={dateValue}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default KhmerDateInput;
