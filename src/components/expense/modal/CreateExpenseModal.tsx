/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";
import axios from "axios";
import { url } from "../../../api/url";

function CreateExpenseModal({ onClose }: { onClose: () => void }) {
  const [totalAmount, setTotalAmount] = useState<number | "">("");
  const [paymentAmount, setPaymentAmount] = useState<number | "">("");
  const [balance, setBalance] = useState<number | "">(0);

  const [expenseType, setExpenseType] = useState([]);
  const [selectExpenseType, setSelectExpenseType] = useState("");

  const [bank, setBank] = useState([]);
  const [selectBank, setSelectBank] = useState("");


  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setTotalAmount(value);
    updateBalance(value, paymentAmount);
  };

  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPaymentAmount(value);
    updateBalance(totalAmount, value);
  };

  const updateBalance = (total: number | "", payment: number | "") => {
    const calculatedBalance = total && payment ? total - payment : 0;
    setBalance(calculatedBalance);
  };


  //fetch expense type
  const fetchdata = async () => {
    try {
      const response = await axios.get(`${url}expenseType`);
      if (response.data) {
        setExpenseType(response.data);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleChangeSelectExpenseType = (e:any) => {
    setSelectExpenseType(e.target.value)
  }



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

  const handleChangeSelectBank = (e:any) => {
    setSelectBank(e.target.value)
  }
  
  

  useEffect(() => {
    fetchdata();
    fetchBank();
  }, [])


  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-black bg-opacity-50 ">
      <motion.div
        className="bg-white w-[90%] md:w-[80%] mt-10 lg:w-[60%] overflow-hidden overflow-y-auto h-[700px] shadow-lg p-4 "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
          <MdOutlineAddCircle className="text-xl" />
          <h2 className="text-lg font-bold">បង្កើតប្រភេទចំណាយថ្មី</h2>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                ឈ្មោះចំណាយ: *
              </label>
              <input
                type="text"
                required
                className="input_text"
                placeholder="ឈ្មោះចំណាយ"
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                ប្រភេទចំណាយ: *
              </label>
              <select value={selectExpenseType} onChange={handleChangeSelectExpenseType} className="input_text" required>
                <option selected disabled value="">
                  --ជ្រើសរើសប្រភេទចំណាយ--
                </option>
                <option value="0">មិនមាន</option>
                {expenseType.map((item: any, index) => {
                  return (
                    <option key={index} value={item.expenseTypeId}>{item.names}</option>
                  )
                })}


              </select>
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                ចំនួនសរុប: *
              </label>
              <input
                type="number"
                required
                min={0}
                className="input_text"
                placeholder="ចំនួនសរុប"
                value={totalAmount}
                onChange={handleTotalAmountChange}
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                កាលបរិច្ឆេត: *
              </label>
              <input
                type="date"
                required
                className="input_text p-[7px]"
                placeholder="កាលបរិច្ឆេត"
              />
            </div>
          </div>
          <div className="py-2 mb-3 border-b-2">
            <h3 className="font-bold font-NotoSansKhmer">ការទូទាត់</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                ចំនួនទូទាត់: *
              </label>
              <input
                type="number"
                className="input_text"
                placeholder="0.00"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                សម្យតុលសាច់ប្រាក់:
              </label>
              <input
                disabled
                type="number"
                className="input_text"
                placeholder="0.00"
                value={balance || 0}
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="block font-bold text-gray-700 font-NotoSansKhmer">
                គណនីបង់ប្រាក់:
              </label>
              <select value={selectBank} onChange={handleChangeSelectBank} className="input_text">
                <option value="">--ជ្រើសរើស--</option>
                <option value="0">បង់ផ្ទាល់</option>
                {bank.map((item:any, index) => {
                  return(
                    <option key={index} value={item.bankId}>{item.bankName}</option>
                  )
                })}
             
              </select>
            </div>
          </div>
          <div className="col-span-2">
            <label className="font-bold font-NotoSansKhmer">ការណិពណ័នា</label>
            <textarea
              id="description"
              rows={5}
              className="input_text"
              placeholder="ការណិពណ័នា"
            ></textarea>
          </div>
          <div className="flex justify-end mt-2 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="button_only_close"
            >
              បោះបង់
            </button>
            <button type="submit" className="button_only_submit">
              រក្សាទុក
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateExpenseModal;
