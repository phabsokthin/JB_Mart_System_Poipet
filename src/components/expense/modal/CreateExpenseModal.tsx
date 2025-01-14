import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";

function CreateExpeseModal({ onClose }: { onClose: () => void }) {



  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-black bg-opacity-50 ">
      <motion.div
        className="bg-white w-[90%] md:w-[80%] mt-10 lg:w-[60%] overflow-hidden overflow-y-auto h-[700px] shadow-lg p-4 "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
          <MdOutlineAddCircle className="text-xl" />
          <h2 className="text-lg font-bold">បង្កើតប្រភេទចំណាយថ្មី</h2>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
                ឈ្មោះចំណាយ: *
              </label>
              <input
                type="text"
                required
                className="input_text"
                placeholder="ឈ្មោះចំណាយ"
              />
            </div>

            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
                ឈ្មោះចំណាយ: *
              </label>
              <select className="input_text" required>
                <option selected disabled value="">
                  --ជ្រើសរើសប្រភេទទំចំណាយ--
                </option>
                <option value="សាប៊ូកក់សក់">បង់ទឺក</option>
                <option value="ទឹកក្រូច">បង់ភ្លើង</option>
                <option value="ស្របៀរ">អាហារ</option>
              </select>
            </div>

            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
                ចំនួនសរុប: *
              </label>
              <input
                type="number"
                required
                min={0}
                className="input_text"
                placeholder="ចំនួនសរុប"
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
                កាលបរិច្ឆេត: *
              </label>
              <input
                type="date"
                required
                className="input_text p-[7px]"
                placeholder="ឈ្មោះប្រភេទទំនិញ"
              />
            </div>

           
          </div>


         

          <div className="py-2 mb-3 border-b-2 ">
            <h3 className="font-bold font-NotoSansKhmer">ការទូទាត់</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="mb-4 space-y-2 ">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
             ចំនួនទូទាត់: *
              </label>
              <input
                type="number"
                className="input_text"
                placeholder="0.00"
              />
            </div>

            <div className="mb-4 space-y-2 ">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
             សម្យតុលសាច់ប្រាក់
              </label>
              <input disabled
                type="number"
                className="input_text"
                placeholder="0.00"
              />
            </div>
            
            <div className="mb-4 space-y-2 ">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
             គណនីបង់ប្រាក់
              </label>
              <select
                
                className="input_text">
                  <option value="">--ជ្រើសរើស--</option>
                  <option value="">ABA</option>
                  <option value="">AC Lida</option>
              </select>
            </div>
          
          </div>
         

          <div className="col-span-2">
            <label className="font-bold font-NotoSansKhmer">ការណិពណ័នា</label>
            <textarea
              id="description"
              rows={5}
              className="input_text"
              placeholder="ការណិពណ័នា"
            ></textarea>
          </div>

          <div className="flex justify-end mt-2 space-x-3">
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

export default CreateExpeseModal;
