/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";

import sound_success from '../../assets/sound/success.mp3'
import { url } from "../../api/url";


interface dataUpdate {
    bankName: string,
    note: string
}

function CreateBank({ onClose, fetchData, onSuccess, dataUpdate }: { onClose: () => void, fetchData: () => void, onSuccess: (message: string) => void, dataUpdate: dataUpdate | any }) {


    const [bankType, setBankType] = useState([])
    const [selectBankType, setSelectBankType] = useState("")
    const [bankName, setBankName] = useState("")
    const [bankNumber, setBankNumber] = useState("")
    const [balance, setBalance] = useState(0)
    const [note, setNote] = useState("")
    const [loading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);


    

    useEffect(() => {
        if (dataUpdate) {
            setSelectBankType(dataUpdate.bankTypeId)
            setBankNumber(dataUpdate.bankNumber)
            setBankName(dataUpdate.bankName)
            setBalance(dataUpdate.balance)
            setNote(dataUpdate.note)
        }

        fetchBankType();
    }, [dataUpdate])


    const handleChnageBankType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectBankType(e.target.value)
    }

    const fetchBankType = async () => {
        try {
          const response = await axios.get(`${url}bankType`);
          if (response.data) {
            setBankType(response.data);
          }
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const data = {
                bankTypeId: selectBankType,
                bankNumber: bankNumber,
                bankName: bankName,
                balance: balance,
                status: true,
                note: note
            }

            if (!dataUpdate) {

                const response = await axios.post(`${url}bank`, data);
                if (response.data.msg) {
                    onSuccess(response.data.msg);
                    sound_message();
                    setIsLoading(false);
                    onClose();
                    fetchData();
                }
            }
            else {
                const response = await axios.put(`${url}bank/${dataUpdate.bankId}`, data);
                if (response.data.msg) {
                    onSuccess(response.data.msg);
                    sound_message();
                    setIsLoading(false);
                    onClose();
                    fetchData();
                }

            }
        }
        catch (err: any) {
            setIsLoading(false);
            if (err.response && err.response.data.msg) {
                setErrorMsg(err.response.data.msg);
            } else {
                setErrorMsg("An error occurred. Please try again.");
            }

        }
        finally {
            setIsLoading(false)
        }

    };

    function sound_message() {
        new Audio(sound_success).play();
    }



    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4 "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
                    <MdOutlineAddCircle className="text-xl" />
                    <h2 className="text-lg font-bold">{dataUpdate ? 'កែប្រែគណនី' : 'បង្កើតគណនីថ្មី'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 space-y-2">
                        <label className="block font-bold text-gray-700 font-NotoSansKhmer ">ប្រភេទគណនី: *</label>
                        <select required value={selectBankType} onChange={handleChnageBankType} className="input_text">
                            <option value="" selected disabled>--ជ្រើសរើសគណនី--</option>
                            {bankType.map((bank: any) => (
                                <option key={bank.bankTypeId} value={bank.bankTypeId}>{bank.names}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 space-y-2">
                        <label className="block font-bold text-gray-700 font-NotoSansKhmer ">លេខគណនី: *</label>
                        <input
                            type="text"
                            value={bankNumber}
                            onChange={(e) => setBankNumber(e.target.value)}
                            required
                            className="input_text" placeholder="លេខគណនី"
                        />
                    </div>

                    <div className="mb-4 space-y-2">
                        <label className="block font-bold text-gray-700 font-NotoSansKhmer ">ឈ្មោះគណនី: *</label>
                        <input
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            required
                            className="input_text" placeholder="ឈ្មោះគណនី"
                        />
                    </div>

                    <div className="mb-4 space-y-2">
                        <label className="block font-bold text-gray-700 font-NotoSansKhmer ">សាច់ប្រាក់</label>
                        <input
                            type="number"
                            min={0}
                            value={balance}
                            onChange={(e) => setBalance(Number(e.target.value))}
                            required
                            className="input_text" placeholder="សាច់ប្រាក់"
                        />
                    </div>
                    
                    <div className="mb-4 space-y-2">
                        <label htmlFor="productnote" className="block font-bold text-gray-700 font-NotoSansKhmer">ពិពណ៌នា</label>
                        <textarea placeholder="ពិពណ៌នា"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="input_text"
                            rows={5}
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


            </motion.div>
        </div>
    );
}

export default CreateBank;
