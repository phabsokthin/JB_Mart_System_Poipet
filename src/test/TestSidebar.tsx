/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { FaBoxOpen } from "react-icons/fa6";
import ImageUpload from "../../components/build/uploadImage/UploadImage";
import KhmerDateInput from "../../components/build/khmerDateInputComponents/KhmerInputDate";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { url } from "../../api/url";
import MessageSuccess from "../../components/build/message/MessageSuccess";
import MessageError from "../../components/build/message/MessageError";
import sound_success from '../../assets/sound/success.mp3';
import sound_err from '../../assets/sound/failed.mp3';


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

function CreateProduct() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmounts, setTotalAmounts] = useState(0);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [priceWithTax, setPriceWithTax] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [profit, setProfit] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);


  const [payment, setPayment] = useState<number | undefined>(undefined);
  const [remainingAmount, setRemainingAmount] = useState<number>(totalAmount);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pcode, setPcode] = useState("");
  const [pname, setPname] = useState("");
  const [unit, setUnit] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [qty, setqty] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("0");
  const [selectCategory, setSelectCategory] = useState("0");
  const [selectUnit, setSelectUnit] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errMessage, seterrMessage] = useState(false);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
    console.log(e.target.value);
  };


  const handleChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };



  const handleChangeUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUnit(e.target.value);
  };

  //select change product type



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
    const profit = remainingAmount - totalAmounts;
    setIsProfitAmount(profit);
  };

  useEffect(() => {
    calculateProfit();
  }, [totalAmounts, remainingAmount]);



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

  useEffect(() => {
    if (imageUrl) {
      console.log("Selected Image URL:", imageUrl.slice(0, 100) + "...");
    }
  }, [imageUrl]);



  //fetch unit

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${url}unit`);
      if (response.data) {
        setUnit(response.data);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };


  //category

  const fetchdataCategory = async () => {
    try {
      const response = await axios.get(`${url}category`);
      if (response.data) {
        setCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  //brand

  const fetchdataBrand = async () => {
    try {
      const response = await axios.get(`${url}brand`);
      if (response.data) {
        setBrand(response.data);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };



  useEffect(() => {
    fetchdata();
    fetchdataCategory();
    fetchdataBrand();
  }, [])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Append all fields to the FormData object
      formData.append("pcode", pcode);
      formData.append("pname", pname);
      formData.append("selectedDate", selectedDate);
      formData.append("unitId", selectUnit);
      formData.append("categoryId", selectCategory);
      formData.append("brandId", selectedBrand);
      formData.append("status", String(enabled)); // Convert boolean to string
      formData.append("qty", Number(qty).toString()); // Convert number to string
      formData.append("description", description);
      formData.append("const_price", originalPrice.toString()); // Convert number to string
      formData.append("include_tax", priceWithTax.toString()); // Convert number to string
      formData.append("sell_price", sellingPrice.toString()); // Convert number to string
      formData.append("profit", profit.toString()); // Convert number to string
      formData.append("total_amount", totalAmount.toString()); // Convert number to string


      if (imageFile) {
        formData.append("file", imageFile);
      }

      // Send the POST request
      const response = await axios.post(`${url}product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success response
      if (response.data.msg) {

        setSuccessMsg(response.data.msg);
        sound_message()
        handleClose();
        clearData();
        setIsLoading(false);
        console.log(response.data);
      }
    } catch (err: any) {

      if (err.response && err.response.data && err.response.data.msg) {
        seterrMessage(err.response.data.msg);
        console.log(err.response.data.msg);
        err_message()
      }
    }
    finally {
      setIsLoading(false);
    }
  };


  function clearData() {
    setPcode("");
    setPname("");
    setSelectUnit("");
    setSelectCategory("");
    setSelectedBrand("");
    setqty(0);
    setDescription("");
    setOriginalPrice(0);
    setPriceWithTax(0);
    setSellingPrice(0);
    setProfit(0);
    setTotalAmount(0);
    setImageUrl(null);
    setImageFile(null);
  }


  function sound_message() {
    new Audio(sound_success).play();
  }


  function err_message() {
    new Audio(sound_err).play();
  }


  const handleClose = () => {
    seterrMessage(false);
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

        <div className="p-4 mt-5 bg-white dark:border-gray-700">
          <div className="flex items-center gap-2 ">
            <FaBoxOpen className="text-xl" />
            <p className="text-lg font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
          </div>


          <div className="mt-2">
            {/* {errMessage && <div className="flex justify-between p-3 msg_error">
              <p>{errMessage}</p>
              <div className="hover:text-red-600" onClick={handleClose}>បិទ</div>
            </div>} */}

            {errMessage && (
              <div className="flex justify-between p-3 msg_error">
                <p>{errMessage}</p>
                <div className="cursor-pointer hover:text-gray-200" onClick={handleClose}>
                  បិទ
                </div>
              </div>
            )}
          </div>


          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-5 mt-3">
              <div className="space-y-2">
                <label htmlFor="">កូដផលិតផល: *</label>
                <input
                  type="text"
                  required
                  value={pcode}
                  onChange={(e) => setPcode(e.target.value)}
                  placeholder="កូដផលិតផល"
                  className="input_text"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="">ឈ្មោះផលិតផល: *</label>
                <input
                  value={pname}
                  required
                  onChange={(e) => setPname(e.target.value)}
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
                <select required value={selectUnit} onChange={handleChangeUnit} className="input_text">
                  <option value="">ជ្រើសរើស</option>
                  {unit.map((item: any, index: any) => {
                    return (
                      <option key={index} value={item.unitId}>{item.unames}</option>
                    )
                  })}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="">ប្រភេទទំនិញ</label>
                <select value={selectCategory} onChange={handleCategory} className="input_text">
                  <option value="">ជ្រើសរើស</option>
                  {category.map((item: any, index: any) => {
                    return (
                      <option key={index} value={item.categoryId}>{item.cnames}</option>
                    )
                  })}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="">ម៉ាកយីហោរ</label>
                <select value={selectedBrand} onChange={handleChangeBrand} className="input_text">
                  <option value="">ជ្រើសរើស</option>
                  {brand.map((item: any, index: any) => {
                    return (
                      <option key={index} value={item.brandId}>{item.bnames}</option>
                    )
                  })}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="">រូបភាព</label>
                <div>
                  <div>
                    <ImageUpload
                      maxSizeMB={2}
                      allowedTypes={['image/png', 'image/jpeg']}
                      imageUrl={imageUrl} // Pass the state
                      setImageUrl={setImageUrl}
                      setImageFile={setImageFile}
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
                  <input className="input_text" value={qty} onChange={(e) => setqty(Number(e.target.value))} type="number" placeholder="0" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="">ពិព័ណ៌នាពីផលិតផល</label>
              <textarea
                className="input_text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="ពិព័ណ៌នាពីផលិតផល"
              />
            </div>




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
                      <th className="p-2 border w-[15%]">ប្រាក់ចំណេញ($)</th>
                      <th className="p-2 border w-[15%]">សរុប($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="number"
                          required
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
                          required
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
                          required
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
                          type="number"
                          placeholder="ប្រាក់ចំណេញ"
                          className="bg-gray-100 input_text"
                          value={profit}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          required
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



            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className={`button_only_submit font-NotoSansKhmer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'កំពុងរក្សា...' : 'រក្សាទុក'}
              </button>
            </div>
          </form>
          {successMsg && <MessageSuccess message={successMsg} onClear={() => setSuccessMsg(null)} />}

        </div>
      </div>


    </div>
  );
}
export default CreateProduct;
