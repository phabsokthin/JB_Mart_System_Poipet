/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { BiPurchaseTag } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DateInputFormat from "../../components/build/EnglishDateInputComponents/InputFormateDateComponent";
import SelectDropdown from "../../components/build/selectDropdown/SelectDropdown";
import axios from "axios";
import { url } from "../../api/url";
import MessageError from "../../components/build/message/MessageError";
import sound_err from '../../assets/sound/failed.mp3';
import MessageSuccess from "../../components/build/message/MessageSuccess";
import sound_success from '../../assets/sound/success.mp3';
import { jwtDecode } from 'jwt-decode'
import { useParams } from "react-router-dom";

type Product = {
    productId: number;
    pname: string;
    const_price: number;
    qty: number;
    cost: number;
    unit: string;
    description: string;
    datetime: string;
};



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
function UpdatePurchase() {
    const { id } = useParams()
    const [productSearchQuery, setProductSearchQuery] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const [totalAmount, setTotalAmount] = useState(0);
    const [payment, setPayment] = useState<number | undefined>(undefined);
    const [remainingAmount, setRemainingAmount] = useState<number>(totalAmount);
    const [discount, setDiscount] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [suppliers, setSupplier] = useState([])
    // const [sellPrice, setSellPrice] = useState(0)

    const [productList, setProduList] = useState<Product[]>([]);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [bank, setBank] = useState([])
    const [selectBank, setSelectBank] = useState("")
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errMsg2, setErrMsg2] = useState(false);
    const [viewPurchase, setViewPurchase] = useState<PurchaseItem[]>([]);

    const [updatedViewPurchase, setUpdatedViewPurchase] = useState<PurchaseItem[]>([]);


    interface DecodedToken {
        userId: number;
        exp: number;
        iat?: number;
    }
    //get User ID
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState<null | string | number>(null)


    useEffect(() => {
        refreshToken();
    }, [])


    const refreshToken = async () => {
        try {
            const response = await axios.get(`${url}token`);
            setToken(response.data.accessToken);
            const decoded = jwtDecode<DecodedToken>(response.data.accessToken);
            // console.log(decoded)
            setUserId(decoded.userId)
        }
        catch (err: any) {
            console.log(err)
        }
    }

    //calculate Proeduct
    const [productDetails, setProductDetails] = useState<{
        [key: number]: {
            const_price: number;
            qty: number;
            discount: number;
            tax: number;
            sellPrice: number,
        };
    }>({});


    useEffect(() => {
        const initialProductDetails = selectedProducts.reduce((acc: any, product) => {
            acc[product.productId] = {
                const_price: product.const_price || 0,
                qty: 1,
                discount: 0,
                tax: 0,
                sellPrice: product.const_price || 0,
            };
            return acc;
        }, {});
        setProductDetails(initialProductDetails);
    }, [selectedProducts]);


    const handleViewPurchaseFieldChange = (purchaseId: number, field: string, value: any) => {
        setViewPurchase((prevPurchases) =>
            prevPurchases.map((purchase) =>
                purchase.purchaseId === purchaseId ? { ...purchase, [field]: value } : purchase
            )
        );
    };


    useEffect(() => {
        if (viewPurchase.length > 0) {
            // Initialize updatedViewPurchase with the fetched viewPurchase data
            setUpdatedViewPurchase(viewPurchase);
        }
    }, [viewPurchase]);

    useEffect(() => {
        const calculateTotalAmount = () => {
            // Calculate the total for selected products
            const selectedProductsTotal = selectedProducts.reduce((acc, product) => {
                const cost = productDetails[product.productId]?.const_price || product.const_price || 0;
                const qty = productDetails[product.productId]?.qty || product.qty || 1;
                const tax = productDetails[product.productId]?.tax || 0;
                const discount = productDetails[product.productId]?.discount || 0;
                return acc + cost * qty + tax - discount;
            }, 0);

            // Calculate the total for updatedViewPurchase
            const viewPurchaseTotal = updatedViewPurchase.reduce((sum, purchase) => {
                const cost = purchase.cost_price || 0;
                const qty = purchase.qty || 1;
                const tax = purchase.include_tax || 0;
                const discount = purchase.discount || 0;
                return sum + (cost * qty + tax - discount);
            }, 0);

            // Set the total amount
            setTotalAmount(selectedProductsTotal + viewPurchaseTotal);
        };

        calculateTotalAmount();
    }, [selectedProducts, productDetails, updatedViewPurchase]);






    useEffect(() => {
        // calculateTotalAmount();
        handlecalculatedRemainingAmount();
        fetchBank();
    }, [productDetails, selectedProducts, payment, discount, totalAmount]);

    const [showProductDropdown, setShowProductDropdown] =
        useState<boolean>(false);

    const [selectedSupplier, setSelectedSupplier] = useState<{
        supplierId: number;
        full_Name: string;
    } | null>(null);

    const handleAddProduct = (product: Product) => {
        // Check if the product already exists in selectedProducts
        const isInSelectedProducts = selectedProducts.some(
            (p) => p.productId === product.productId
        );

        // Check if the product already exists in viewPurchase
        const isInViewPurchase = viewPurchase.some(
            (purchase) => purchase.productId === product.productId
        );

        if (isInSelectedProducts || isInViewPurchase) {
            setErrMsg(`ផលិតផលនេះ ${product.pname} មានហើយ`);
            err_message();
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }

        setProductSearchQuery("");
        setShowProductDropdown(false);
    };

    //remove
    const handleRemoveProduct = (productId: number) => {
        // Remove from selectedProducts
        setSelectedProducts((prev) =>
            prev.filter((product) => product.productId !== productId)
        );

        // Remove from viewPurchase
        setViewPurchase((prev) =>
            prev.filter((purchase) => purchase.productId !== productId)
        );
    };
    //search product
    const filteredProducts = productList.filter((product) =>
        product.pname.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    const handleProductSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProductSearchQuery(e.target.value);
        setShowProductDropdown(e.target.value.length > 0);
    };

    //filter supplier
    const handleProductconst_priceChange = (productId: number, const_price: number) => {
        setProductDetails((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], const_price },
        }));
    };

    const handleQtyChange = (productId: number, qty: number) => {
        setProductDetails((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], qty },
        }));
    };

    const handleDiscountChange = (productId: number, discount: number) => {
        setProductDetails((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], discount },
        }));
    };
    const handleTaxChange = (productId: number, tax: number) => {
        setProductDetails((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], tax },
        }));
    };


    const handlecalculatedRemainingAmount = () => {
        const calculatedRemainingAmount = totalAmount - (payment ?? 0) - discount;
        setRemainingAmount(calculatedRemainingAmount);
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =
            e.target.value === "" ? undefined : Math.max(1, Number(e.target.value));
        setPayment(value);
    };



    const handleDiscountChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =
            e.target.value === "" ? 0 : Math.max(1, Number(e.target.value));
        setDiscount(value);
    };

    const handleSellPriceChange = (productId: number, value: number) => {
        setProductDetails((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], sellPrice: value },
        }));
    };


    //fetch supplier

    const fetchdata = async () => {
        try {
            const response = await axios.get(`${url}supplier`);
            if (response.data) {
                setSupplier(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };


    //fetch product
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${url}product`);
            if (response.data) {
                setProduList(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    useEffect(() => {
        fetchdata();
        fetchProduct();
    }, []);



    //fetch data supplier
    const handleSelectdata = (data: { supplierId: number; full_Name: string }) => {
        console.log("Selected supplier:", data);
        setSelectedSupplier(data);
    };


    const resetProductDetails = () => {
        setProductDetails({});
    };

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    const currentDate = new Date().toISOString().split("T")[0];

    function err_message() {
        new Audio(sound_err).play();
    }

    //fetch bank

    const fetchBank = async () => {
        try {
            const response = await axios.get(`${url}bank`);
            if (response.data) {
                setBank(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    //select bank 

    const handleSelectBank = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectBank(e.target.value)
    }



    const resetForm = () => {

        setRemainingAmount(totalAmount);
        setSelectedSupplier(null);
        setPayment(0);
        setDiscount(0);
        setErrMsg2(false);
    };


    //const handle close handleError
    const handleClose = () => {
        setErrMsg2(false);
    };

    function sound_message() {
        new Audio(sound_success).play();
    }

    const fetchData = async () => {
        const response = await fetch(`${url}purchase/${id}`);
        if (response.ok) {
            const data = await response.json();
            setViewPurchase(data);

        }
    };


    useEffect(() => {
        fetchData();
    }, [])




  
  
 
  
 


    //handle display viewPurhase 
    useEffect(() => {
        if (viewPurchase.length > 0 && viewPurchase[0]?.bankId !== undefined) {
            setSelectBank(viewPurchase[0]?.bankId.toString());
        }
    }, [viewPurchase]);




  
    const handleUpdatePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Default date fallback
        const dateToSubmit = selectedDate || new Date().toISOString().split("T")[0];
        console.log("Submitting date:", dateToSubmit);
    
        // Merge selectedProducts with existing viewPurchase, ensuring no duplicates
        const uniqueProducts = [
            ...viewPurchase, // Keep all products from viewPurchase
            ...selectedProducts.filter(
                (sp) => !viewPurchase.some((vp) => vp.productId === sp.productId) // Add only new products from selectedProducts
            ),
        ];

        
    
        // Log uniqueProducts for debugging
        console.log("uniqueProducts:", uniqueProducts);
    
        // Sort viewPurchase by purchaseNo to find gaps for purchaseNo
        const sortedPurchaseNos = viewPurchase
            .map((purchase) => purchase.purchaseNo)
            .sort((a, b) => a - b);
    
        // Find the first gap in the sequence for purchaseNo
        let nextPurchaseNo = sortedPurchaseNos[sortedPurchaseNos.length - 1] + 1;
        for (let i = 0; i < sortedPurchaseNos.length - 1; i++) {
            if (sortedPurchaseNos[i + 1] !== sortedPurchaseNos[i] + 1) {
                nextPurchaseNo = sortedPurchaseNos[i] + 1;
                break;
            }
        }
    
        // Prepare the data object
        const data = {
            bankId: selectBank ?? viewPurchase?.[0]?.bankId,
            userId: userId,
            purchases: uniqueProducts.map((product) => {
                const existingProduct = viewPurchase.find(
                    (p: PurchaseItem) => p.productId === product.productId
                );
    
                const productData = productDetails[product.productId] || {};
                const cost_price = productData.const_price || existingProduct?.cost_price || 0;
                const qty = productData.qty || existingProduct?.qty || 0;
                const include_tax = productData.tax || existingProduct?.include_tax || 0;
                const sell_price = productData.sellPrice || existingProduct?.sell_price;
    
                // Assign purchaseNo: use existing purchaseNo if the product is in viewPurchase, otherwise assign a new one
                const purchaseNo = existingProduct ? existingProduct.purchaseNo : nextPurchaseNo++;
    
                return {
                    purchaseNo,
                    supplierId: selectedSupplier?.supplierId || existingProduct?.supplierId || viewPurchase?.[0]?.supplierId,
                    productId: product.productId,
                    cost_price,
                    qty,
                    include_tax,
                    sell_price,
                    total: qty * cost_price,
                    date_purchase: dateToSubmit,
                };
            }),
            total_amount: totalAmount,
            balance: remainingAmount,
            payment_amount: payment ?? viewPurchase?.[0]?.payment_amount ?? 0, // Ensure it is not undefined
            discount: discount,
        };
    
        try {
            console.log("Data to display:", data);
            const response = await axios.put(`${url}purchase/`, data); // Ensure the endpoint is correct
            if (response.data.success) {
                setSuccessMsg("បានកែប្រែការទិញដោយជោគជ័យ");
                resetProductDetails();
                setSelectedProducts([]);
                sound_message();
            } else {
                setErrMsg2(response.data.message || "កំហុសក្នុងការបង្ហាញទិន្នន័យ");
            }
        } catch (error: any) {
            setErrMsg2(error.response?.data?.message || "កំហុសក្នុងការបង្ហាញទិន្នន័យ");
            console.error("Display error:", error);
        }
    };


    return (
        <div className="grid min-h-screen grid-cols-6 select-none">
            <div className="h-screen">
                <div className="sticky top-0 z-10">
                    <Sidebar />
                </div>
            </div>

            <div className="col-span-5 p-4">
                <Navbar />


                <div>
                    {
                        errMsg2 && (
                            <div className="flex items-center justify-between msg_error">
                                <p>{errMsg2} </p>
                                <IoMdClose onClick={handleClose} className="cursor-pointer hover:text-gray-200" size={20} />
                            </div>
                        )
                    }
                </div>
                <div className="p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">

                    <div className="flex items-center gap-2 ">
                        <BiPurchaseTag className="text-xl" />
                        <p className="text-lg font-bold font-NotoSansKhmer">ការទិញផលិតផល </p>
                    </div>
                    {errMsg && <MessageError message={errMsg} onClear={() => setErrMsg(null)} />}



                    {successMsg && <MessageSuccess message={successMsg} onClear={() => setSuccessMsg(null)} />}

                    <form onSubmit={handleUpdatePurchase}>
                        {/* input for userId */}
                        <input type="text" value={viewPurchase[0]?.userId ?? ''} hidden />

                        <div className="grid grid-cols-3 gap-2 mt-6">
                            <div className="relative space-y-2">
                                <label htmlFor="supplierDropdown" className="font-bold font-NotoSansKhmer">
                                    អ្នកផ្គត់ផ្គង់: *
                                </label>
                                <SelectDropdown
                                    data={suppliers} // Array of suppliers
                                    onSelectdata={handleSelectdata}
                                    selectedValue={viewPurchase?.[0]?.supplierId} // Pass selected supplier ID for update
                                    placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់"
                                />

                            </div>

                            <div className="space-y-2">
                                <label htmlFor="" className="font-bold font-NotoSansKhmer">
                                    កាលបរិច្ឆេតទិញ
                                </label>
                                <div>
                                    <DateInputFormat
                                        initialValue={currentDate || viewPurchase[0]?.date_purchase} // Set the initial date from viewPurchase
                                        onDateChange={handleDateChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative items-center gap-3 mx-auto my-10">
                            <div className="relative">
                                <div className="flex justify-center">
                                    <input
                                        type="text"
                                        className="input_text w-[80%]"
                                        placeholder="ស្វែងរកផលិតផល"
                                        value={productSearchQuery}
                                        onChange={handleProductSearchChange}
                                    />
                                    <div className="absolute right-[22%] top-3.5">
                                        <FaSearch className="text-gray-400" />
                                    </div>
                                </div>
                                <div className="absolute top-0 right-[10%]">
                                    <button className="py-2.5 button_only_submit">+ បន្ថែមផលិតផល</button>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                {showProductDropdown && (
                                    <ul className="absolute z-[2] w-[995px] left-[10%] mt-1 overflow-y-auto bg-white border border-gray-300 shadow-md max-h-48">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <li
                                                    key={product.productId}
                                                    className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
                                                    onClick={() => handleAddProduct(product)}
                                                >
                                                    {product.pname} || ចំនួន {product.qty}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-2 text-gray-500 font-NotoSansKhmer">
                                                មិនមានផលិតផល ឈ្មោះនេះ <span className="font-bold">{productSearchQuery}</span> ទេ!
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Display selected products */}
                        <div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold">កំណត់ការបញ្ជាទិញ</h3>
                                <table className="w-full mt-4 border-collapse">
                                    <thead className="p-2 text-white bg-blue-600/90">
                                        <tr>
                                            <th className="p-2 border w-[7%]">លេខរៀង</th>
                                            <th className="p-2 border w-[20%]">ឈ្មោះផលិតផល</th>
                                            <th className="p-2 border w-[10%]">តម្លៃដើម(ឯកតា)</th>
                                            <th className="p-2 border w-[12%]">បរិមាណទិញចូល</th>
                                            {/* <th className="p-2 border w-[12%]">បញ្ចុះតម្លៃ</th> */}
                                            <th className="p-2 border w-[12%]">ពន្ធសរុប</th>
                                            <th className="p-2 border w-[12%]">តម្លៃលក់</th>
                                            <th className="p-2 border w-[15%]">សរុប</th>
                                            <th className="p-2 border w-[5%]">
                                                <p className="text-center">ស្ថានភាព</p>
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {/* Render selectedProducts if available */}
                                        {selectedProducts.length > 0 && selectedProducts.map((product, index) => (
                                            <tr key={product.productId}>
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">
                                                    {product.pname}
                                                    <p className="text-xs text-gray-500">
                                                        មានស្តុកនៅសល់ {productDetails[product.productId]?.qty}
                                                        <br />
                                                        តម្លៃលក់ {product.const_price}
                                                    </p>
                                                </td>

                                                {/* const_price Input */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={productDetails[product.productId]?.const_price || product.const_price || ""}
                                                        onChange={(e) => handleProductconst_priceChange(product.productId, Number(e.target.value))}
                                                        className="bg-gray-0 input_text"
                                                    />
                                                </td>

                                                {/* Quantity Input */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={productDetails[product.productId]?.qty || product.qty || ""}
                                                        onChange={(e) => handleQtyChange(product.productId, Number(e.target.value))}
                                                        className="input_text"
                                                    />
                                                </td>

                                                {/* Tax Input */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={productDetails[product.productId]?.tax || ""}
                                                        onChange={(e) => handleTaxChange(product.productId, Number(e.target.value))}
                                                        className="input_text"
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={productDetails[product.productId]?.sellPrice || ""}
                                                        onChange={(e) => handleSellPriceChange(product.productId, Number(e.target.value))}
                                                        className="input_text"
                                                    />
                                                </td>

                                                {/* Total const_price Calculation */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={((productDetails[product.productId]?.const_price || 0) *
                                                            (productDetails[product.productId]?.qty || 1) -
                                                            (productDetails[product.productId]?.discount || 0) +
                                                            (productDetails[product.productId]?.tax || 0)) || 0}
                                                        readOnly
                                                        className="bg-gray-100 input_text"
                                                    />
                                                </td>

                                                {/* Remove Product Button */}
                                                <td className="p-2">
                                                    <div className="flex justify-center">
                                                        <button
                                                            className="p-2 text-white bg-red-500 hover:text-white hover:bg-red-400"
                                                            onClick={() => handleRemoveProduct(product.productId)}
                                                        >
                                                            <IoMdClose />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        {/* Render viewPurchase if available and selectedProducts exists */}

                                        {/* Store for Update */}

                                        {updatedViewPurchase.length > 0 && updatedViewPurchase.map((purchase, index) => (
                                            <tr key={purchase.purchaseId}>
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">
                                                    {purchase.productId_for_purchase?.pname}
                                                    <p className="text-xs text-gray-500">
                                                        <br />
                                                        តម្លៃលក់ {purchase.cost_price}
                                                    </p>
                                                </td>

                                                {/* const_price Input (for update) */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={purchase.cost_price || ""}
                                                        onChange={(e) =>
                                                            handleViewPurchaseFieldChange(
                                                                purchase.purchaseId,
                                                                "cost_price",
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        className="bg-gray-0 input_text"
                                                    />
                                                </td>

                                                {/* Quantity Input (for update) */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={purchase.qty || ""}
                                                        onChange={(e) =>
                                                            handleViewPurchaseFieldChange(
                                                                purchase.purchaseId,
                                                                "qty",
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        className="input_text"
                                                    />
                                                </td>

                                                {/* Tax Input (for update) */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={purchase.include_tax || ""}
                                                        onChange={(e) =>
                                                            handleViewPurchaseFieldChange(
                                                                purchase.purchaseId,
                                                                "include_tax",
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        className="input_text"
                                                    />
                                                </td>

                                                {/* Sell Price Input (for update) */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={purchase.sell_price || ""}
                                                        onChange={(e) =>
                                                            handleViewPurchaseFieldChange(
                                                                purchase.purchaseId,
                                                                "sell_price",
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        className="input_text"
                                                    />
                                                </td>

                                                {/* Total const_price Calculation (for update) */}
                                                <td>
                                                    <input
                                                        min={0}
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={
                                                            (purchase.cost_price || 0) * (purchase.qty || 1) -
                                                            (purchase.discount || 0) +
                                                            (purchase.include_tax || 0)
                                                        }
                                                        readOnly
                                                        className="bg-gray-100 input_text"
                                                    />
                                                </td>

                                                {/* Remove Product Button */}
                                                <td className="p-2">
                                                    <div className="flex justify-center">
                                                        <button
                                                            className="p-2 text-white bg-red-500 hover:text-white hover:bg-red-400"
                                                            onClick={() => handleRemoveProduct(purchase.productId)}
                                                        >
                                                            <IoMdClose />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-3">
                                <h3 className="text-lg font-semibold">បន្ថែមការទូទាត់</h3>
                                <hr className="my-2" />
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2">
                                        <label htmlFor="">ចំនួនការទូទាត់សរុប($)</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            min={0}
                                            value={totalAmount}
                                            readOnly
                                            className="bg-gray-100 input_text"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="">ចំនួនទឹកប្រាក់បញ្ចុះតម្លៃ</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={discount || viewPurchase?.[0]?.discount || 0}
                                            onChange={(e) => setDiscount(Number(e.target.value))}
                                            className="input_text"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="">ទូទាត់សាច់ប្រាក់($): *</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={payment !== undefined ? payment : viewPurchase?.[0]?.payment_amount ?? 0}
                                            onChange={(e) => setPayment(Number(e.target.value))}
                                            className="input_text"
                                        />

                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="">គណនី</label>
                                        <select
                                            required
                                            value={selectBank !== undefined ? selectBank : viewPurchase[0]?.bankId ?? ""}
                                            onChange={(e) => setSelectBank(e.target.value)}
                                            className="input_text"
                                        >
                                            <option value="">--ជ្រើសរើស--</option>
                                            <option value="0">បង់ផ្ទាល់</option>
                                            {bank.map((item: any, index) => (
                                                <option key={index} value={item.bankId}>
                                                    {item.bankName}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="">ចំនួននៅសល់($)</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={
                                                (totalAmount || viewPurchase?.[0]?.total_amount || 0) -
                                                (discount || viewPurchase?.[0]?.discount || 0) -
                                                (payment || viewPurchase?.[0]?.payment_amount || 0)
                                            }
                                            readOnly
                                            className="bg-gray-100 input_text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600"
                            >
                                រក្សាទុក
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>


    );
}
export default UpdatePurchase;
