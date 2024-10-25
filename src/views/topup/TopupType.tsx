import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateProductWarrantyModal from "../../components/product/modal/CreateProductWarrantyModal";
import { IoMdListBox } from "react-icons/io";

const category = [
    { id: 1, name: 'Metfone', description: 'Gadgets and devices', duration:4,type:'ឆ្នាំ'},
    { id: 2, name: 'Smart', description: 'Gadgets and devices', duration:1,type:'ថ្ងៃ'},
    { id: 3, name: 'Cellcard', description: 'Gadgets and devices', duration:4,type:'ឆ្នាំ'},

 

];


function TopupType() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

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
        <div className='grid min-h-screen grid-cols-6'>
            <div className="h-screen"> {/* Ensure this has full height */}
                <div className="sticky top-0 z-10"> {/* Add z-index */}
                    <Sidebar />
                </div>
            </div>

            <div className="col-span-5 p-4">
                <Navbar />
                <div className="p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
                    <div className='flex items-center gap-2 '>
                        <IoMdListBox className='text-xl' />
                        <p className='text-lg font-bold font-NotoSansKhmer'>បញ្ជីប្រភេទកាតទូរស័ព្ទ</p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleOpenModal} className="button_only_submit">+ បង្កើតប្រភេទថ្មី</button>
                    </div>
                    <div className="flex items-center justify-between my-3">
                        <div className="flex flex-col gap-2 font-bold font-NotoSansKhmer">
                            <label htmlFor="">ច្រោះតាមចំនួន</label>
                            <select className="input_text w-[100px]">
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" className="input_text w-[300px]" placeholder="ស្វែងរកកាត..." />
                        </div>
                    </div>
                    <table className="min-w-full overflow-x-auto table-auto">
                        <thead className="text-white bg-blue-600/90">
                            <tr className="font-bold font-NotoSansKhmer">
                                <th className="px-4 py-2">លេខរៀង</th>
                                <th className="px-4 py-2">ប្រភេទកាត</th>
                                <th className="px-4 py-2">ពិពណ៌នា</th>
                                <th className="px-4 py-2">រយៈពេលការធានា</th>

                            </tr>
                        </thead>
                        <tbody>
                            {category.map((cate, index) => (
                                <motion.tr
                                    key={cate.id}
                                    custom={index}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={rowVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-sm cursor-pointer font-NotoSansKhmer"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{cate.name}</td>
                                    <td className="px-4 py-2">{cate.duration} {cate.type}</td>
                                    <td className="px-4 py-2">{cate.description || 'N/A'}</td>
                                   
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && <CreateProductWarrantyModal onClose={handleCloseModal} />}
            </AnimatePresence>
        </div>
    );
}

export default TopupType;
