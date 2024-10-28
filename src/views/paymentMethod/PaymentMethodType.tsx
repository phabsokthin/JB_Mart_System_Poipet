import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateExpenseModal from "../../components/expense/modal/CreateExpenseModal";
import { MdOutlinePayments } from "react-icons/md";

const exptense = [
// <<<<<<< HEAD
    { id: 1, datetime: new Date().toLocaleString(), expense_type_id: 'បង់ទឺក', account: "nakry", interval: 1, interval_type: "ឆ្នាំ", tax: 10, price: 100, payment: 0, description: "", user_at: "admin" },
    { id: 2, datetime: new Date().toLocaleString(), expense_type_id: 'បង់ផ្លើង', account: "", interval:40, interval_type: "ថ្ងៃ", tax: 0, price: 110, payment: 50, description: "", user_at: "admin" },
    { id: 3, datetime: new Date().toLocaleString(), expense_type_id: 'អាហារ', account: "សុធិន", interval: 1, interval_type: "ឆ្នាំ", tax: 10, price: 100, payment: 110, description: "", user_at: "admin" },
    { id: 4, datetime: new Date().toLocaleString(), expense_type_id: 'Event', account: "", interval:2, interval_type: "ខែ", tax: 0, price: 110, payment: 50, description: "", user_at: "admin" },
// =======
  {
    id: 1,
    datetime: new Date().toLocaleString(),
    expense_type_id: "បង់ទឺក",
    account: "nakry",
    interval: 1,
    interval_type: "ឆ្នាំ",
    tax: 10,
    price: 100,
    payment: 0,
    description: "",
    user_at: "admin",
  },
  {
    id: 2,
    datetime: new Date().toLocaleString(),
    expense_type_id: "បង់ផ្លើង",
    account: "",
    interval: 40,
    interval_type: "ថ្ងៃ",
    tax: 10,
    price: 110,
    payment: 50,
    description: "",
    user_at: "admin",
  },

  {
    id: 1,
    datetime: new Date().toLocaleString(),
    expense_type_id: "អាហារ",
    account: "សុធិន",
    interval: 1,
    interval_type: "ឆ្នាំ",
    tax: 10,
    price: 100,
    payment: 110,
    description: "",
    user_at: "admin",
  },
  {
    id: 2,
    datetime: new Date().toLocaleString(),
    expense_type_id: "Event",
    account: "",
    interval: 2,
    interval_type: "ខែ",
    tax: 10,
    price: 110,
    payment: 50,
    description: "",
    user_at: "admin",
  },
// >>>>>>> 37a4b011fff0eb4714bb40205d06395f1a679e0a
];

function PaymentMethodType() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const rowVariants = {
    open: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        delay: index * 0.1,
      },
    }),
    closed: {
      y: 30,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="grid min-h-screen grid-cols-6">
      <div className="h-screen">
        {" "}
        {/* Ensure this has full height */}
        <div className="sticky top-0 z-10">
          {" "}
          {/* Add z-index */}
          <Sidebar />
        </div>
      </div>

      <div className="col-span-5 p-4">
        <Navbar />
        <div className="p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
          <div className="flex items-center gap-2 ">
            <MdOutlinePayments className="text-xl" />
            <p className="text-lg font-bold font-NotoSansKhmer">បញ្ជីប្រភេទបង់ប្រាក់</p>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleOpenModal} className="button_only_submit">
              + បង្កើតប្រភេទបង់ប្រាក់
            </button>
          </div>
          <div className="flex items-center justify-between my-3">
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
              <input
                type="text"
                className="input_text w-[300px]"
                placeholder="ស្វែងរកកាចំណាយ..."
              />
            </div>
          </div>
          <table className="min-w-full">
            <thead className="text-white bg-blue-600/90">
              <tr className="font-bold font-NotoSansKhmer">
                <th className="px-4 py-2 ">លេខរៀង</th>
                <th className="px-4 py-2 ">កាលបរិច្ខេទ</th>
                <th className="px-4 py-2 ">ប្រភេទនែការចំណាយ</th>
                <th className="px-4 py-2 ">ប្រភេទគណនីចំណាយ</th>
                <th className="px-4 py-2 ">ព័ត៌មានលម្អិតពីការបន្ត</th>
                <th className="px-4 py-2 ">ស្ថានភាពការទូទាត់</th>
                <th className="px-4 py-2 ">ពន្ធ</th>
                <th className="px-4 py-2 ">ចំនួនសរុប</th>
                <th className="py-2 ">ការទូទាត់ដល់ពេលតំណត់</th>
              </tr>
            </thead>
            <tbody>
              {exptense.map((cate, index) => (
                <motion.tr
                  key={cate.id}
                  custom={index}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={rowVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm cursor-pointer font-NotoSansKhmer"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{cate.datetime}</td>
                  <td className="px-4 py-2">{cate.expense_type_id}</td>
                  <td className="px-4 py-2">{cate.account || "N/A"}</td>
                  <td className="px-4 py-2">
                    ចន្លោះពេលកើតឡើងវិញ​ : {cate.interval} {cate.interval_type}
                  </td>
                  <td className="px-4 py-1">
                    {cate.payment >= cate.price ? (
                      <span className="text-green-400">បង់</span> // Fully Paid
                    ) : cate.payment > 0 && cate.payment < cate.price ? (
                      <span className="text-pink-400">បានបង់ខ្លះ</span> // Partially Paid
                    ) : cate.payment < cate.price ? (
                      <span className="text-red-400">ជុំពាក់</span> // Owing
                    ) : null}
                  </td>
                  <td className="px-4 py-2">{cate.tax || "0.00"} $</td>
                  <td className="px-4 py-2">{cate.price.toFixed(2)} $</td>
                  <td className="px-4 py-2">{cate.payment.toFixed(2)} $</td>
                </motion.tr>
              ))}

              {/* Sum */}
              <motion.tr className="bg-gray-300">
                <td colSpan={5} className="h-20 font-bold text-center">
                  សរុប :
                </td>
                <td>
                  {exptense.reduce(
                    (total, cost) =>
                      cost.payment >= cost.price ? total + 1 : total,
                    0
                  ) > 0 && (
                    <span className="text-green-400">
                      បង់:{" "}
                      {exptense.reduce(
                        (total, cost) =>
                          cost.payment >= cost.price ? total + 1 : total,
                        0
                      )}
                    </span>
                  )}
                  <br />
                  {exptense.reduce(
                    (total, cost) =>
                      cost.payment > 0 && cost.payment < cost.price
                        ? total + 1
                        : total,
                    0
                  ) > 0 && (
                    <span className="text-pink-400">
                      បានបង់ខ្លះ:{" "}
                      {exptense.reduce(
                        (total, cost) =>
                          cost.payment > 0 && cost.payment < cost.price
                            ? total + 1
                            : total,
                        0
                      )}
                    </span>
                  )}
                  <br />
                  {exptense.reduce(
                    (total, cost) => (cost.payment === 0 ? total + 1 : total),
                    0
                  ) > 0 && (
                    <span className="text-red-400">
                      ជុំពាក់:{" "}
                      {exptense.reduce(
                        (total, cost) =>
                          cost.payment === 0 ? total + 1 : total,
                        0
                      )}
                    </span>
                  )}
                </td>
                <td className="px-4 py-1 font-bold">
                  {exptense
                    .reduce((total, cost) => total + cost.tax, 0)
                    .toFixed(2)}{" "}
                  $
                </td>
                <td>
                  {exptense
                    .reduce((total, cost) => total + cost.price, 0)
                    .toFixed(2)}{" "}
                  $
                </td>
                <td>
                  {exptense
                    .reduce((total, cost) => total + cost.payment, 0)
                    .toFixed(2)}{" "}
                  $
                </td>
                {/* <td colSpan={3}></td> */}
              </motion.tr>
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && <CreateExpenseModal onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}

export default PaymentMethodType;
