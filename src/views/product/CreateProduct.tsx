import { useEffect, useState } from "react";
import Sidebar from "../../views/Sidebar";
import Navbar from "../../views/Navbar";
import { FaBoxOpen } from "react-icons/fa6";
import ImageUpload from "../../components/build/uploadImage/UploadImage";
import KhmerDateInput from "../../components/build/khmerDateInputComponents/KhmerInputDate";
import MessageError from "../../components/build/message/MessageError";

const suppliers = [
  { id: 1, name: "សុខ​ចាន់" },
  { id: 2, name: "សុធិន" },
  { id: 3, name: "ដារា" },
  { id: 4, name: "លីសា" },
];

function CreateProduct() {
  const [supplierSearchQuery, setSupplierSearchQuery] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [priceWithTax, setPriceWithTax] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [profit, setProfit] = useState(0);


  const [selectedDate, setSelectedDate] = useState<string>("");

  const [selectedSupplier, setSelectedSupplier] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [showSupplierDropdown, setShowSupplierDropdown] =
    useState<boolean>(false);

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

  //handle change select khmer date
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
      console.log("Selected Image URL:", imageUrl.slice(0, 100) + "..."); // Log only the first 100 characters
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

            {/* Display selected products */}

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
