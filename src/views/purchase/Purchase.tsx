/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/build/paginate/Pagination";

import Search from "../../components/build/search/Search";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import DeleteAction from "../../components/build/modal/DeleteAction";
import { AnimatePresence } from "framer-motion";
import { BiPurchaseTagAlt } from "react-icons/bi";

import sound_success from '../../../src/assets/sound/success.mp3'



import Sidebar from "../Sidebar";
import MessageSuccess from "../../components/build/message/MessageSuccess";
import Navbar from "../Navbar";
import { url } from "../../api/url";
import { Link } from "react-router-dom";

function Purchase() {
    const [purchase, setPurchase] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataPerPage, setDataPerPage] = useState<number>(15);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dataToDelete, setdataToDelete] = useState<{
        purchaseNo: any;
        bankId: any; purchaseId: number; pname: string
    } | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null); // State for success message

    const [isLoading, setIsLoading] = useState(false);

    const fetchdata = async () => {
        try {
            const response = await axios.get(`${url}purchase`);
            if (response.data) {
                setPurchase(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const filtereData = purchase.filter((purchase) =>
        purchase.supplierId_for_purchase?.full_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.productId_for_purchase?.pname.includes(searchQuery)
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
    const handleDeleteClick = (purchase: { purchaseNo: string; bankId: number; purchaseId: number; pname: string }) => {
        setdataToDelete(purchase);
        setIsDeleteModalOpen(true);
    };




    const handleDelete = async () => {
        if (dataToDelete !== null) {
            try {
                await axios.delete(`${url}purchase`, {
                    data: {
                        purchaseNo: dataToDelete.purchaseNo,
                        bankId: dataToDelete.bankId,
                    },
                });
                setPurchase(purchase.filter(
                    (data) =>
                        data.purchaseNo !== dataToDelete.purchaseNo || data.bankId !== dataToDelete.bankId
                ));
                setIsDeleteModalOpen(false);
                setIsLoading(true);
                handleSuccess("បានលុបទុកដោយជោគជ័យ!");
                sound_message();
            } catch (error) {
                console.error("Error deleting purchase:", error);
            } finally {
                setIsLoading(false);
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
                                    <BiPurchaseTagAlt className="text-lg" />
                                </p>
                                <p className="text-xl font-bold font-NotoSansKhmer">បញ្ជីទិញផលិតផល</p>
                            </div>
                            <Link to="/createPurchase" className="button_only_submit">
                                + ទិញផលិតផលចូលស្តុក
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
                                placeholder="ស្វែងរកផលិតផលទិញ..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div>

                        </div>

                        <table className="min-w-full xl:table-fixed">
                            <thead className="text-white bg-blue-600/90">
                                <tr className="font-bold font-NotoSansKhmer">

                                    <th className="px-4 py-2 w-[12.5%]">លេខយោង</th>
                                    <th className="px-4 py-2 w-[10%]">អ្នកផ្គត់ផ្គង់</th>
                                    <th className="px-4 py-2 w-[10%]">ចំនួនសរុប</th>
                                    <th className="px-4 py-2 w-[10%]">ចំនួនទូទាត់</th>
                                    <th className="px-4 py-2 w-[12.5%]">ស្ថានភាព</th>
                                    <th className="px-4 py-2 w-[12.5%]">នៅសស់</th>
                                    <th className="px-4 py-2 w-[12.5%]">គណនី</th>
                                    <th className="px-4 py-2 w-[12.5%]">អ្នកប្រើប្រាស់</th>
                                    <th className="px-4 py-2 w-[12.5%]">កាលបរិច្ឆេតទិញ</th>
                                    <th className="px-4 py-2 w-[12.5%]">សកម្មភាព</th>
                                </tr>
                            </thead>
                            <tbody>

                                {currentData.length > 0 ? (
                                    currentData.map((item, index) => (
                                        <tr key={index}>

                                            <td className="px-4 py-2 w-[12.5%]">000{item.purchaseNo}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.supplierId_for_purchase?.full_Name}</td>
                                            <td className="px-4 py-2 w-[12.5%]">${item.total_amount}</td>
                                            <td className="px-4 py-2 w-[12.5%]">${item.payment_amount}</td>
                                            <td className="px-4 py-2 w-[12.5%]">

                                            {Math.abs(parseFloat(item.balance)) < 0.0001 ? (
                                                <button className="px-1 text-xs text-white bg-green-500 rounded-full ">បានបង់</button>
                                            ) : parseFloat(item.payment_amount) / parseFloat(item.total_amount) > 0.5 ? (
                                                <button className="px-1 text-xs bg-yellow-400 rounded-full">បានបង់ខ្លះ</button>
                                            ) : (
                                                <button className="px-1 text-xs text-white bg-red-500 rounded-full">ជំពាក់</button>
                                            )}
                                            </td>

                                         



                                            <td className="px-4 py-2 w-[12.5%]">${item.balance}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.bankId_for_purchase?.bankName}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.userId_for_purchase?.userName}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{new Date(item.date_purchase).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 w-[12.5%] space-x-2">
                                                <button
                                                    onClick={() => handleDeleteClick({
                                                        purchaseNo: item.purchaseNo, bankId: item.bankId,
                                                        purchaseId: 0,
                                                        pname: item.supplierId_for_purchase?.full_Name
                                                    })}
                                                    className="delete_action"
                                                >
                                                    <MdDelete />
                                                </button>
                                                <Link to={`/purchase/${item.purchaseId}`} >
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

export default Purchase;
