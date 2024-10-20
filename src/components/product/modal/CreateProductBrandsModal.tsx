import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";

function CreateProductUnitModal({ onClose }: { onClose: () => void }) {
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
                <MdOutlineAddCircle className="text-xl"/>
                <h2 className="text-lg font-bold">បង្កើតយីហោថ្មីថ្មី</h2>
                </div>
                <form >
                    <div className="mb-4 space-y-2">
                        <label  className="block font-NotoSansKhmer text-gray-700 font-bold ">ឈ្មោះម៉ាកយីហោ: *</label>
                        <input 
                            type="text"
                            required
                            className="input_text" placeholder="ឈ្មោះឯកតាទំនិញ"
                        />
                    </div>
                    <div className="mb-4 space-y-2">
                        <label htmlFor="productDescription" className="block font-NotoSansKhmer text-gray-700 font-bold">ពិពណ៌នា</label>
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
