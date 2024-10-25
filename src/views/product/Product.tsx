import React, { useState } from "react";
import DateInputFormat from "../../components/EnglishDateInputComponents/InputFormateDateComponent";

const ParentComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(''); 

  const handleDateChange = (date: string) => {
    setSelectedDate(date); 
    console.log("Selected date:", date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const dateToSubmit = selectedDate || new Date().toISOString().split('T')[0]; 
    console.log("Submitting date:", dateToSubmit); 
  };

  const currentDate = new Date().toISOString().split('T')[0]; 

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <DateInputFormat initialValue={currentDate} onDateChange={handleDateChange} />
        <button type="submit" className="p-2 mt-4 text-white bg-blue-500 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ParentComponent;
