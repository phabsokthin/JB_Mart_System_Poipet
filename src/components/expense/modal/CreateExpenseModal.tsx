/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";

import { Switch } from "@headlessui/react";
import { useState } from "react";
function CreateExpeseModal({ onClose }: { onClose: () => void }) {
  const [enabled, setEnabled] = useState(false);

  const [isTypePeriod, setIsTypePeriod] = useState("");

  const handleChange = (e: any) => {
    setIsTypePeriod(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-black bg-opacity-50 ">
      <motion.div
        className="bg-white w-[90%] md:w-[80%] mt-10 lg:w-[60%] overflow-hidden overflow-y-auto h-[900px] shadow-lg p-4 "
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

            <div className="flex items-center gap-1">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full my-2`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <p>ម្តងទៀត</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-3">
            <div className="mb-4 space-y-2">
              {/* <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                បង់ម្តងទៀត: *
              </label>
              <select required className="input_text font-NotoSansKhmer">
                <option selected disabled value="">
                  --ជ្រើសរើសរយ:ពេលបង់ម្តងទៀត--
                </option>
                {Array.from({ length: 31 }, (_, index) => {
                  const khmerNumerals = [
                    "០",
                    "១",
                    "២",
                    "៣",
                    "៤",
                    "៥",
                    "៦",
                    "៧",
                    "៨",
                    "៩",
                  ];
                  const numInKhmer = (index + 1)
                    .toString()
                    .split("")
                    .map((digit) => khmerNumerals[+digit])
                    .join("");
                  return (
                    <option
                      key={index + 1}
                      value={index + 1}
                      className="font-bold"
                    >
                      {numInKhmer}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                រយ:ពេល: *
              </label>
              <select
                onChange={(e) => handleChange(e)}
                value={isTypePeriod}
                className="input_text"
              >
                <option value="">ជ្រើសរើស</option>
                <option value="ថ្ងៃ">ថ្ងៃ</option>
                <option value="ខែ">ខែ</option>
                <option value="ឆ្នាំ">ឆ្នាំ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <p></p>
            {(isTypePeriod === "ថ្ងៃ" || isTypePeriod === "ឆ្នាំ") && (
              <input type="text" className="input_text" placeholder="រយ:ពេល" />
            )}

            {isTypePeriod === "ខែ" && (
              <select required className="input_text font-NotoSansKhmer">
                <option selected disabled value="">
                  --ជ្រើសរើសរយ:ពេលបង់ម្តងទៀត--
                </option>
                {Array.from({ length: 31 }, (_, index) => {
                  const khmerNumerals = [
                    "០",
                    "១",
                    "២",
                    "៣",
                    "៤",
                    "៥",
                    "៦",
                    "៧",
                    "៨",
                    "៩",
                  ];
                  const numInKhmer = (index + 1)
                    .toString()
                    .split("")
                    .map((digit) => khmerNumerals[+digit])
                    .join("");
                  return (
                    <option
                      key={index + 1}
                      value={index + 1}
                      className="font-bold"
                    >
                      នៅថ្ងៃទី {numInKhmer}
                    </option>
                  );
                })}
              </select>
            )}
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
