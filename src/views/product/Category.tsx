import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidCategoryAlt } from "react-icons/bi";
import CreateCategoryModal from "../../components/product/modal/CreateCategoryModal";
import CreateSubCategoryModal from "../../components/product/modal/CreateSubCategoryModal";

const category = [
    { id: 1, name: 'Electronics', description: 'Gadgets and devices', datetime: new Date().toLocaleString() },
    { id: 2, name: 'Groceries', description: 'Food and daily essentials', datetime: new Date().toLocaleString() },
    { id: 3, name: 'Clothing', description: 'Apparel and accessories', datetime: new Date().toLocaleString() },
    { id: 4, name: 'Furniture', description: 'Home and office furniture', datetime: new Date().toLocaleString() },
    { id: 5, name: 'Books', description: 'Literature and study material', datetime: new Date().toLocaleString() },
    { id: 6, name: 'Toys', description: 'Toys and games', datetime: new Date().toLocaleString() },
    { id: 7, name: 'Sports', description: 'Sports gear and accessories', datetime: new Date().toLocaleString() },
    { id: 8, name: 'Health', description: 'Healthcare products', datetime: new Date().toLocaleString() },
    { id: 9, name: 'Automotive', description: 'Vehicle parts and accessories', datetime: new Date().toLocaleString() },
    { id: 10, name: 'Beauty', description: 'Cosmetics and skincare products', datetime: new Date().toLocaleString() },
    { id: 11, name: 'Home Appliances', description: 'Household appliances and utilities', datetime: new Date().toLocaleString() },
    { id: 12, name: 'Office Supplies', description: 'Stationery and office essentials', datetime: new Date().toLocaleString() },
    { id: 13, name: 'Jewelry', description: 'Rings, necklaces, and other accessories', datetime: new Date().toLocaleString() },
    { id: 14, name: 'Garden Supplies', description: 'Gardening tools and equipment', datetime: new Date().toLocaleString() },
    { id: 15, name: 'Pet Supplies', description: 'Products for pets and animals', datetime: new Date().toLocaleString() },
    { id: 16, name: 'Musical Instruments', description: 'Instruments and music gear', datetime: new Date().toLocaleString() },
    { id: 17, name: 'Footwear', description: 'Shoes, sandals, and other footwear', datetime: new Date().toLocaleString() },
    { id: 18, name: 'Bags & Luggage', description: 'Handbags, suitcases, and backpacks', datetime: new Date().toLocaleString() },
    { id: 19, name: 'Stationery', description: 'Pens, notebooks, and writing materials', datetime: new Date().toLocaleString() },
    { id: 20, name: 'Baby Products', description: 'Products for infants and babies', datetime: new Date().toLocaleString() },
    { id: 21, name: 'Hardware', description: 'Tools and building materials', datetime: new Date().toLocaleString() },
    { id: 22, name: 'Art Supplies', description: 'Paints, brushes, and other art materials', datetime: new Date().toLocaleString() },
    { id: 23, name: 'Photography', description: 'Cameras and photography equipment', datetime: new Date().toLocaleString() },
    { id: 24, name: 'Outdoor & Camping', description: 'Gear for camping and outdoor activities', datetime: new Date().toLocaleString() },
    { id: 25, name: 'Cleaning Supplies', description: 'Household cleaning products', datetime: new Date().toLocaleString() }
];


function Category() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubCategory, setIsSubCategory] = useState(false)

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenSubCategory = () => {
        setIsSubCategory(true)
    }

    const handleCloseSubCategory = () => {
        setIsSubCategory(false)
    }

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
        <div className='grid grid-cols-6 min-h-screen'>
            <div className="h-screen"> {/* Ensure this has full height */}
                <div className="sticky top-0 z-10"> {/* Add z-index */}
                    <Sidebar />
                </div>
            </div>

            <div className="p-4 col-span-5">
                <Navbar />
                <div className="p-4 bg-white dark:border-gray-700 mt-5 animate-fade-up animate-duration-2000 animate-ease-in-out">
                    <div className='flex items-center gap-2 '>
                        <BiSolidCategoryAlt className='text-xl' />
                        <p className='font-NotoSansKhmer font-bold text-lg'>ប្រភេទទំនិញ</p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleOpenSubCategory} className="button_add_tempo_submit">+ បង្កើតក្រុមប្រភេទទំនិញ</button>
                        <button onClick={handleOpenModal} className="button_only_submit">+ បង្កើតប្រភេទទំនិញ</button>
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
                            <input type="text" className="input_text w-[300px]" placeholder="ស្វែងរកប្រភេទទំនិញ..." />
                        </div>
                    </div>
                    <table className="min-w-full table-auto">
                        <thead className="bg-blue-600/90 text-white">
                            <tr className="font-NotoSansKhmer font-bold">
                                <th className="px-4 py-2">លេខរៀង</th>
                                <th className="px-4 py-2">ឈ្មោះឯកតាទំនិញ</th>
                                <th className="px-4 py-2">ពិពណ៌នា</th>
                                <th className="px-4 py-2">កាលបរិច្ឆេតបញ្ចូល</th>
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
                                    className="text-sm font-NotoSansKhmer cursor-pointer"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{cate.name}</td>
                                    <td className="px-4 py-2">{cate.description || 'N/A'}</td>
                                    <td className="px-4 py-2">{cate.datetime || 'N/A'}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && <CreateCategoryModal onClose={handleCloseModal} />}
            </AnimatePresence>

            <AnimatePresence>
                {isSubCategory && <CreateSubCategoryModal onClose={handleCloseSubCategory} />}
            </AnimatePresence>
        </div>
    );
}

export default Category;
