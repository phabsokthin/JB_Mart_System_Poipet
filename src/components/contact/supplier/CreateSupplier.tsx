/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { url } from "../../../api/url";
import MessageSuccess from "../../build/message/MessageSuccess";
import sound_success from '../../../assets/sound/success.mp3'

function CreateSupplier() {
    const [isTypeSupplier, setIsSupplier] = useState("");

    const [fullName, setFullName] = useState("");

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("");
    const [loading, setIsLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)

    const handleChange = (event: any) => {
        setIsSupplier(event.target.value);
    };

 

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(`${url}supplier`, {
                supplier_type: isTypeSupplier,
                full_Name: fullName,
                phone: phone,
                email: email,
                address: address,
                description: description,
                
            })

            if(response.data.msg){
                setSuccessMsg("បានរក្សាទុកជោគជ័យ")
                handleClear()
            }

            sound_message();


            setIsLoading(false)
   
        }
        catch (err) {
            console.log(err)
        }

        function sound_message(){
            new Audio(sound_success).play();
        }

    };


    //clear
    const handleClear = () => {
        setAddress("")
        setIsSupplier("ជ្រើសរើស")
        setFullName("")
        setEmail("")
        setPhone("")
        setDescription("")
        
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4 my-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="supplierType" className="font-bold font-NotoSansKhmer">
                            ប្រភេទអ្នកផ្គត់ផ្គង់: *
                        </label>
                        <select
                            required
                            onChange={handleChange}
                            className="input_text w-[300px] font-NotoSansKhmer"
                            value={isTypeSupplier}
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
                        ឈ្មោះអ្នកផ្គត់ផ្គង់: *
                    </label>
                    <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="input_text w-[300px]"
                        placeholder="ឈ្មោះអ្នកផ្គត់ផ្គង់"
                    />
                </div>

                </div>



              


                <div className="flex flex-wrap items-center w-full gap-3">
                  
                        <div className="flex gap-2">

                            <div className="flex flex-col gap-2">
                                <label htmlFor="phoneNumber" className="font-bold font-NotoSansKhmer">
                                    លេខទូរស័ព្ទ: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input_text w-[300px]"
                                    placeholder="លេខទូរស័ព្ទ"
                                />
                            </div>
                        </div>
                  

                  


                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-bold font-NotoSansKhmer">
                            អ៊ីម៉ែល
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input_text w-[300px]"
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

                <div className="flex justify-end my-3">
                    {/* <button type="submit" className="button_only_submit">រក្សាទុក</button> */}


                    <button
                        type="submit"
                        className={`mt-3 button_only_submit font-NotoSansKhmer ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'កំពុងរក្សា...' : 'រក្សាទុក'}
                    </button>
                </div>
            </form>


            {successMsg && <MessageSuccess message={successMsg} onClear={()=>setSuccessMsg(null)}/>}

        </div>
    );
}

export default CreateSupplier;
