import { useEffect, useState } from "react";
import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { FaBoxOpen } from "react-icons/fa6";
import ImageUpload from "../../components/build/uploadImage/UploadImage";
import KhmerDateInput from "../../components/build/khmerDateInputComponents/KhmerInputDate";
import { Switch } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

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

// Sample product list
const productList: Product[] = [
  {
    id: 1,
    name: "Electronics",
    unit: "can",
    price: 200,
    qty: 10,
    cost: 300,
    description: "Gadgets and devices",
    datetime: new Date().toLocaleString(),
  },
  {
    id: 2,
    name: "ABC",
    unit: "can",
    price: 100,
    qty: 10,
    cost: 250,
    description: "Gadgets and devices",
    datetime: new Date().toLocaleString(),
  },
];

function CreateProduct() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmounts, setTotalAmounts] = useState(0);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [priceWithTax, setPriceWithTax] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [profit, setProfit] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [sellingPriceGroup, setSellingPriceGroup] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [productSearchQuery, setProductSearchQuery] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [typeProduct, setTyeProduct] = useState("");
  const [payment, setPayment] = useState<number | undefined>(undefined);
  const [remainingAmount, setRemainingAmount] = useState<number>(totalAmount);
  

  //select change product type
  const handleChangeProductType = (event: any) => {
    setTyeProduct(event.target.value);
    setOriginalPrice(0);
    setPriceWithTax(0);
    setProfit(0);
    setSellingPrice(0);
    setTotalAmount(0);
    setIsProfitAmount(0)
    setRemainingAmount(0) 
    setSelectedProducts([]); 
  };
  


  //calculate product
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
  }, [productDetails, selectedProducts, payment, totalAmounts]);

  const [showProductDropdown, setShowProductDropdown] =
    useState<boolean>(false);
  const handleProductPriceChange = (productId: number, price: number) => {
    setProductDetails((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], price },
    }));
  };

  const handleQtyChange = (productId: number, qty: number) => {
    setProductDetails((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], qty },
    }));
  };

  const [profitAmount, setIsProfitAmount] = useState(0);

  // Function to calculate total amounts
  const calculateTotalAmount = () => {
    const total = selectedProducts.reduce((sum, product) => {
      const productDetail = productDetails[product.id] || {};
      const price = productDetail.price || product.price || 0;
      const qty = productDetail.qty || 0;
      const discount = productDetail.discount || 0;
      const tax = productDetail.tax || 0;

      return sum + (price * qty - discount + tax);
    }, 0);

    setTotalAmounts(total);

  };

  const calculateProfit = () => {
    const profit =  remainingAmount -totalAmounts; 
    setIsProfitAmount(profit);
  };

  useEffect(() => {
    calculateProfit();
  }, [totalAmounts, remainingAmount]);

//end calc amount
  
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

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const calculatedTotal = originalPrice + priceWithTax;
    setTotalAmount(calculatedTotal);
  }, [originalPrice, priceWithTax]);

  useEffect(() => {
    const calculatedProfit = sellingPrice - totalAmount;
    setProfit(calculatedProfit);
  }, [sellingPrice, totalAmount]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (imageUrl) {
      console.log("Selected Image URL:", imageUrl.slice(0, 100) + "...");
    }
  }, [imageUrl]);




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
            <FaBoxOpen className="text-xl" />
            <p className="text-lg font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
          </div>

          <form>
            <div className="grid grid-cols-4 gap-5 mt-6">
              <div className="space-y-2">
                <label htmlFor="">កូដផលិតផល: *</label>
                <input
                  type="text"
                  placeholder="កូដផលិតផល"
                  className="input_text"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="">ឈ្មោះផលិតផល: *</label>
                <input
                  type="text"
                  placeholder="ឈ្មោះផលិតផល"
                  className="input_text"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="" className="font-bold font-NotoSansKhmer">
                  កាលបរិច្ឆេតផលិតផល: *
                </label>
                <KhmerDateInput
                  label="កាលបរិច្ឆេទលក់"
                  required
                  onChange={handleDateChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="">ឯកតា(ខ្នាត): *</label>
                <select className="input_text">
                  <option value="">កេស</option>
                  <option value="">កំប៉ុង</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="">ប្រភេទទំនិញ: *</label>
                <select className="input_text">
                  <option value="">ភេស្ជជ:</option>
                  <option value="">ស្របៀ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="">អនុប្រភេទទំនិញ: *</label>
                <select className="input_text">
                  <option value="">ទឺកក្រូច:</option>
                  <option value="">ស្រាថ្នាំ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="">រូបភាព</label>
                <div>
                  <div>
                    <ImageUpload
                      maxSizeMB={2}
                      allowedTypes={["image/jpeg", "image/png"]}
                      setImageUrl={setImageUrl}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-5">
              <div className="flex gap-2 mt-5 mb-4">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group relative flex h-6 w-[53px] cursor-pointer rounded-full border-gray-200 border-2 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-2 data-[focus]:outline-red-500 data-[checked]:border-blue-600"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-blue-600 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                  />
                </Switch>
                <div>
                  <p>គ្រប់គ្រងស្តុក</p>
                </div>
              </div>

              {enabled && (
                <div className="space-y-2">
                  <label htmlFor="">ចំនួនបរិមាណស្តុក: *</label>
                  <input className="input_text" type="number" placeholder="0" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="">ពិព័ណ៌នាពីផលិតផល</label>
              <textarea
                className="input_text"
                rows={5}
                placeholder="ពិព័ណ៌នាពីផលិតផល"
              />
            </div>

            <div className="space-y-2 w-96">
              <label htmlFor="">ប្រភេទនៃការលក់ទំនិញ: *</label>
              <select
                value={typeProduct}
                onChange={handleChangeProductType}
                className="input_text"
              >
                <option value="ម្តងមួយ">ម្តងមួយ</option>
                <option value="កញ្ចប់">កញ្ចប់</option>
              </select>
            </div>

            {typeProduct === "កញ្ចប់" ? (
              <div>
                <div>
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
                 <div className="absolute right-[11%] top-3.5">
                    <FaSearch className="text-gray-400" />
                  </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      {showProductDropdown && (
                        <ul className="absolute z-[2] w-[80%] left-[10%] mt-1 overflow-y-auto bg-white border border-gray-300 shadow-md max-h-48">
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
                              <span className="font-bold">
                                {productSearchQuery}
                              </span>{" "}
                              ទេ!
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Display selected products */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">
                    កំណត់ប្រភេទទំនិញ
                  </h3>
                  <table className="w-full mt-4 border-collapse">
                    <thead className="p-2 text-white bg-blue-600/90">
                      <tr>
                        <th className="p-2 border w-[7%]">លេខរៀង</th>
                        <th className="p-2 border w-[20%]">ឈ្មោះផលិតផល</th>
                        <th className="p-2 border w-[10%]">តម្លៃដើម(ឯកតា)</th>
                        <th className="p-2 border w-[15%]">បរិមាណ</th>
                        <th className="p-2 border w-[15%]">បរិមាណ</th>
                        <th className="p-2 border w-[15%]">សរុប</th>
                        <th className="p-2 border w-[5%]">
                          <p className="text-center">ស្ថានភាព</p>
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
                                min={0}
                                type="number"
                                placeholder="0.0"
                                value={productDetails[product.id]?.qty || ""}
                                onChange={(e) =>
                                  handleQtyChange(
                                    product.id,
                                    Number(e.target.value)
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
                                    (productDetails[product.id]?.qty || 0) -
                                    (productDetails[product.id]?.discount ||
                                      0) +
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
                                  onClick={() =>
                                    handleRemoveProduct(product.id)
                                  }
                                >
                                  <IoMdClose />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={9}
                            className="p-2 text-center text-gray-500"
                          >
                            សូមបញ្ជូលផលិតផល
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mt-3">
                  {/* <h3 className="text-lg font-semibold">
                    សរុបចំនួនទូទាត់ប្តូរទំនិញ
                  </h3> */}
                  <hr className="my-2" />
                  <div className="grid gap-3 grid-1-cols-">
                    <div className="space-y-2">
                      <label htmlFor="">ចំនួនការទូទាត់សរុប($)</label>
                      <input
                        type="number"
                        placeholder="0.0"
                        min={0}
                        value={totalAmounts}
                        readOnly
                        className="bg-gray-100 input_text"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">ប្រាក់លក់ដើម($)</label>
                      <input
                        type="number"
                        placeholder="0.0"
                        value={remainingAmount}
                        onChange={(e) =>
                          setRemainingAmount(Number(e.target.value))
                        }
                        className=" input_text"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">ប្រាក់ចំណេញ($)</label>
                      <input
                        type="number"
                        placeholder="0.0"
                        value={profitAmount}
                        readOnly
                        className="bg-gray-100 input_text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">កំណត់ព័ត៍មានផលិតផល</h3>
                  <div className="relative items-center gap-3 mx-auto my-2"></div>
                  <table className="w-full mt-4 border-collapse ">
                    <thead className="p-2 text-white bg-blue-600/90">
                      <tr>
                        <th className="p-2 border w-[10%]">
                          តម្លៃដើម(មិនរួមពន្ធ)
                        </th>
                        <th className="p-2 border w-[10%]">បូកពន្ធ</th>
                        <th className="p-2 border w-[15%]">តម្លៃលក់ដើម($)</th>
                        <th className="p-2 border w-[15%]">តម្លៃលក់ដុំ</th>
                        <th className="p-2 border w-[15%]">ប្រាក់ចំណេញ($)</th>
                        <th className="p-2 border w-[15%]">សរុប($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="number"
                            placeholder="តម្លៃដើម(មិនរួមពន្ធ)"
                            className="input_text"
                            value={originalPrice}
                            onChange={(e) =>
                              setOriginalPrice(parseFloat(e.target.value) || 0)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="តម្លៃដើម(រួមពន្ធ)"
                            className="input_text"
                            value={priceWithTax}
                            onChange={(e) =>
                              setPriceWithTax(parseFloat(e.target.value) || 0)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="តម្លៃលក់ដើម"
                            className="input_text"
                            value={sellingPrice}
                            onChange={(e) =>
                              setSellingPrice(parseFloat(e.target.value) || 0)
                            }
                          />
                        </td>
                        <td>
                              <input
                                min={0}
                                type="number"
                                placeholder="0.0"
                                value={sellingPriceGroup}
                                onChange={(e:any) => setSellingPriceGroup(e.target.value)}
                                className="input_text"
                              />
                            </td>

                        <td>
                          <input
                            type="number"
                            placeholder="ប្រាក់ចំណេញ"
                            className="bg-gray-100 input_text"
                            value={profit}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="ប្រាក់សរុប"
                            className="bg-gray-100 input_text"
                            value={totalAmount}
                            readOnly
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600"
              >
                <p> + បង្កើតផលិតផល</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateProduct;
