/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList, FaSpinner } from "react-icons/fa";
import Pagination from "../../components/build/paginate/Pagination";

import Search from "../../components/build/search/Search";
import { MdDelete } from "react-icons/md";
import DeleteAction from "../../components/build/modal/DeleteAction";
import { AnimatePresence } from "framer-motion";

import sound_success from '../../../src/assets/sound/success.mp3'
import { FaRegEdit } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { motion } from "framer-motion";



import Sidebar from "../Sidebar";
import MessageSuccess from "../../components/build/message/MessageSuccess";
import MessagWarning from "../../components/build/message/MessageWarning";
import Navbar from "../Navbar";
import { url } from "../../api/url";
import { BiLogOutCircle } from "react-icons/bi";
import CreateBank from "../../components/bank/CreateBank";
import { CiWarning } from "react-icons/ci";
import { IoMdOpen } from "react-icons/io";
import { FaArrowUpLong } from "react-icons/fa6";
import CreateTransferBank from "../../components/bank/CreateTransferBank";

function BankList() {
    const [bank, setBank] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataPerPage, setDataPerPage] = useState<number>(15);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dataToDelete, setdataToDelete] = useState<{ bankId: number; bankName: string } | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null); // State for success message

    const [isLoading, setIsLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<string | null>(null)


    // disable acc
    const [errWarning, setErrWarning] = useState<string | null>(null)
    const [isOpenAcc, setIsOpenAcc] = useState(false)
    const [isOpenAccEnabled, setIsOpenAccEnabled] = useState(false)
    const [isStoreItem, setIsStoreItem] = useState<{ bankName?: string, bankNumber?: string, bankId?: number }>({})
    const [isOpenTransfer, setIsOpenTransfer] = useState(false)
    //fetch bank
    const fetchdata = async () => {
        try {
            const response = await axios.get(`${url}bank`);
            if (response.data) {
                setBank(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const filtereData = bank.filter((bank) =>
        bank.bankNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.bankName.includes(searchQuery)
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
    const handleDeleteClick = (bankName: { bankId: number; bankName: string }) => {
        setdataToDelete(bankName);
        console.log(bankName)
        setIsDeleteModalOpen(true);
    };


    //handle Delete

    const handleDelete = async () => {
        if (dataToDelete !== null) {
            try {
                await axios.delete(`${url}bank/${dataToDelete.bankId}`);
                setBank(bank.filter(data => data.bankId !== dataToDelete.bankId));
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



    //toggle acc

    const handleOpenAcc = (item: any) => {
        setIsOpenAcc(true)
        setIsStoreItem(item)
    }

    const handleCloseAcc = () => {
        setIsOpenAcc(false)
    }

    const handleCloseEnabled = () => {
        setIsOpenAccEnabled(false)
    }

    const handleOpenAccEnabled = (item: any) => {
        setIsOpenAccEnabled(true)
        setIsStoreItem(item)
    }

    //handle update stutus to active
    const handleUpdateStatusActive = async (bankId: any) => {
        try {
            const response = await axios.put(`${url}bankStatus/${bankId}`);
            if (response.data.msg) {
                setIsOpenAcc(false);
                setIsLoading(true)
                handleWarning(response.data.msg);
                sound_message();
                fetchdata();
                handleClose();
            }

        } catch (error) {
            console.error("error account:", error);
        }

        finally {
            setIsLoading(false)
        }
    }

    //enable

    const handleUpdateStatusEnabled = async (bankId: any) => {
        try {
            const response = await axios.put(`${url}bankStatusEnabled/${bankId}`);
            if (response.data.msg) {
                setIsOpenAcc(false);
                setIsLoading(true)
                handleWarning(response.data.msg);
                sound_message();
                fetchdata();
                handleCloseEnabled();
            }

        } catch (error) {
            console.error("error account:", error);
        }

        finally {
            setIsLoading(false)
        }
    }

    const handleWarning = (message: string) => {
        setErrWarning(message);
        setTimeout(() => setErrWarning(null), 3000);
    };


    const handleTransferBank = (item: string) => {
        setDataUpdate(item)
        setIsOpenTransfer(true)
    }


    const handleCloseTransfer = () => {
        setIsOpenTransfer(false)
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


                        {errWarning && (
                            <MessagWarning
                                message={errWarning}
                                onClear={() => setErrWarning(null)}
                            />
                        )}
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <p>
                                    <FaClipboardList className="text-lg" />
                                </p>
                                <p className="text-xl font-bold font-NotoSansKhmer">តារាងបញ្ជីគណនី</p>
                            </div>
                            <button
                                className="button_only_submit"
                                onClick={handleOpenModal}
                            >
                                + បង្កើតគណនីថ្មី
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
                                placeholder="ស្វែងរកគណនី..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <table className="min-w-full xl:table-fixed">
                            <thead className="w-full text-white bg-blue-600/90">
                                <tr className="font-bold font-NotoSansKhmer">
                                    <th className="px-4 py-2 w-[7%]">លេខរៀង</th>
                                    <th className="px-4 py-2 w-[10%]">ប្រភេទគណនី</th>
                                    <th className="px-4 py-2 w-[12.5%]">លេខគណនី</th>
                                    <th className="px-4 py-2 w-[12.5%]">ឈ្មោះគណនី</th>
                                    <th className="px-4 py-2 w-[12.5%]">សាច់ប្រាក់</th>
                                    <th className="px-4 py-2 w-[12.5%]">ស្ថានភាព</th>
                                    <th className="px-4 py-2 w-[12.5%]">កត់ចំណាំ</th>
                                    <th className="px-4 py-2 w-[12.5%]">កាលបរិច្ឆេត</th>
                                    <th className="px-4 py-2 w-[12.5%]">សកម្មភាព</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length > 0 ? (
                                    currentData.map((item, index) => (
                                        <tr key={item.bankId || index}>
                                            <td className="px-4 py-2 w-[10.5%]">{(currentPage - 1) * dataPerPage + index + 1}</td>

                                            <td className="px-4 py-2 w-[10.5%]">{item.bank_type_id?.names}</td>
                                            <td className="px-4 py-2 w-[10.5%]">{item.bankNumber}</td>
                                            <td className="px-4 py-2 w-[10.5%]">{item.bankName}</td>
                                            <td className="px-4 py-2 w-[10.5%]">{item.balance} ($)</td>
                                            <td className="px-4 py-2 w-[10.5%]">
                                                {item.status === 1 ? (
                                                    <button className="p-1 text-xs text-white bg-green-600 rounded-full">កំពុងដំណើរការ</button>
                                                ) : (
                                                    <button className="p-1 text-xs text-white bg-red-600 rounded-full">បិទដំណើរការ</button>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 w-[10.5%]">{item.note}</td>
                                            <td className="px-4 py-2 w-[10.5%]">{item.createdAt}</td>

                                            <td className="px-4 py-2 w-[20%]">
                                                <button
                                                    onClick={() => handleDeleteClick({ bankId: item.bankId, bankName: item.bankName })}
                                                    className="delete_action"
                                                >
                                                    <MdDelete />
                                                </button>
                                                <button onClick={() => handleUpdate(item)} className="edit_action">
                                                    <FaRegEdit />
                                                </button>
                                                <button onClick={() => handleTransferBank(item)} className="transfer_action">
                                                    <FaMoneyBillTransfer />
                                                </button>
                                                {item.status !== 0 ? (
                                                    <button onClick={() => handleOpenAcc(item)} className="edit_action_warning">
                                                        <BiLogOutCircle />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleOpenAccEnabled(item)} className="edit_action_warning_disable">
                                                        <IoMdOpen />
                                                    </button>
                                                )}



                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10} className="py-4 text-center">
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
                                    displayName={dataToDelete?.bankName || "មិនមានឈ្មោះ"}
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isOpenModal && (
                                <CreateBank
                                    dataUpdate={dataUpdate}
                                    fetchData={fetchdata}
                                    onSuccess={handleSuccess}
                                    onClose={handleClose}
                                />
                            )}
                        </AnimatePresence>


                        <AnimatePresence>
                            {isOpenTransfer && (
                                <CreateTransferBank
                                    dataUpdate={dataUpdate}
                                    fetchData={fetchdata}
                                    onSuccess={handleSuccess}
                                    onClose={handleCloseTransfer}
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isOpenAcc && (
                                <div className="fixed inset-0 top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                                    <motion.div
                                        className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
                                            <CiWarning className="text-xl" />
                                            <h2 className="text-lg font-bold">បិទគណនី</h2>
                                        </div>
                                        <div className="flex gap-1 mb-6 text-lg text-gray-700 font-NotoSansKhmer">
                                            គណនី
                                            <p className="mx-1 font-bold "><span className="text-red-500">{isStoreItem?.bankNumber}</span> និង <span className="text-red-500">{isStoreItem?.bankName}</span></p>
                                            និងត្រូវបានបិទបណ្ណោះអាសន្ន!
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button type="button" onClick={handleCloseAcc} className="button_only_close">
                                                បោះបង់
                                            </button>
                                            <button
                                                type="button" onClick={() => handleUpdateStatusActive(isStoreItem?.bankId)}

                                                className={`button_only_submit ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                                disabled={isLoading} // Disable the button when loading
                                            >
                                                {isLoading ? (
                                                    <FaSpinner className="animate-spin" /> // Show loading spinner when in progress
                                                ) : (
                                                    "បិទដំណើរការ"
                                                )}
                                            </button>
                                            {isLoading && (
                                                <button type="button" className="opacity-50 cursor-not-allowed button_only_submit" disabled>
                                                    កំពុងបិទដំណើរការ...
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>


                        <AnimatePresence>
                            {isOpenAccEnabled && (
                                <div className="fixed inset-0 top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                                    <motion.div
                                        className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
                                            <FaArrowUpLong className="text-xl" />
                                            <h2 className="text-lg font-bold">បើកគណនី</h2>
                                        </div>
                                        <div className="flex gap-1 mb-6 text-lg text-gray-700 font-NotoSansKhmer">
                                            គណនី
                                            <p className="mx-1 font-bold "><span className="text-red-500">{isStoreItem?.bankNumber}</span> និង <span className="text-red-500">{isStoreItem?.bankName}</span></p>
                                            និងត្រូវបានបើកដំណើរការវិញ!
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button type="button" onClick={handleCloseEnabled} className="button_only_close">
                                                បោះបង់
                                            </button>
                                            <button
                                                type="button" onClick={() => handleUpdateStatusEnabled(isStoreItem?.bankId)}

                                                className={`button_only_submit ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                                disabled={isLoading} // Disable the button when loading
                                            >
                                                {isLoading ? (
                                                    <FaSpinner className="animate-spin" /> // Show loading spinner when in progress
                                                ) : (
                                                    "បើកដំណើរការ"
                                                )}
                                            </button>
                                            {isLoading && (
                                                <button type="button" className="opacity-50 cursor-not-allowed button_only_submit" disabled>
                                                    កំពុងបើកដំណើរការ...
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankList;
