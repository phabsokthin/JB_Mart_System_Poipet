import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";
import { useState } from "react";
import KhmerDateInput from "../../build/khmerDateInputComponents/KhmerInputDate";

function CreateCategoryModal({ onClose }: { onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };
  console.log(selectedDate);
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white w-[90%] md:w-[60%] lg:w-[40%] shadow-lg p-4 "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
          <MdOutlineAddCircle className="text-xl" />
          <h2 className="text-lg font-bold">បង្កើតប្រភេទអំណាយថ្មី</h2>
        </div>
        <form>
          <div className="mb-4 space-y-2">
            <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
              ឈ្មោះប្រភេទចំណាយ: *
            </label>
            <input
              type="text"
              required
              className="input_text"
              placeholder="ឈ្មោះប្រភេទចំណាយ"
            />
          </div>
          <div className="mb-4 space-y-2">
            <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
              បង្កើតថ្ងៃទី: *
            </label>
         

            <KhmerDateInput
              label="កាលបរិច្ឆេទលក់"
              required
              onChange={handleDateChange}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="button_only_close"
            >
              បោះបង់
            </button>
            <button type="submit" className="button_only_submit">
              រក្សាទុក
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateCategoryModal;
