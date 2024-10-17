import { useState } from "react";

function CreateSupplier() {
    const [isTypeSupplier, setIsSupplier] = useState("");

    const [supplierName, setSupplierName] = useState("");
    const [halfSupplierName, setHalfSupplierName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [businessName, setBussinessName] = useState("");
    const [businessPhone, setBussinessPhone] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const handleChange = (event: any) => {
        setIsSupplier(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = {
            supplierType: isTypeSupplier,
            supplierName,
            halfSupplierName,
            phoneNumber,
            businessName,
            businessPhone,
            supplierId,
            email,
            description
        };
        console.log(formData); // Process form data or send to server
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="supplierType" className="font-NotoSansKhmer font-bold">
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
                </div>

                <div className="flex flex-wrap gap-3 items-center w-full">
                    {isTypeSupplier === "ផ្ទាល់ខ្លួន" && (
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="supplierName" className="font-NotoSansKhmer font-bold">
                                    ឈ្មោះអ្នកផ្គត់ផ្គង់: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={supplierName}
                                    onChange={(e) => setSupplierName(e.target.value)}
                                    className="input_text w-[300px]"
                                    placeholder="ឈ្មោះអ្នកផ្គត់ផ្គង់"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="halfSupplierName" className="font-NotoSansKhmer font-bold">
                                    ឈ្មោះអ្នកផ្គត់ផ្គង់(ឈ្មោះកាត់)
                                </label>
                                <input
                                    type="text"
                                    id="halfSupplierName"
                                    value={halfSupplierName}
                                    onChange={(e) => setHalfSupplierName(e.target.value)}
                                    className="input_text w-[300px]"
                                    placeholder="ឈ្មោះអ្នកផ្គត់ផ្គង់"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phoneNumber" className="font-NotoSansKhmer font-bold">
                                    លេខទូរស័ព្ទ: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="input_text w-[300px]"
                                    placeholder="លេខទូរស័ព្ទ"
                                />
                            </div>
                        </div>
                    )}

                    {isTypeSupplier === "អាជីវកម្ម" && (
                        <div className="flex gap-2">
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="businessName" className="font-NotoSansKhmer font-bold">
                                    ឈ្មោះអាជីវកម្ម: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={businessName}
                                    onChange={(e) => setBussinessName(e.target.value)}
                                    className="input_text w-[300px]"
                                    placeholder="ឈ្មោះអាជីវកម្ម"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="businessPhone" className="font-NotoSansKhmer font-bold">
                                    លេខទូរស័ព្ទ: *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={businessPhone}
                                    onChange={(e) => setBussinessPhone(e.target.value)}
                                    className="input_text w-[300px]"
                                    placeholder="លេខទូរស័ព្ទ"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="supplierID" className="font-NotoSansKhmer font-bold">
                            លេខសម្គាល់ទំនាក់ទំនង
                        </label>
                        <input
                            type="text"
                            id="supplierID"
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                            className="input_text w-[300px]"
                            placeholder="លេខសម្គាល់ទំនាក់ទំនង"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-NotoSansKhmer font-bold">
                            អ៊ីម៉ែល
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input_text w-[300px]"
                            placeholder="អ៊ីម៉ែល"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 mt-3">
                    <label htmlFor="description" className="font-NotoSansKhmer font-bold">
                        ពិពណ៌នា
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input_text w-full py-5"
                        placeholder="ពិពណ៌នា"
                    />
                </div>

                <div className="flex justify-end my-3">
                    <button type="submit" className="button_only_submit">រក្សាទុក</button>
                </div>
            </form>
        </div>
    );
}

export default CreateSupplier;