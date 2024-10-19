import { AiFillProduct } from "react-icons/ai";
import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateProductUnitModal from "../../components/product/modal/CreateProductUnitModal";

const productunit = [
    {
        
        id: 1,
        name: 'John Doe',
        contact: '012345678',
        email: 'john@example.com',
        businessName: '',
    },
    {
        id: 2,
        name: 'ABC Corp',
        contact: '0987654321',
        email: 'contact@abccorp.com',
        businessName: 'ABC Corp',
    },
    {
        id: 3,
        name: 'Jane Smith',
        contact: '093456789',
        email: 'jane@example.com',
        businessName: '',
    },
    {
        id: 4,
        name: 'John Doe',
        contact: '012345678',
        email: 'john@example.com',
        businessName: '',
    },
    {
        id: 5,
        name: 'ABC Corp',
        contact: '0987654321',
        email: 'contact@abccorp.com',
        businessName: 'ABC Corp',
    },
    {
        id: 6,
        name: 'Jane Smith',
        contact: '093456789',
        email: 'jane@example.com',
        businessName: '',
    },
];

function ProductUnit() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const rowVariants = {
        open: (index:number) => ({
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100, 
                damping: 30,
                delay: index * 0.2, // Stagger the animation
            },
        }),
        closed: {
            y:30,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
    };
    

    return (
        <div className='grid grid-cols-6'>
            <Sidebar />
            <div className="p-4 col-span-5">
                <Navbar />
                <div className="p-4 bg-white dark:border-gray-700 mt-5 animate-fade-up animate-duration-2000 animate-ease-in-out">
                    <div className='flex items-center gap-2 '>
                        <AiFillProduct className='text-xl' />
                        <p className='font-NotoSansKhmer font-bold text-lg'>ឯកតាទំនិញ</p>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleOpenModal} className="button_only_submit">+ បង្កើតឯកតាថ្មី</button>
                    </div>
                    <div className="flex justify-between items-center my-3">
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
                            <input type="text" className="input_text w-[300px]" placeholder="ស្វែងរកឯកតាទំនិញ..." />
                        </div>
                    </div>
                    <table className="min-w-full table-auto">
                        <thead className="bg-blue-600/90 text-white">
                            <tr className="font-NotoSansKhmer font-bold">
                                <th className="px-4 py-2">លេខរៀង</th>
                                <th className="px-4 py-2">ឈ្មោះឯកតាទំនិញ</th>
                                <th className="px-4 py-2">ពិពណ៌នា</th>
                                <th className="px-4 py-2">កាលបរិច្ឆេតបញ្ចូល</th>
                                <th className="px-4 py-2">អុីម៉ែល</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productunit.map((unit, index) => (
                                <motion.tr
                                    key={unit.id}
                                    custom={index} 
                                    initial="closed"  
                                    animate="open"    
                                    exit="closed"     
                                    variants={rowVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-sm font-NotoSansKhmer cursor-pointer"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{unit.name}</td>
                                    <td className="px-4 py-2">{unit.businessName || 'N/A'}</td>
                                    <td className="px-4 py-2">{unit.contact}</td>
                                    <td className="px-4 py-2">{unit.email}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && <CreateProductUnitModal onClose={handleCloseModal} />}
            </AnimatePresence>
        </div>
    );
}

export default ProductUnit;
