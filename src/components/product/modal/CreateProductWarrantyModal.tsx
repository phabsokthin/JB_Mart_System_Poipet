import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";

function CreateProductUnitWarrentyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white w-[90%] md:w-[50%] lg:w-[80%] xl:w-[40%] shadow-lg p-4 "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
          <MdOutlineAddCircle className="text-xl" />
          <h2 className="text-lg font-bold">បង្កើតការធានា</h2>
        </div>
        <form>
          <div className="mb-4 space-y-2">
            <label className="block font-bold text-gray-700 font-NotoSansKhmer ">
              ឈ្មោះផលិតផល: *
            </label>
            <select required className="input_text"> 
              <option selected disabled value="">
                --ជ្រើសរើសផលិតផល--
              </option>
              <option value="សាប៊ូកក់សក់">សាប៊ូកក់សក់</option>
              <option value="ទឹកក្រូច">ទឹកក្រូច</option>
              <option value="ស្របៀរ">ស្របៀរ</option>
            </select>
          </div>
          <div className="">
            
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          <div className="flex flex-col gap-2">
              <label
                htmlFor="supplierType"
                className="font-bold font-NotoSansKhmer"
              >
                រយ:ពេល: *
              </label>

              <select
              
                required
                className="input_text font-NotoSansKhmer"
              >
                <option selected disabled value="">--ជ្រើសរើសរយ:ពេល--</option>
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
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="supplierType"
                className="font-bold font-NotoSansKhmer"
              >
                ប្រភេទការធានា: *
              </label>
              <select
              
                required
                className="input_text font-NotoSansKhmer"
              >
                <option selected disabled value="">--ជ្រើសរើសធានា--</option>
                <option value="ថ្ងៃ" className="font-bold">
                  ថ្ងៃ
                </option>
                <option value="ខែ" className="font-bold">
                  ខែ
                </option>
                <option value="ឆ្នាំ" className="font-bold">
                  ឆ្នាំ
                </option>
              </select>
            </div>
          </div>
          <div className="mb-4 space-y-2">
            <label
              htmlFor="productDescription"
              className="block font-bold text-gray-700 font-NotoSansKhmer"
            >
              ពិពណ៌នា
            </label>
            <textarea
              placeholder="ពិពណ៌នា"
              id="productDescription"
              className="input_text"
              rows={5}
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

export default CreateProductUnitWarrentyModal;
