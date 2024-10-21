import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";

function CreateProductUnitModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4 "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }} 
                transition={{ duration: 0.2 }} 
            >
                <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
                <MdOutlineAddCircle className="text-xl"/>
                <h2 className="text-lg font-bold">បង្កើតយីហោថ្មី</h2>
                </div>
                <form >
                    <div className="mb-4 space-y-2">
                        <label  className="block font-bold text-gray-700 font-NotoSansKhmer ">ឈ្មោះម៉ាកយីហោ: *</label>
                        <input 
                            type="text"
                            required
                            className="input_text" placeholder="ឈ្មោះម៉ាកយីហោ"
                        />
                    </div>
                    <div className="mb-4 space-y-2">
                        <label htmlFor="productDescription" className="block font-bold text-gray-700 font-NotoSansKhmer">ពិពណ៌នា</label>
                        <textarea placeholder="ពិពណ៌នា"
                            id="productDescription"
                            className="input_text"
                            rows={5}
                        />
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

export default CreateProductUnitModal;
