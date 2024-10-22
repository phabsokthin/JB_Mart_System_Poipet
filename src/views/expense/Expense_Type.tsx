import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateExpenseTypeModal from "../../components/exoense/modal/CreateExpenseTypeModal";
import { LuListStart } from "react-icons/lu";

const exptense = [
    { id: 1, name: 'បង់ទឺក',  datetime: new Date().toLocaleString()},
    { id: 2, name: 'បង់ភ្លើង',  datetime: new Date().toLocaleString()},
    { id: 3, name: 'អាហារ',  datetime: new Date().toLocaleString()},
];


function Expense_Type() {
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
                        <LuListStart className='text-xl' />
                        <p className='text-lg font-bold font-NotoSansKhmer'>បញ្ជីប្រភេទចំណាយ</p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleOpenModal} className="button_only_submit">+ បង្កើតប្រភេទចំណាយ</button>
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
                            <input type="text" className="input_text w-[300px]" placeholder="ស្វែងរកប្រភេទទំនិញ..." />
                        </div>
                    </div>
                    <table className="min-w-full overflow-x-auto table-auto">
                        <thead className="text-white bg-blue-600/90">
                            <tr className="font-bold font-NotoSansKhmer">
                                <th className="px-4 py-2">លេខរៀង</th>
                                <th className="px-4 py-2">ឈ្មោះប្រភេទចំណាយ</th>
                                <th className="px-4 py-2">បង្កើត</th>

                            </tr>
                        </thead>
                        <tbody>
                            {exptense.map((cate, index) => (
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
                                    <td className="px-4 py-2">{cate.datetime}</td>
                                   
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && <CreateExpenseTypeModal onClose={handleCloseModal} />}
            </AnimatePresence>
        </div>
    );
}

export default Expense_Type;
