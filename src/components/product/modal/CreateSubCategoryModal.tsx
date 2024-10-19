import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

function CreateSubCategoryModal({ onClose }: { onClose: () => void }) {
    // Example array of subcategories
    const subCategories = [
        { id: 1, name: 'សាប៊ូកក់សក់', parentCategory: 'Hair Care' },
        { id: 2, name: 'ទឹកក្រូច', parentCategory: 'Beverages' },
        { id: 3, name: 'ស្របៀរ', parentCategory: 'Soups' },
        { id: 4, name: 'ទឹកកក', parentCategory: 'Frozen Goods' },
        { id: 5, name: 'បង្អែម', parentCategory: 'Desserts' },
        { id: 6, name: 'សាប៊ូកក់សក់', parentCategory: 'Hair Care' },
        { id: 7, name: 'ទឹកក្រូច', parentCategory: 'Beverages' },
        { id: 8, name: 'ស្របៀរ', parentCategory: 'Soups' },
        { id: 9, name: 'ទឹកកក', parentCategory: 'Frozen Goods' },
        { id: 10, name: 'បង្អែម', parentCategory: 'Desserts' },
    ];

    const rowVariants = {
        open: (index: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: index * 0.1,
            },
        }),
        closed: {
            y: 30,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
    };

    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
                className="bg-white w-[90%] md:w-[60%] lg:w-[60%] shadow-lg p-4 max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center gap-2 font-NotoSansKhmer my-4">
                    <MdOutlineAddCircle className="text-xl" />
                    <h2 className="text-lg font-bold">បង្កើតក្រុមប្រភេទទំនិញថ្មី</h2>
                </div>
                <form>
                    <div className="mb-4 space-y-2">
                        <label className="block font-NotoSansKhmer text-gray-700 font-bold">ឈ្មោះប្រភេទទំនិញ: *</label>
                        <input
                            type="text"
                            required
                            className="input_text"
                            placeholder="ឈ្មោះប្រភេទទំនិញ"
                        />
                    </div>
                    <div className="mb-4 space-y-2">
                        <label className="block font-NotoSansKhmer text-gray-700 font-bold">ប្រភេទទំនិញមេ: *</label>
                        <select className="input_text">
                            <option selected disabled value="">--ជ្រើសរើសប្រភេទទំនិញមេ--</option>
                            <option value="សាប៊ូកក់សក់">សាប៊ូកក់សក់</option>
                            <option value="ទឹកក្រូច">ទឹកក្រូច</option>
                            <option value="ស្របៀរ">ស្របៀរ</option>
                        </select>
                    </div>
                    <div className="mb-4 space-y-2">
                        <label htmlFor="productDescription" className="block font-NotoSansKhmer text-gray-700 font-bold">ពិពណ៌នា</label>
                        <textarea
                            placeholder="ពិពណ៌នា"
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


                <fieldset className="border-2">
                    <legend className="px-5 font-bold font-NotoSansKhmer">បញ្ចីក្រុមទំនិញ</legend>
                    <div className="mt-0 px-5 pb-4 ">


                        <div className="flex justify-between items-center mb-3 overflow-x-auto">
                            <div className="flex items-center gap-2">
                                <BiSolidCategory className="text-xl" />
                                <h3 className="font-NotoSansKhmer text-lg font-bold text-nowrap">ប្រភេទក្រុមទំនិញទាំងអស់</h3>
                            </div>
                            <div>
                                <input type="text" className="input_text w-[300px]" placeholder="ស្វែងរកប្រភេទទំនិញ..." />

                            </div>
                        </div>
                        <table className="min-w-full border-collapse table-auto">
                            <thead className="bg-blue-600/90 text-white font-NotoSansKhmer">
                                <tr>
                                    <th className="border-b py-2 text-left">លេខរៀង</th>
                                    <th className="border-b py-2 text-left">ប្រភេទទំនិញមេ</th>
                                    <th className="border-b py-2 text-left">ប្រភេទទំនិញ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subCategories.map((subCategory, index) => (
                                    <motion.tr key={subCategory.id}

                                    
                                        custom={index}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={rowVariants}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-sm font-NotoSansKhmer cursor-pointer"

                                    >
                                        <td className="border-b py-2">{index + 1}</td>
                                        <td className="border-b py-2">{subCategory.name}</td>
                                        <td className="border-b py-2">{subCategory.parentCategory}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </fieldset>

            </motion.div>
        </div>
    );
}

export default CreateSubCategoryModal;
