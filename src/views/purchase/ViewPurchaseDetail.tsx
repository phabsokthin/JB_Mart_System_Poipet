import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { url } from '../../api/url';
import { useParams } from 'react-router-dom';
import { IoPrint } from 'react-icons/io5';
import { IoNewspaperOutline } from "react-icons/io5";

// Define the type for a single purchase item
interface PurchaseItem {
    purchaseId: number;
    purchaseNo: number;
    supplierId: number;
    productId: number;
    status_receive: string | null;
    cost_price: number;
    qty: number;
    include_tax: number;
    total: number;
    sell_price: number;
    discount: number;
    total_amount: number;
    payment_amount: number;
    balance: number;
    date_purchase: string;
    bankId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    bankId_for_purchase: {
        bankName: string;
    };
    supplierId_for_purchase: {
        full_Name: string;
    };
    productId_for_purchase: {
        pname: string;
    } | null;
    userId_for_purchase: {
        userName: string;
    };
}

function ViewPurchaseDetail() {
    const [viewPurchase, setViewPurchase] = useState<PurchaseItem[]>([]);
    const { id } = useParams<{ id: string }>();

    const fetchData = async () => {
        const response = await fetch(`${url}purchase/${id}`);
        if (response.ok) {
            const data: PurchaseItem[] = await response.json();
            setViewPurchase(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const totalAmount = viewPurchase.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = viewPurchase[0]?.discount || 0;
    const finalTotal = totalAmount - discountAmount;

    // Function to handle print
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='grid min-h-screen grid-cols-6'>
            {/* Sidebar - Hidden when printing */}
            <div className="h-screen print:hidden">
                <div className="sticky top-0 z-10">
                    <Sidebar />
                </div>
            </div>

            <div className="col-span-5 p-4">
                {/* Navbar - Hidden when printing */}
                <div className="print:hidden">
                    <Navbar />
                </div>

                {/* Purchase Details - Visible when printing */}
                <div className="p-4 mt-5 bg-white print:bg-transparent dark:border-gray-700 print:bg-white print:p-0 print:shadow-none">
                    <h1 className="flex items-center gap-1 mb-4 text-2xl font-bold"><IoNewspaperOutline/> <span>ព័ត៌មានលម្អិតអំពីការទិញ</span> </h1>
                    {viewPurchase.length > 0 && (
                        <div className="p-6 border shadow-sm print:border-0 print:shadow-none">
                            {/* Company and Recipient Details */}
                            <div className="flex justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold">ចែប៊ីម៉ាត់ប៉ោយប៉ែត</h2>
                                    <p>1331 Hart Ridge Road</p>
                                    <p>48436 Gaines, MI</p>
                                    <p>VAT no.: 987654321</p>
                                    <p>your.mail@gmail.com</p>
                                    <p>m +380 989 271 3115</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">អ្នកផ្គត់ផ្គង់</h2>
                                    <p>{viewPurchase[0].supplierId_for_purchase?.full_Name}</p>
                                    <p>4304 Liberty Avenue</p>
                                    <p>92680 Tustin, CA</p>
                                    <p>VAT no.: 12345678</p>
                                    <p>company.mail@gmail.com</p>
                                    <p>m +386 714 505 8385</p>
                                </div>
                            </div>

                            {/* Invoice Details */}
                            <div className="flex justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold">លេខវិក្កយបត្រ.</h2>
                                    <p>00{viewPurchase[0].purchaseNo}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">កាលបរិច្ឆេទវិក្កយបត្រ</h2>
                                    <p>{new Date(viewPurchase[0].date_purchase).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Purchase Items Table */}
                            <table className="w-full mb-8">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-2 text-left">ផលិតផល</th>
                                        <th className="p-2 text-left">បរិមាណ</th>
                                        <th className="p-2 text-left">អត្រា</th>
                                        <th className="p-2 text-left">ចំនួន</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewPurchase.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2">{item.productId_for_purchase?.pname || 'N/A'}</td>
                                            <td className="p-2">{item.qty}</td>
                                            <td className="p-2">${item.cost_price}</td>
                                            <td className="p-2">${item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Totals */}
                            <div className="space-y-1 text-right">
                                <p><span>សរុប:</span> ${totalAmount.toFixed(2)}</p>
                                <p><span>បញ្ចុះតម្លៃ ({discountAmount}%):</span> ${discountAmount}</p>
                                <p><span>សរុបរួម:</span> ${finalTotal.toFixed(2)}</p>
                                <p><span>ចំនួនចំណាយ:</span> ${viewPurchase[0].payment_amount}</p>
                                <p><span>សម្យតុលសាច់ប្រាក់:</span> ${viewPurchase[0].balance}</p>

                                <div>
                                    {viewPurchase[0].balance === 0 ? (
                                        <p><span></span> <span className='p-1 text-xs text-white bg-green-500 rounded-full'>បានបង់</span></p>
                                    ) : viewPurchase[0].balance > 0.5 * finalTotal ? (
                                        <p><span></span> <span className='p-1 text-xs text-white bg-red-500 rounded-full'>ជំពាក់</span></p>
                                    ) : (
                                        <p><span></span> <span className='p-1 text-xs bg-yellow-400 rounded-full'>បានបង់ខ្លះ</span></p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="mt-8">
                                <p>Transfer the amount to the business account below. Please include invoice number on your check.</p>
                                <p><span>គណនី:</span> {viewPurchase[0].bankId_for_purchase?.bankName}</p>
                                <p><span>IBAN:</span> 6882-1111-2222-3333</p>
                            </div>
                        </div>
                    )}

                     {/* Print Button - Hidden when printing */}
                <div className='flex justify-end my-2 print:hidden'>
                    <button
                        className='flex items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700'
                        onClick={handlePrint}
                    >
                        <IoPrint /> <span>បោះពុម្ភ</span>
                    </button>
                </div>
                </div>

               
            </div>
        </div>
    );
}

export default ViewPurchaseDetail;