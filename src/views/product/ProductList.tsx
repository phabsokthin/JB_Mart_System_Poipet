/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
import Pagination from "../../components/build/paginate/Pagination";

import Search from "../../components/build/search/Search";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import DeleteAction from "../../components/build/modal/DeleteAction";
import { AnimatePresence } from "framer-motion";

import sound_success from '../../../src/assets/sound/success.mp3'



import Sidebar from "../Sidebar";
import MessageSuccess from "../../components/build/message/MessageSuccess";
import Navbar from "../Navbar";
import { url } from "../../api/url";
import { Link } from "react-router-dom";

function ProductList() {
    const [product, setproduct] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataPerPage, setDataPerPage] = useState<number>(15);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dataToDelete, setdataToDelete] = useState<{ productId: number; pname: string } | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null); // State for success message

    const [isLoading, setIsLoading] = useState(false);

    const fetchdata = async () => {
        try {
            const response = await axios.get(`${url}product`);
            if (response.data) {
                setproduct(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const filtereData = product.filter((product) =>
        product.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.includes(searchQuery)
    );

    const totalPage = Math.ceil(filtereData.length / dataPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const currentData = filtereData.slice(
        (currentPage - 1) * dataPerPage,
        currentPage * dataPerPage
    );

    // Delete handling
    const handleDeleteClick = (pname: { productId: number; pname: string }) => {
        setdataToDelete(pname);
        setIsDeleteModalOpen(true);
    };


    const handleDelete = async () => {
        if (dataToDelete !== null) {
            try {
                await axios.delete(`${url}product/${dataToDelete.productId}`);
                setproduct(product.filter(data => data.productId !== dataToDelete.productId));
                setIsDeleteModalOpen(false);
                setIsLoading(true)
                handleSuccess("បានលុបទុកដោយជោគជ័យ!");
                sound_message();


            } catch (error) {
                console.error("Error deleting customer:", error);
            }

            finally {
                setIsLoading(false)
            }
        }
    };

    // Open modal



    // Handle success message
    const handleSuccess = (message: string) => {
        setSuccessMsg(message);
        setTimeout(() => setSuccessMsg(null), 3000);
    };


    function sound_message() {
        new Audio(sound_success).play();
    }


    //handle update



    return (
        <div className='grid min-h-screen grid-cols-6'>
            <div className="h-full">
                <div className="sticky top-0 z-10">
                    <Sidebar />
                </div>
            </div>

            <div className="col-span-5 p-4">
                <Navbar />
                <div className="p-4 mt-5 bg-white dark:border-gray-700">
                    <div>


                        {successMsg && (
                            <MessageSuccess
                                message={successMsg}
                                onClear={() => setSuccessMsg(null)}
                            />
                        )}
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <p>
                                    <FaClipboardList className="text-lg" />
                                </p>
                                <p className="text-xl font-bold font-NotoSansKhmer">តារាងបញ្ជីផលិតផល</p>
                            </div>
                            <Link to="/createProduct" className="button_only_submit">
                                + បង្កើតផលិតផលថ្មី
                            </Link>
                        </div>

                        <div className="flex items-center justify-between my-3">
                            <div className="flex flex-col gap-2 font-bold font-NotoSansKhmer">
                                <label htmlFor="">ច្រោះតាមចំនួន</label>
                                <select
                                    id=""
                                    className="input_text w-[100px]"
                                    value={dataPerPage}
                                    onChange={(e) => setDataPerPage(Number(e.target.value))}
                                >
                                    <option value="15">15</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                </select>
                            </div>
                            <Search
                                placeholder="ស្វែងរកផលិតផល..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <table className="min-w-full xl:table-fixed">
                            <thead className="w-full text-white bg-blue-600/90">
                                <tr className="font-bold font-NotoSansKhmer">
                                    <th className="px-4 py-2 w-[7%]">ល.រ</th>
                                    <th className="px-4 py-2 w-[10%]">កូដ</th>
                                    <th className="px-4 py-2 w-[12.5%]">ផលិតផល</th>
                                    <th className="px-4 py-2 w-[12.5%]">ឯកតា</th>
                                    <th className="px-4 py-2 w-[10%]">ប្រភេទទំនិញ</th>
                                    <th className="px-4 py-2 w-[12.5%]">ម៉ាកយីហោ</th>
                                    <th className="px-4 py-2 w-[10%]">បរិមាណ</th>
                                    <th className="px-4 py-2 w-[12.5%]">តម្លៃដើម</th>
                                    <th className="px-4 py-2 w-[12.5%]">បូកពន្ធ</th>
                                    <th className="px-4 py-2 w-[10%]">តម្លៃលក់</th>
                                    <th className="px-4 py-2 w-[12.5%]">ប្រាក់ចំណេញ</th>
                                    <th className="px-4 py-2 w-[12.5%]">សរុប</th>
                                    <th className="px-4 py-2 w-[12.5%]">រូបភាព</th>
                                    <th className="px-4 py-2 w-[12.5%]">សកម្មភាព</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length > 0 ? (
                                    currentData.map((item, index) => (
                                        <tr key={item.productId || index}>
                                            <td className="px-4 py-2 w-[12.5%]">{(currentPage - 1) * dataPerPage + index + 1}</td>

                                            <td className="px-4 py-2 w-[12.5%]">{item.pcode}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.pname}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.unit_id.pname}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.cat_id?.cnames}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.brand_id?.bnames}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.qty}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.const_price}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.include_tax}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.sell_price}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.profit}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.total_amount}</td>

                                            <td className="px-4 py-2 w-[12.5%]">
                                                {item.url ? (
                                                    <img src={item.url} alt="Dynamic Image" className="w-full h-auto" />
                                                ) : (
                                                    <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
                                                    alt="Static Placeholder"
                                                    className="w-full h-auto mt-2 border-[1px]"
                                                />
                                                )}
                                               
                                            </td>


                                            <td className="px-4 py-2 w-[12.5%] space-x-2">
                                                <button
                                                    onClick={() => handleDeleteClick({ productId: item.productId, pname: item.pname })}
                                                    className="delete_action"
                                                >
                                                    <MdDelete />
                                                </button>
                                                <Link to={`/product/${item.productId}`} >
                                                <button className="edit_action">
                                                
                                                    <FaUserEdit />
                                              
                                                </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={20} className="py-4 text-center">
                                            មិនមានទិន្នន័យស្វែងរក!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <Pagination
                                totalPage={totalPage}
                                page={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>

                        <AnimatePresence>
                            {isDeleteModalOpen && (
                                <DeleteAction
                                    isLoading={isLoading}
                                    onClose={() => setIsDeleteModalOpen(false)}
                                    onConfirm={handleDelete}
                                    displayName={dataToDelete?.pname || "មិនមានឈ្មោះ"}
                                />
                            )}
                        </AnimatePresence>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
