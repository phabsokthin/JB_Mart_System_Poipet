import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";

function CreateCategoryModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
                className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4 "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center gap-2 font-NotoSansKhmer my-4">
                    <MdOutlineAddCircle className="text-xl" />
                    <h2 className="text-lg font-bold">បង្កើតប្រភេទអំណាយថ្មី</h2>
                </div>
                <form >
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4">

                        <div className="mb-4 space-y-2">
                            <label className="block font-NotoSansKhmer text-gray-700 font-bold ">ឈ្មោះចំណាយ: *</label>
                            <select className="input_text" required>
                                <option selected disabled value="">--ជ្រើសរើសប្រភេទទំចំណាយ--</option>
                                <option value="សាប៊ូកក់សក់">បង់ទឺក</option>
                                <option value="ទឹកក្រូច">បង់ភ្លើង</option>
                                <option value="ស្របៀរ">អាហារ</option>
                            </select>
                        </div>
                        <div className="mb-4 space-y-2">
                            <label className="block font-NotoSansKhmer text-gray-700 font-bold ">ពន្ធ</label>
                            <input
                                type="number"

                                className="input_text" placeholder="ពន្ធ"
                            />
                        </div>
                        <div className="mb-4 space-y-2">
                            <label className="block font-NotoSansKhmer text-gray-700 font-bold ">ចំនួនសរុប: *</label>
                            <input
                                type="number"
                                required
                                min={0}
                                className="input_text" placeholder="ចំនួនសរុប"
                            />
                        </div>
                        <div className="mb-4 space-y-2">
                            <label className="block font-NotoSansKhmer text-gray-700 font-bold ">កាលបរិច្ខេទ: *</label>
                            <input
                                type="date"
                                required
                                className="input_text" placeholder="ឈ្មោះប្រភេទទំនិញ"
                            />
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className="col-span-8">
                                <label className="font-NotoSansKhmer font-bold">ចន្លោះពេលកើតឡើងវិញ: *</label>
                                <input
                                    type="number"
                                    id="price"
                                    className="input_text w-full"
                                    required
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="font-NotoSansKhmer font-bold"><br /></label>
                                <select
                                    className='input_text'
                                    id=""
                                >
                                    <option value='ថ្ងៃ'>ថ្ងៃ</option>
                                    <option value='ខែ'>ខែ</option>
                                    <option value='ឆ្នាំ'>ឆ្នាំ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='my-6 border-b-4 '>
                        <h3 className='font-NotoSansKhmer font-bold'>បន្ថែមការទូទាត់</h3>
                    </div>
                    <div className="grid md:grid-cols-1 grid-cols-1 gap-x-4">
                        <div>
                            <div className="mb-4 w-1/2">
                                <label className="block font-NotoSansKhmer text-gray-700 font-bold ">ចំនួនសរុបរួមបញ្ចូលពន្ធ</label>
                                <input
                                    type="number"

                                    className="input_text" placeholder="0.00 $"
                                />
                            </div>
                            <div className="mb-4 space-y-2 w-1/2">
                                <label className="block font-NotoSansKhmer text-gray-700 font-bold ">គណនីទូទាត់</label>
                                <select className="input_text">
                                    <option selected disabled value="">មិនមាន</option>
                                    <option value="សាប៊ូកក់សក់">ណាគ្រី</option>
                                    <option value="ទឹកក្រូច">សុធិន</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="font-NotoSansKhmer font-bold">ការណិពណ័នា</label>
                            <textarea id="description"
                                rows={2}
                                className="input_text"
                                placeholder="ការណិពណ័នា">
                            </textarea>
                        </div>

                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="button_only_close">
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
