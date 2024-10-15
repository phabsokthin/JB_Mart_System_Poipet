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
      <nav className="top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end ">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
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
                </div>
              </div>
            </div>
            <div className="relative flex items-center gap-3 select-none">
                <div className="flex gap-2">
                    <h1 className="font-bold font-NotoSansKhmer">ប្រវត្តិរូប៖</h1>
                    <h1>Admin</h1>
                </div>
              <div onClick={toggleDropdown} className="bg-gray-50 rounded-full p-3 cursor-pointer">
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
                  <div className="flex gap-1 items-center hover:text-red-400 cursor-pointer">
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
