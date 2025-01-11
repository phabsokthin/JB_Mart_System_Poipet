import React, { useState, useMemo } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

interface Data {
    supplierId: number;
    full_Name: string;
}

interface SelectDropdownProps {
    data: Data[]; // Array of data items
    placeholder: string;
    onSelectdata: (data: Data) => void; 
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ data, onSelectdata, placeholder }) => {
    const [showdataDropdown, setShowdataDropdown] = useState<boolean>(false);
    const [dataSearchQuery, setdataSearchQuery] = useState<string>('');
    const [selectedSupplier, setSelectedSupplier] = useState<Data | null>(null);
    

    const filterData = useMemo(() => {
        return data.filter((data) =>
            data.full_Name.toLowerCase().includes(dataSearchQuery.toLowerCase())
        );
    }, [dataSearchQuery, data]);

    const handleSelectdata = (data: Data) => {
        setSelectedSupplier(data);
        onSelectdata(data); 
        setShowdataDropdown(false); // Close dropdown
        setdataSearchQuery(''); // Clear search query
    };

    const toggleSupplierDropdown = () => {
        setShowdataDropdown((prev) => !prev);
    };

    return (
        <div className="relative ">

            <div className='relative'>
                <div
                    className="p-2 cursor-pointer input_text"
                    onClick={toggleSupplierDropdown}
                >
                    {selectedSupplier
                        ? `${selectedSupplier.full_Name}`
                        : 'ជ្រើសរើសអ្នកផ្គត់ផ្គង់'}
                </div>
                <p className='absolute top-2 right-1'><IoMdArrowDropdown size={28}/></p>
            </div>
            {showdataDropdown && (
                <div className="absolute left-0 z-10 w-full p-3 mt-1 bg-white border border-gray-300 shadow-md">
                    <input
                        id="supplierDropdown"
                        type="text"
                        placeholder={placeholder}
                        className="w-full p-2 mb-2 input_text"
                        value={dataSearchQuery}
                        onChange={(e) => setdataSearchQuery(e.target.value)}
                    />
                    <ul className="overflow-y-auto max-h-48">
                        {filterData.length > 0 ? (
                            filterData.map((data) => (
                                <li
                                    key={data.supplierId}
                                    className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
                                    onClick={() => handleSelectdata(data)}
                                >
                                    {`${data.full_Name}`}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">
                                មិនមានឈ្មោះ <b>{dataSearchQuery}</b> ទេ
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;
