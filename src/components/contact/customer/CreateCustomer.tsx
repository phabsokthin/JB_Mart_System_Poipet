/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../../api/url";
import MessageSuccess from "../../build/message/MessageSuccess";
import sound_success from '../../../assets/sound/success.mp3'
import { MdOutlineAdd } from "react-icons/md";
import { motion } from "framer-motion";


interface supplierData {
    full_Name: string;
    supplier_type: string;
    phone: string;
    email: string;
}

function CreateCustomer({ onClose, fetchCustomer, onSuccess, dataUpdate }: { 
    onClose: () => void; 
    fetchCustomer: () => void; 
    onSuccess: (message: string) => void;

    dataUpdate: supplierData | any 
}) {
    const [isTypeCustomer, setIsCustomer] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null); // Error message state

    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.full_Name);
            setEmail(dataUpdate.email);
            setPhone(dataUpdate.phone);
            setAddress(dataUpdate.address || "");
            setDescription(dataUpdate.description || "");
            setIsCustomer(dataUpdate.customer_type);
        }
    }, [dataUpdate]);

    const handleChange = (event: any) => {
        setIsCustomer(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMsg(null); 
        try {
            const data = {
                customer_type: isTypeCustomer,
                full_Name: fullName,
                phone: phone,
                email: email,
                address: address,
                description: description,
            };

            if (!dataUpdate) {
                const response = await axios.post(`${url}customer`, data);
                if (response.data.err) {
                    throw new Error(response.data.err); // Handle error
                }
                if (response.data.msg) {
                    handleClear();
                    onClose();
                    fetchCustomer();
                    onSuccess("បានរក្សាទុកជោគជ័យ");
                    sound_message();
                    setIsLoading(false);
                }
            } else {
                const response = await axios.put(`${url}customer/${dataUpdate.customerId}`, data);
                if (response.data.msg) {
                    handleClear();
                    onClose();
                    fetchCustomer();
                    onSuccess("បានកែប្រែដោយជោគជ័យ");
                    sound_message();
                    setIsLoading(false);
                }
            }
        } catch (err: any) {
            setIsLoading(false);
            if (err.response && err.response.data.err) {
                setErrorMsg(err.response.data.err); 
            } else {
                setErrorMsg("An error occurred. Please try again."); 
            }
           
        }

        function sound_message() {
            new Audio(sound_success).play();
        }
    };

    const handleClear = () => {
        setAddress("");
        setIsCustomer("ជ្រើសរើស");
        setFullName("");
        setEmail("");
        setPhone("");
        setDescription("");
    };

    return (
        <div>
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                    className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4 "
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
                        <MdOutlineAdd className="text-xl" />
                        <h2 className="text-lg font-bold">{dataUpdate ? 'កែប្រែអតិថិជន' : 'បង្កើតអតិថិជន'}</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 my-3">
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="supplierType" className="font-bold font-NotoSansKhmer">
                                    ប្រភេទអតិថិជន: *
                                </label>
                                <select
                                    required
                                    onChange={handleChange}
                                    className="w-full input_text font-NotoSansKhmer"
                                    value={isTypeCustomer}
                                >
                                    <option value="">ជ្រើសរើស</option>
                                    <option value="ផ្ទាល់ខ្លួន" className="font-bold">
                                        ផ្ទាល់ខ្លួន
                                    </option>
                                    <option value="អាជីវកម្ម" className="font-bold">
                                        អាជីវកម្ម
                                    </option>
                                </select>
                            </div>

                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="supplierName" className="font-bold font-NotoSansKhmer">
                                    ឈ្មោះអតិថិជន: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full input_text"
                                    placeholder="ឈ្មោះអតិថិជន"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 my-3">
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="phoneNumber" className="font-bold font-NotoSansKhmer">
                                    លេខទូរស័ព្ទ: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full input_text"
                                    placeholder="លេខទូរស័ព្ទ"
                                />
                            </div>

                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="email" className="font-bold font-NotoSansKhmer">
                                    អ៊ីម៉ែល
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full input_text"
                                    placeholder="អ៊ីម៉ែល"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                            <label htmlFor="address" className="font-bold font-NotoSansKhmer">
                                អាស័យដ្ឋាន
                            </label>
                            <textarea
                                id="description"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full py-5 input_text"
                                placeholder="អាស័យដ្ឋាន"
                            />
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                            <label htmlFor="description" className="font-bold font-NotoSansKhmer">
                                ពិពណ៌នា
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full py-5 input_text"
                                placeholder="ពិពណ៌នា"
                            />
                        </div>

                        {errorMsg && (
                            <div className="msg_error">
                                <strong></strong> {errorMsg}
                            </div>
                        )}

                        <div className="flex justify-end gap-2 my-2">
                            <button type="button" onClick={onClose} className="button_only_close">
                                បោះបង់
                            </button>
                            <button
                                type="submit"
                                className={`button_only_submit font-NotoSansKhmer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'កំពុងរក្សា...' : 'រក្សាទុក'}
                            </button>
                        </div>
                    </form>

                    {successMsg && <MessageSuccess message={successMsg} onClear={() => setSuccessMsg(null)} />}
                </motion.div>
            </div>
        </div>
    );
}

export default CreateCustomer;
