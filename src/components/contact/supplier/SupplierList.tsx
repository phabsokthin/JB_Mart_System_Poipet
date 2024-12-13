/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
import Pagination from "../../build/paginate/Pagination";
import { url } from "../../../api/url";
import Search from "../../build/search/Search";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import DeleteAction from "../../build/modal/DeleteAction";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../../../views/Sidebar";
import Navbar from "../../../views/Navbar";
import CreateSupplier from "./CreateSupplier";
import MessageSuccess from "../../build/message/MessageSuccess"; // Import the success message component
import sound_success from '../../../assets/sound/success.mp3'

function SupplierList() {
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [suppliersPerPage, setSuppliersPerPage] = useState<number>(15);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState<{ supplierId: number; full_Name: string } | null>(null);
    const [isOpenModalSupplier, setIsOpenModalSupplier] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null); // State for success message

    const [isLoading, setIsLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<string | null>(null)

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`${url}supplier`);
            if (response.data) {
                setSuppliers(response.data);
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.full_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.supplier_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.phone.includes(searchQuery) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPage = Math.ceil(filteredSuppliers.length / suppliersPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const currentSuppliers = filteredSuppliers.slice(
        (currentPage - 1) * suppliersPerPage,
        currentPage * suppliersPerPage
    );

    // Delete handling
    const handleDeleteClick = (supplier: { supplierId: number; full_Name: string }) => {
        setSupplierToDelete(supplier);
        setIsDeleteModalOpen(true);
    };


    const handleDelete = async () => {
        if (supplierToDelete !== null) {
            try {
                await axios.delete(`${url}supplier/${supplierToDelete.supplierId}`);
                setSuppliers(suppliers.filter(supplier => supplier.supplierId !== supplierToDelete.supplierId));
                setIsDeleteModalOpen(false);
                setIsLoading(true)
                handleSuccess("អ្នកផ្គត់ផ្គង់បានលុបដោយជោគជ័យ!");
                sound_message();


            } catch (error) {
                console.error("Error deleting supplier:", error);
            }

            finally {
                setIsLoading(false)
            }
        }
    };

    // Open modal
    const handleOpenModal = () => {
        setDataUpdate(null)
        setIsOpenModalSupplier(true);


    };

    const handleClose = () => {
        setIsOpenModalSupplier(false);
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
        setIsOpenModalSupplier(true)
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
                                <p className="text-xl font-bold font-NotoSansKhmer">តារាងបញ្ជីអ្នកផ្គត់ផ្គង់</p>
                            </div>
                            <button
                                className="button_only_submit"
                                onClick={handleOpenModal}
                            >
                                + បង្កើតអ្នកផ្គត់ផ្គង់ថ្មី
                            </button>
                        </div>

                        <div className="flex items-center justify-between my-3">
                            <div className="flex flex-col gap-2 font-bold font-NotoSansKhmer">
                                <label htmlFor="suppliersPerPage">ច្រោះតាមចំនួន</label>
                                <select
                                    id="suppliersPerPage"
                                    className="input_text w-[100px]"
                                    value={suppliersPerPage}
                                    onChange={(e) => setSuppliersPerPage(Number(e.target.value))}
                                >
                                    <option value="15">15</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                </select>
                            </div>
                            <Search
                                placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <table className="min-w-full xl:table-fixed">
                            <thead className="w-full text-white bg-blue-600/90">
                                <tr className="font-bold font-NotoSansKhmer">
                                    <th className="px-4 py-2 w-[7%]">លេខរៀង</th>
                                    <th className="px-4 py-2 w-[10%]">ប្រភេទអ្នកផ្គត់ផ្គង់</th>
                                    <th className="px-4 py-2 w-[12.5%]">ឈ្មោះអ្នកផ្គត់ផ្គង់</th>
                                    <th className="px-4 py-2 w-[8%]">លេខទូរស័ព្ទ</th>
                                    <th className="px-4 py-2 w-[12.5%]">អុីម៉ែល</th>
                                    <th className="px-4 py-2 w-[12.5%]">អាស័យដ្ឋាន</th>
                                    <th className="px-4 py-2 w-[12.5%]">ពិពណ៌នា</th>
                                    <th className="px-4 py-2 w-[8%]">សកម្មភាព</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSuppliers.length > 0 ? (
                                    currentSuppliers.map((item, index) => (
                                        <tr key={item.supplierId || index}>
                                            <td className="px-4 py-2 w-[12.5%]">{(currentPage - 1) * suppliersPerPage + index + 1}</td>
                                            <td className="px-4 py-2 w-[12.5%]">
                                            {item.supplier_type}
                                            </td>
                                            <td className="px-4 py-2 w-[12.5%]">{item.full_Name}</td>
                                            <td className="px-4 py-2 w-[12.5%]">
                                                <p className="line-clamp-1">{item.phone}</p>
                                            </td>
                                            <td className="px-4 py-2 w-[12.5%]">
                                                <p className="line-clamp-1">{item.email}</p>
                                            </td>
                                            <td className="px-4 py-2 w-[12.5%]">
                                                <p className="line-clamp-1">{item.address}</p>
                                            </td>
                                            <td className="px-4 py-2 w-[12.5%]">
                                                <p className="line-clamp-1">{item.description}</p>
                                            </td>
                                            <td className="px-4 py-2 w-[12.5%] space-x-2">
                                                <button
                                                    onClick={() => handleDeleteClick({ supplierId: item.supplierId, full_Name: item.full_Name })}
                                                    className="delete_action"
                                                >
                                                    <MdDelete />
                                                </button>
                                                <button onClick={() => handleUpdate(item)} className="edit_action">
                                                    <FaUserEdit />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="py-4 text-center">
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
                                    displayName={supplierToDelete?.full_Name || "មិនមានឈ្មោះ"}
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isOpenModalSupplier && (
                                <CreateSupplier
                                    dataUpdate={dataUpdate}
                                    fetchSupplier={fetchSuppliers}
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

export default SupplierList;
