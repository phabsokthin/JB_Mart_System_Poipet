import { FaClipboardList } from "react-icons/fa";

function SupplierList() {
   
    const suppliers = [
        {
            id: 1,
            name: 'John Doe',
            contact: '012345678',
            type: 'ផ្ទាល់ខ្លួន',
            email: 'john@example.com',
            businessName: '',
        },
        {
            id: 2,
            name: 'ABC Corp',
            contact: '0987654321',
            type: 'អាជីវកម្ម',
            email: 'contact@abccorp.com',
            businessName: 'ABC Corp',
        },
        {
            id: 3,
            name: 'Jane Smith',
            contact: '093456789',
            type: 'ផ្ទាល់ខ្លួន',
            email: 'jane@example.com',
            businessName: '',
        },
        {
            id: 4,
            name: 'Jane Smiths',
            contact: '088483843',
            type: 'ផ្ទាល់ខ្លួន',
            email: 'jane@example.com',
            businessName: '',
        },
        {
            id: 5,
            name: 'Jane Smiths',
            contact: '088483843',
            type: 'ផ្ទាល់ខ្លួន',
            email: 'jane@example.com',
            businessName: '',
        },
        {
            id: 6,
            name: 'Jane Smiths',
            contact: '088483843',
            type: 'ផ្ទាល់ខ្លួន',
            email: 'jane@example.com',
            businessName: '',
        },

    ];

    const handleCreateNew = () => {
        window.location.reload()
    }

    return (
        <div className="">
            <div className="flex items-center mb-3 gap-2 ">
                <p><FaClipboardList className="text-lg " /></p>
                <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីអ្នកផ្គត់ផ្គង់</p>
            </div>
            <div className="flex justify-end">

                <button onClick={handleCreateNew} className="button_only_submit">+ បង្កើតអ្នកផ្គត់ផ្គង់ថ្មី</button>


            </div>
            <div className="flex justify-between items-center my-3">
                <div className="flex flex-col gap-2 font-bold font-NotoSansKhmer">
                    <label htmlFor="">ច្រោះតាមចំនួន</label>
                    <select className="input_text w-[100px]">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>
                </div>
                <div>
                    <input type="text" className="input_text w-[300px]" placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់..." />
                </div>
            </div>
            <table className="min-w-full table-auto">
                <thead className="bg-blue-600/90 text-white">
                    <tr className="font-NotoSansKhmer font-bold">
                        <th className=" px-4 py-2">លេខរៀង</th>
                        <th className=" px-4 py-2">ឈ្មោះអ្នកផ្គត់ផ្គង់</th>
                        <th className=" px-4 py-2">ប្រភេទអ្នកផ្គត់ផ្គង់</th>
                        <th className=" px-4 py-2">ឈ្មោះអាជីវកម្ម</th>
                        <th className=" px-4 py-2">លេខទូរស័ព្ទ</th>
                        <th className=" px-4 py-2">អុីម៉ែល</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier, index) => (
                        <tr key={supplier.id} className="text-sm font-NotoSansKhmer">
                            <td className=" px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{supplier.name}</td>
                            <td className=" px-4 py-2">{supplier.type}</td>
                            <td className="px-4 py-2">
                                {supplier.businessName || 'N/A'}
                            </td>
                            <td className="px-4 py-2">{supplier.contact}</td>
                            <td className="px-4 py-2">{supplier.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupplierList;
