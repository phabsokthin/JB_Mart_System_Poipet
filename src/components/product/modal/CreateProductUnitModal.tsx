/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { url } from "../../../api/url";
import sound_success from '../../../assets/sound/success.mp3'


interface dataUpdate {
    unames: string,
    description: string
}

function CreateProductUnitModal({ onClose, fetchData, onSuccess, dataUpdate }: { onClose: () => void, fetchData: () => void, onSuccess: (message: string) => void, dataUpdate: dataUpdate | any }) {

    const [unames, setUnitName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);


    useEffect(() => {
        if (dataUpdate) {
            setUnitName(dataUpdate.unames)
            setDescription(dataUpdate.description)
        }
    }, [dataUpdate])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const data = {
                unames: unames,
                description: description
            }

            if (!dataUpdate) {

                const response = await axios.post(`${url}unit`, data);
                if (response.data.msg) {
                    onSuccess("បានរក្សាទុកជោគជ័យ");
                    sound_message();
                    setIsLoading(false);
                    onClose();
                    fetchData();
                }
            }
            else {
                const response = await axios.put(`${url}unit/${dataUpdate.unitId}`, data);
                if (response.data.msg) {
                    onSuccess("បានកែប្រែជោគជ័យ");
                    sound_message();
                    setIsLoading(false);
                    onClose();
                    fetchData();
                }

            }
        }
        catch (err: any) {
            setIsLoading(false);
            if (err.response && err.response.data.err) {
                setErrorMsg(err.response.data.err);
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
                    <h2 className="text-lg font-bold">{dataUpdate ? 'កែប្រែឯកតា' : 'បង្កើតឯកតាថ្មី'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 space-y-2">
                        <label className="block font-bold text-gray-700 font-NotoSansKhmer ">ឈ្មោះឯកតាទំនិញ: *</label>
                        <input
                            type="text"
                            value={unames}
                            onChange={(e) => setUnitName(e.target.value)}
                            required
                            className="input_text" placeholder="ឈ្មោះឯកតាទំនិញ"
                        />
                    </div>
                    <div className="mb-4 space-y-2">
                        <label htmlFor="productDescription" className="block font-bold text-gray-700 font-NotoSansKhmer">ពិពណ៌នា</label>
                        <textarea placeholder="ពិពណ៌នា"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default CreateProductUnitModal;
