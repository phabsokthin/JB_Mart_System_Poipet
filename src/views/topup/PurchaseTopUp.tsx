import React, { useEffect, useState } from "react";
import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DateInputFormat from "../../components/build/EnglishDateInputComponents/InputFormateDateComponent";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

type Product = {
  id: number;
  name: string;
  price: number;
  qty: number;
  cost: number;
  unit: string;
  description: string;
  datetime: string;
};

const suppliers = [
  { id: 1, name: "kaka" },
  { id: 2, name: "linda" },
  { id: 3, name: "sokcha" },
  { id: 4, name: "kiki" },
];

// Sample product list
const productList: Product[] = [
  {
    id: 1,
    name: "Smart",
    unit: "សន្លឹក",
    price: 40,
    qty: 10,
    cost: 50,
    description: "Gadgets and devices",
    datetime: new Date().toLocaleString(),
  },
  {
    id: 2,
    name: "Metfone",
    unit: "បន្ទាស់",
    price: 60,
    qty: 10,
    cost: 70,
    description: "Gadgets and devices",
    datetime: new Date().toLocaleString(),
  },
  {
    id: 3,
    name: "Cellcard",
    unit: "កេស",
    price: 60,
    qty: 5,
    cost: 65,
    description: "Gadgets and devices",
    datetime: new Date().toLocaleString(),
  },
];

function PurchaseTopup() {
  const [productSearchQuery, setProductSearchQuery] = useState<string>("");
  const [supplierSearchQuery, setSupplierSearchQuery] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [payment, setPayment] = useState<number | undefined>(undefined);
  const [remainingAmount, setRemainingAmount] = useState<number>(totalAmount);
  const [discount, setDiscount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");

  //calculate Proeduct
  const [productDetails, setProductDetails] = useState<{
    [key: number]: {
      price: number;
      qty: number;
      discount: number;
      tax: number;
    };
  }>({});

  useEffect(() => {
    calculateTotalAmount();
    handlecalculatedRemainingAmount();
  }, [productDetails, selectedProducts, payment, discount, totalAmount]);

  const [showProductDropdown, setShowProductDropdown] =
    useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [showSupplierDropdown, setShowSupplierDropdown] =
    useState<boolean>(false);

  const handleAddProduct = (product: Product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      alert("Product already exists!");
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
    setProductSearchQuery("");
    setShowProductDropdown(false);
  };

  //remove
  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== productId)
    );
  };

  //search product
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  const handleProductSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductSearchQuery(e.target.value);
    setShowProductDropdown(e.target.value.length > 0);
  };

  //filter supplier
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(supplierSearchQuery.toLowerCase())
  );

  const handleSelectSupplier = (supplier: { id: number; name: string }) => {
    setSelectedSupplier(supplier);
    setSupplierSearchQuery(supplier.name);
    setShowSupplierDropdown(false);
  };
  const toggleSupplierDropdown = () => {
    setShowSupplierDropdown((prev) => {
      const newState = !prev;
      if (newState) {
        setSupplierSearchQuery("");
      }
      return newState;
    });
  };

  //calac total
  
  const handleProductPriceChange = (productId: number, price: number) => {
    setProductDetails((prev) => {
      const updatedProduct = {
        ...prev[productId],
        price,
        total: calculateTotal(
          price,
          prev[productId]?.qty ?? 1,
          prev[productId]?.discount || 0
        ),
      };
      return { ...prev, [productId]: updatedProduct };
    });
  };

  const handleQtyChange = (productId: number, qty: number = 1) => {
    setProductDetails((prev) => {
      const updatedQty = qty < 1 ? 1 : qty;
      const updatedProduct = {
        ...prev[productId],
        qty: updatedQty,
        total: calculateTotal(
          prev[productId]?.price || 1,
          updatedQty,
          prev[productId]?.discount || 0
        ),
      };
      return { ...prev, [productId]: updatedProduct };
    });
  };

  const calculateTotal = (price: number, qty: number, discount: number) => {
    return price * qty - discount;
  
  };

  const calculateTotalAmount = () => {
    const total = selectedProducts.reduce((sum, product) => {
      const productDetail = productDetails[product.id] || {};
      const price = productDetail.price || product.price || 0;
      const qty = productDetail.qty || 1;
      const discount = productDetail.discount || 0;
      const tax = productDetail.tax || 0;

      return sum + (price * qty - discount + tax);
    }, 0);

    setTotalAmount(total);
  };

  //end total amount




  

  const handlecalculatedRemainingAmount = () => {
    const calculatedRemainingAmount = totalAmount - (payment ?? 0) - discount;
    setRemainingAmount(calculatedRemainingAmount);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? undefined : Math.max(0, Number(e.target.value));
    setPayment(value);
  };

  const handleDiscountChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? 0 : Math.max(0, Number(e.target.value));
    setDiscount(value);
  };

  //submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dateToSubmit = selectedDate || new Date().toISOString().split("T")[0];
    console.log("Submitting date:", dateToSubmit);

    // Validation
    if (selectedProducts.length === 0 || !selectedSupplier) {
      alert("Please select at least one product and a supplier.");
      return;
    }

    // Prepare the data object
    const data = {
      supplier: {
        id: selectedSupplier.id,
        name: selectedSupplier.name,
      },
      products: selectedProducts.map((product) => {
        const productDetail = productDetails[product.id] || {};
        return {
          id: product.id,
          name: product.name,
          price: productDetail.price || product.price,
          qty: productDetail.qty || 0,
          discount: productDetail.discount || 0,
          tax: productDetail.tax || 0,
          total:
            (productDetail.price || product.price || 0) *
              (productDetail.qty || 0) -
            (productDetail.discount || 0) +
            (productDetail.tax || 0),
        };
      }),
      payment,
      discount,
      totalAmount,
      remainingAmount,
      dateToSubmit,
    };

    console.log("Submitting data:", data);
    alert("Products submitted successfully!");

    // Reset the form and state
    resetProductDetails();
    setSelectedProducts([]);
    setSelectedSupplier(null);
    setPayment(0); // Reset payment
    setDiscount(0); // Reset discount
    setRemainingAmount(totalAmount); // Reset remaining amount to default
  };

  const resetProductDetails = () => {
    setProductDetails({});
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="grid min-h-screen grid-cols-6 select-none">
      <div className="h-screen">
        <div className="sticky top-0 z-10">
          <Sidebar />
        </div>
      </div>

      <div className="col-span-5 p-4">
        <Navbar />
        <div className="p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
          <div className="flex items-center gap-2 ">
            <FaArrowRightArrowLeft className="text-xl" />
            <p className="text-lg font-bold font-NotoSansKhmer">ការទិញកាតចូល</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="relative">
                <div className="space-y-2">
                  <label htmlFor="" className="font-bold font-NotoSansKhmer">
                    អ្នកផ្គត់ផ្គង់: *
                  </label>
                  <div className="input_text" onClick={toggleSupplierDropdown}>
                    {selectedSupplier
                      ? `${selectedSupplier.id}: ${selectedSupplier.name}`
                      : "ជ្រើសរើសអ្នកផ្គត់ផ្គង់"}
                  </div>
                </div>
                {showSupplierDropdown && (
                  <div className="absolute left-0 z-10 w-full p-3 mt-1 bg-white border border-gray-300 shadow-md">
                    <input
                      type="text"
                      placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់"
                      className="w-full p-2 input_text"
                      value={supplierSearchQuery}
                      onChange={(e) => {
                        setSupplierSearchQuery(e.target.value);
                        setShowSupplierDropdown(true);
                      }}
                      onFocus={() => setShowSupplierDropdown(true)}
                    />
                    <ul className="overflow-y-auto max-h-48">
                      {filteredSuppliers.length > 0 ? (
                        filteredSuppliers.map((supplier) => (
                          <li
                            key={supplier.id}
                            className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
                            onClick={() => handleSelectSupplier(supplier)}
                          >
                            {`${supplier.id}: ${supplier.name}`}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">
                          មិនអ្នកផ្គត់ផ្គង់ឈ្មោះ <b>{supplierSearchQuery}</b> ទេ
                        </li>
                      )}
                    </ul>
                  </div>
                )}
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
            </div>
            <div className="relative items-center gap-3 mx-auto my-10">
              <div className="relative">
                <div className="flex justify-center">
                  <input
                    type="text"
                    className="input_text w-[80%]"
                    placeholder="ស្វែងកាតទូរស័ព្ទ"
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
                    + បញ្ជីកាតទូរស័ព្ទ
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                {showProductDropdown && (
                  <ul className="absolute z-[2] w-[995px] left-[10%] mt-1 overflow-y-auto bg-white border border-gray-300 shadow-md max-h-48">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <li
                          key={product.id}
                          className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
                          onClick={() => handleAddProduct(product)}
                        >
                          {product.name} || ចំនួន {product.qty}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500 font-NotoSansKhmer">
                        មិនមានផលិតផល ឈ្មោះនេះ​{" "}
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
                    <th className="p-2 border w-[20%]">កាតទូរស័ព្ទ</th>
                    <th className="p-2 border w-[10%]">តម្លៃដើម(ឯកតា)</th>
                    <th className="p-2 border w-[15%]">បរិមាណទិញកាតចូល</th>
                    <th className="p-2 border w-[15%]">សរុប</th>
                    <th className="p-2 border w-[5%]">
                      <p className="text-center">សកម្មភាព</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.length > 0 ? (
                    selectedProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          {product.name}
                          <p className="text-xs text-gray-500">
                            មានស្តុកនៅសល់ {product.qty} {product.unit}
                            <br />
                            តម្លៃលក់ {product.cost}
                          </p>
                        </td>

                        {/* Price Input */}
                        <td>
                          <input
                            min={0}
                            disabled
                            type="number"
                            placeholder="0.0"
                            value={
                              productDetails[product.id]?.price ||
                              product.price ||
                              ""
                            }
                            onChange={(e) =>
                              handleProductPriceChange(
                                product.id,
                                Number(e.target.value)
                              )
                            }
                            className="bg-gray-100 input_text"
                          />
                        </td>

                        {/* Quantity Input */}

                        <td>
                          <input
                            min={1}
                            type="number"
                            value={productDetails[product.id]?.qty ?? 1}
                            onChange={(e) =>
                              handleQtyChange(
                                product.id,
                                Number(e.target.value) || 1
                              )
                            }
                            className="input_text"
                          />
                        </td>

                        {/* Total Price Calculation */}
                        <td>
                          <input
                            min={0}
                            type="number"
                            placeholder="0.0"
                            value={
                              (productDetails[product.id]?.price ||
                                product.price ||
                                0) *
                                (productDetails[product.id]?.qty || 1) -
                                (productDetails[product.id]?.discount || 0) +
                                (productDetails[product.id]?.tax || 0) || 0
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
                              onClick={() => handleRemoveProduct(product.id)}
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
                        សូមបញ្ជូលកាតទូរស័ព្ទ
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
                  <label htmlFor="">វិធីសាទូទាត់</label>
                  <select name="" id="" className="input_text">
                    <option value="">--ជ្រើសរើស--</option>
                    <option value="abA">QR Code</option>
                    <option value="បង់ផ្ទាល់">បង់ផ្ទាល់</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="">គណនី</label>
                  <select name="" id="" className="input_text">
                    <option value="">--ជ្រើសរើស--</option>
                    <option value="aba">ABA</option>
                    <option value="AC Lida">AC Lida</option>
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

            <div className="mt-2">
              <label htmlFor="">កត់ចំណាំ</label>
              <textarea rows={5}
                placeholder="កត់ចំណាំផ្សេងៗ"
                readOnly
                className=" input_text"
              />
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
export default PurchaseTopup;
