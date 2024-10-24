import { useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [isUserDropdown, setIsUserDropdown] = useState(false);

  const location = useLocation();

  const toggleDropdown = () => {
    setIsUserDropdown(!isUserDropdown);
  };

  return (
    <div>
      <nav className="top-0 z-50 w-full -mt-1 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end ">
             
              <div className="flex justify-between">
                <div>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/dashboard" ? "ទំព័រដើម/ផ្ទាំងគ្រប់គ្រង" : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/test" ? "សាកល្បង" : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/product" ? "ផលិតផល​/បញ្ជីផលិតផល" : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/supplier" ? "ទំនាក់ទំនង/អ្នកផ្គត់ផ្គង់" : ""}
                  </p>
                  
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/customer" ? "ទំនាក់ទំនង/អតិថិជន" : ""}
                  </p>
                  
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/contactInfo" ? "ទំនាក់ទំនង/ព័ត៍មានផ្សេងៗពីទំនាក់ទំនង" : ""}
                  </p>


                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/productUnit" ? "ផលិតផល/ឯកតាទំនិញ" : ""}
                  </p>

                  

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/brands" ? "ផលិតផល/ម៉ាកយីហោ" : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/category" ? "ផលិតផល/ប្រភេទទំនិញ" : ""}
                  </p>

                  
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/warranty" ? "ផលិតផល/ការធានាលើទំនិញ" : ""}
                  </p>


                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/purchase" ? "បញ្ជាទិញទំនិញ/រាយបញ្ជីទិញ" : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/createPurchase" ? "បញ្ជាទិញទំនិញ/បង្កើតការទិញទំនិញ" : ""}
                  </p>

                  
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/expense" ? "ចំណាយ/បញ្ជីចំណាយ" : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/expense_type" ? "ចំណាយ/ប្រភេទការចំណាយ" : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex items-center gap-3 select-none">
                <div className="flex gap-2">
                    <h1 className="font-bold font-NotoSansKhmer">ប្រវត្តិរូប៖</h1>
                    <h1>Admin</h1>
                </div>
              <div onClick={toggleDropdown} className="p-3 rounded-full cursor-pointer bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              {isUserDropdown && (
                <div className="absolute z-10 top-4 w-32 p-2 bg-white shadow mt-10 -right-[20px] text-gray-600">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-red-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-rotate-ccw"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    <p>ចាកចេញ</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
