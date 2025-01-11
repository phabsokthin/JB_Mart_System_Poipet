/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
import Pagination from "../../components/build/paginate/Pagination";

import Search from "../../components/build/search/Search";
import { MdDelete } from "react-icons/md";
import DeleteAction from "../../components/build/modal/DeleteAction";
import { AnimatePresence } from "framer-motion";
import { MdModeEdit } from "react-icons/md";

import sound_success from '../../../src/assets/sound/success.mp3'




import Sidebar from "../Sidebar";
import MessageSuccess from "../../components/build/message/MessageSuccess";
import Navbar from "../Navbar";
import { url } from "../../api/url";
import CreateBankType from "../../components/bank/CreateBankType";
// import CreateProductbankTypeModal from "../../components/product/modal/CreateProductbankTypeModal";

function BankTypeList() {
    const [bankType, setbankType] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataPerPage, setDataPerPage] = useState<number>(15);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dataToDelete, setdataToDelete] = useState<{ bankTypeId: number; names: string } | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null); // State for success message

    const [isLoading, setIsLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<string | null>(null)

    const fetchdata = async () => {
        try {
            const response = await axios.get(`${url}banktype`);
            if (response.data) {
                setbankType(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const filtereData = bankType.filter((bankType) =>
        bankType.names.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bankType.discription.includes(searchQuery) 
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
    const handleDeleteClick = (names: { bankTypeId: number; names: string }) => {
        setdataToDelete(names);
        console.log(names)
        setIsDeleteModalOpen(true);
    };


    const handleDelete = async () => {
        if (dataToDelete !== null) {
            try {
                await axios.delete(`${url}bankType/${dataToDelete.bankTypeId}`);
                setbankType(bankType.filter(data => data.bankTypeId !== dataToDelete.bankTypeId));
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
    const handleOpenModal = () => {
        setDataUpdate(null)
        setIsOpenModal(true);


    };

    const handleClose = () => {
        setIsOpenModal(false);
    };

    // Handle success message
    const handleSuccess = (message: string) => {
        setSuccessMsg(message);
        setTimeout(() => setSuccessMsg(null), 3000);
    };


    function sound_message() {
        new Audio(sound_success).play();
    }


    //handle update

    const handleUpdate = (item: string) => {
        setDataUpdate(item)
        setIsOpenModal(true)
    }

    return (
        <div className='grid min-h-screen grid-cols-6'>
            <div className="h-screen">
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
                                <p className="text-xl font-bold font-NotoSansKhmer">តារាងបញ្ជីប្រភេទគណនី</p>
                            </div>
                            <button
                                className="button_only_submit"
                                onClick={handleOpenModal}
                            >
                                + បង្កើតថ្មី
                            </button>
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
                                placeholder="ស្វែងប្រភេទគណនី..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <table className="min-w-full xl:table-fixed">
                            <thead className="w-full text-white bg-blue-600/90">
                                <tr className="font-bold font-NotoSansKhmer">
                                    <th className="px-4 py-2 w-[7%]">លេខរៀង</th>
                                    <th className="px-4 py-2 w-[10%]">ប្រភេទគណនី</th>
                                    <th className="px-4 py-2 w-[12.5%]">ពិពណ៌នា</th>
                                    <th className="px-4 py-2 w-[12.5%]">កាលបរិច្ឆេត</th>
                                    <th className="px-4 py-2 w-[12.5%]">សកម្មភាព</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length > 0 ? (
                                    currentData.map((item, index) => (
                                        <tr key={item.bankTypeId || index}>
                                            <td className="px-4 py-2 w-[12.5%]">{(currentPage - 1) * dataPerPage + index + 1}</td>

                                            <td className="px-4 py-2 w-[12.5%]">{item.names}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.discription}</td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.createdAt}</td>
                                           
                                            <td className="px-4 py-2 w-[12.5%] space-x-2">
                                                <button
                                                    onClick={() => handleDeleteClick({ bankTypeId: item.bankTypeId, names: item.names })}
                                                    className="delete_action"
                                                >
                                                    <MdDelete />
                                                </button>
                                                <button onClick={() => handleUpdate(item)} className="edit_action">
                                                    <MdModeEdit />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-4 text-center">
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
                                    displayName={dataToDelete?.names || "មិនមានឈ្មោះ"}
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isOpenModal && (
                                <CreateBankType
                                    dataUpdate={dataUpdate}
                                    fetchData={fetchdata}
                                    onSuccess={handleSuccess}
                                    onClose={handleClose}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankTypeList;
