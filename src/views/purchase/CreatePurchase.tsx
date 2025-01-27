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



function CreatePurchase() {
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


  useEffect(() => {
    calculateTotalAmount();
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
    if (selectedProducts.find((p) => p.productId === product.productId)) {
      setErrMsg(`ផលិតផលនេះ ${product.pname} មានហើយ`);
      err_message()
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
    setProductSearchQuery("");
    setShowProductDropdown(false);
  };

  //remove
  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.productId !== productId)
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


  const calculateTotalAmount = () => {
    const total = selectedProducts.reduce((sum, product) => {
      const productDetail = productDetails[product.productId] || {};
      const const_price = productDetail.const_price || product.const_price || 1;
      const qty = productDetail.qty || 1;
      const discount = productDetail.discount || 0;
      const tax = productDetail.tax || 0;

      return sum + (const_price * qty - discount + tax);
    }, 0);

    setTotalAmount(total);
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






  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Default date fallback
    const dateToSubmit = selectedDate || new Date().toISOString().split("T")[0];
    console.log("Submitting date:", dateToSubmit);

    if (!selectedSupplier) {
      setErrMsg("សូមជ្រើសរើសអ្នកផ្គត់ផ្គង់");
      return;
    }

    // Validation
    if (selectedProducts.length === 0) {
      setErrMsg("សូមបញ្ចូលផលិតផល ឬ​ ស្កែនកូដផលិតផល");
      return;
    }

    // Prepare the data object with only productId for the products array
    const data = {
      bankId: selectBank,
      userId: userId,

      purchases: selectedProducts.map((product) => ({
        supplierId: selectedSupplier.supplierId,
        productId: product.productId,
        cost_price: productDetails[product.productId]?.const_price,
        qty: productDetails[product.productId]?.qty || 0,
        include_tax: productDetails[product.productId]?.tax || 0,
        sell_price: productDetails[product.productId]?.sellPrice,
        date_purchase: dateToSubmit,
        
        
        
        // balance: remainingAmount
      })),
      total_amount: totalAmount,
      balance: remainingAmount,
      payment_amount: payment,
      discount: discount,
    };

    try {
      console.log(data)
      const response = await axios.post(`${url}purchase`, data);
      if (response.data.message) {
        setSuccessMsg("បានទិញដោយជោគជ័យ");
        resetProductDetails();
        setSelectedProducts([]);
        resetForm()
        sound_message();
        // Reset the form and state
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error: any) {
      // setErrMsg(error.response.data.message);
      setErrMsg2(error.response.data.message);
      console.error("Submission error:", error);
    }


  };



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

          <form onSubmit={handleSubmit}>

            {/* input for userId */}
            <input type="text" value={userId ?? ''} hidden />
            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="relative space-y-2">
                <label htmlFor="supplierDropdown" className="font-bold font-NotoSansKhmer">
                  អ្នកផ្គត់ផ្គង់: *
                </label>
                <SelectDropdown data={suppliers} onSelectdata={handleSelectdata} placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់" />
              </div>

              <div className="space-y-2 ">
                <label htmlFor="" className="font-bold font-NotoSansKhmer">
                  កាលបរិច្ឆេតទិញ
                </label>
                <div>
                  <DateInputFormat
                    initialValue={currentDate}
                    onDateChange={handleDateChange}

                  />
                </div>

              </div>
              <div className="space-y-2">
                <label htmlFor="" className="font-bold font-NotoSansKhmer">
                  ស្ថានភាព: *
                </label>
                <select name="" id="" className="input_text font-NotoSansKhmer">
                  <option value="" selected disabled>
                    --ជ្រើសរើស--
                  </option>
                  <option value={1}>ទទួល</option>
                  <option value={2}>បានបញ្ជាទិញ</option>
                </select>
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
                  <button className="py-2.5 button_only_submit">
                    {" "}
                    + បន្ថែមផលិតផល
                  </button>
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
                        មិនមានផលិតផល ឈ្មោះនេះ {" "}
                        <span className="font-bold">{productSearchQuery}</span>{" "}
                        ទេ!
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Display selected products */}
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
                  {selectedProducts.length > 0 ? (
                    selectedProducts.map((product, index) => (
                      <tr key={product.productId}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          {product.pname}
                          <p className="text-xs text-gray-500">
                            មានស្តុកនៅសល់ {product.qty} {product.unit}
                            <br />
                            តម្លៃលក់ {product.const_price}
                          </p>
                        </td>

                        {/* const_price Input */}
                        <td>
                          <input
                            min={0}
                            // disabled
                            type="number"
                            placeholder="0.0"
                            value={
                              productDetails[product.productId]?.const_price ||
                              product.const_price ||
                              ""
                            }
                            onChange={(e) =>
                              handleProductconst_priceChange(
                                product.productId,
                                Number(e.target.value)
                              )
                            }
                            className="bg-gray-0 input_text"
                          />
                        </td>

                        {/* Quantity Input */}
                        <td>
                          <input
                            min={0}
                            type="number"
                            placeholder="0.0"
                            value={productDetails[product.productId]?.qty || 1}
                            onChange={(e) =>
                              handleQtyChange(
                                product.productId,
                                Number(e.target.value)
                              )
                            }
                            className="input_text"
                          />
                        </td>

                        {/* Discount Input */}
                        {/* <td>
                          <input
                            min={0}
                            type="number"
                            placeholder="0.0"
                            value={productDetails[product.productId]?.discount || ""}
                            onChange={(e) =>
                              handleDiscountChange(
                                product.productId,
                                Number(e.target.value)
                              )
                            }
                            className="input_text"
                          />
                        </td> */}

                        {/* Tax Input */}
                        <td>
                          <input
                            min={0}
                            type="number"
                            placeholder="0.0"
                            value={productDetails[product.productId]?.tax || ""}
                            onChange={(e) =>
                              handleTaxChange(
                                product.productId,
                                Number(e.target.value)
                              )
                            }
                            className="input_text"
                          />
                        </td>

                        <td>
                          <input
                            min={0}
                            type="number"
                            placeholder="0.0"
                            value={productDetails[product.productId]?.sellPrice || ""}
                            onChange={(e) =>
                              handleSellPriceChange(
                                product.productId,
                                Number(e.target.value)
                              )
                            }
                            className="input_text"
                          />
                        </td>

                        {/* Total const_price Calculation */}
                        <td>
                          <input
                            min={0}
                            type="number"
                            placeholder="0.0"
                            value={
                              (productDetails[product.productId]?.const_price ||
                                product.const_price ||
                                0) *
                              (productDetails[product.productId]?.qty || 1) -
                              (productDetails[product.productId]?.discount || 0) +
                              (productDetails[product.productId]?.tax || 0) || 0
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
                              onClick={() => handleRemoveProduct(product.productId)}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-2 text-center text-gray-500">
                        មិនមានផលិតផលនៅក្នុងការបញ្ជាទិញ
                      </td>
                    </tr>
                  )}
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
                    value={discount}
                    onChange={handleDiscountChanges}
                    className="input_text"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="">ទូទាត់សាច់ប្រាក់($): * </label>
                  <input
                    value={payment}
                    onChange={handlePaymentChange}
                    type="number"
                    placeholder="0.0"
                    className="input_text"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="">គណនី</label>
                  <select required value={selectBank} onChange={handleSelectBank} className="input_text">
                    <option value="">--ជ្រើសរើស--</option>
                    <option value="0">បង់ផ្ទាល់</option>
                    {bank.map((item: any, index) => {
                      return (
                        <option key={index} value={item.bankId}>{item.bankName}</option>
                      )
                    })}

                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="">ចំនួននៅសល់($)</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={remainingAmount}
                    readOnly
                    className="bg-gray-100 input_text"
                  />
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
export default CreatePurchase;
