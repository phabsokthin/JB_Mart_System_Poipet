/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { url } from "../api/url";
import {jwtDecode} from 'jwt-decode'
function getDateInKhmer(): string {

  const today = new Date();

  const khmerMonths: string[] = [
    "មករា",
    "កម្ភៃ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  const convertToKhmerNumber = (number: number): string => {
    const khmerDigits: string[] = [
      "០",
      "១",
      "២",
      "៣",
      "៤",
      "៥",
      "៦",
      "៧",
      "៨",
      "៩",
    ];
    return number
      .toString()
      .split("")
      .map((digit) => khmerDigits[parseInt(digit)])
      .join("");
  };

  const day: string = convertToKhmerNumber(today.getDate());
  const month: string = khmerMonths[today.getMonth()];
  const year: string = convertToKhmerNumber(today.getFullYear());

  return `${day} ${month} ${year}`;
}

//decode
interface DecodedToken {
  userName: string;
  exp: number; 
  iat?: number; 
}
function Navbar() {
  
  const { id } = useParams(); // Extract dynamic parameter

  
  const [currentDate, setCurrentDate] = useState(getDateInKhmer());
  const [token, setToken] = useState("")
  const [names, setName] = useState<null | string>(null)
  const [isUserDropdown, setIsUserDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsUserDropdown(!isUserDropdown);
  };

  useEffect(() => {
    refreshToken();
  }, [])

  //refresh token

  const refreshToken =  async() => {
    try{
        const response = await axios.get(`${url}token`);
        setToken(response.data.accessToken);
        const decoded = jwtDecode<DecodedToken>(response.data.accessToken);
        // console.log(decoded)
        setName(decoded.userName)
    }
    catch(err:any){
      if(err.response){
        navigate('/login')
      }
    }
  }


  //logout
  const handleLogout = async () => {
    try {
      await axios.delete(`${url}logout`);
      navigate('/login'); 
    } catch (err) {
      console.error('Logout failed:', err);
    }
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
                    {location.pathname === "/dashboard"
                      ? "ទំព័រដើម/ផ្ទាំងគ្រប់គ្រង"
                      : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/test" ? "សាកល្បង" : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/product"
                      ? "ផលិតផល​/បញ្ជីផលិតផល"
                      : ""}
                  </p>
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/supplierList"
                      ? "ទំនាក់ទំនង/អ្នកផ្គត់ផ្គង់"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/customerList"
                      ? "ទំនាក់ទំនង/អតិថិជន"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/contactInfo"
                      ? "ទំនាក់ទំនង/ព័ត៍មានផ្សេងៗពីទំនាក់ទំនង"
                      : ""}
                  </p>

                  

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/productList"
                      ? "ផលិតផល/បញ្ជីផលិតផល"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/createProduct"
                      ? "ផលិតផល/បង្កើតផលិតផល"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === `/product/${id}`
                      ? "ផលិតផល/កែប្រែផលិតផល"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/productUnit"
                      ? "ផលិតផល/ឯកតាទំនិញ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/brands" ? "ផលិតផល/ម៉ាកយីហោ" : ""}
                  </p>

                 
                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/category"
                      ? "ផលិតផល/ប្រភេទទំនិញ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/warranty"
                      ? "ផលិតផល/ការធានាលើទំនិញ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/purchase"
                      ? "បញ្ជាទិញទំនិញ/រាយបញ្ជីទិញ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/createPurchase"
                      ? "បញ្ជាទិញទំនិញ/បង្កើតការទិញទំនិញ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/puchaseReturn"
                      ? "បញ្ជាទិញទំនិញ/បង្កើតការផ្លាស់ប្តូទំនិញវិញ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/topup"
                      ? "កាតទូរស័ព្ទ/បញ្ជីកាតទូរស័ព្ទ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/topuType"
                      ? "កាតទូរស័ព្ទ/ប្រភេទកាតទូរស័ព្ទ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/createTopup"
                      ? "កាតទូរស័ព្ទ/លក់កាតទូរស័ព្ទ"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/puchaseTopup"
                      ? "កាតទូរស័ព្ទ/ទិញកាតចូល"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/exchangeRate"
                      ? "រូបិយប័ណ្ណ/អាត្រាប្តូប្រាក់"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/expense" ? "ចំណាយ/បញ្ជីចំណាយ" : ""}
                  </p>


                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/bankTypeList" ? "គណនី/ប្រភេទគណនី" : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/bankList" ? "គណនី/បញ្ជីគណនី" : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/bankTransfer" ? "គណនី/ផ្ទេរលុយ" : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/expense_type"
                      ? "ចំណាយ/ប្រភេទការចំណាយ"
                      : ""}
                  </p>



                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/paymentMethod"
                      ? "វិធីសស្រ្តបង់ប្រាក់/បញ្ជីបង់ប្រាក់"
                      : ""}
                  </p>

                  <p className="font-bold font-NotoSansKhmer">
                    {location.pathname === "/paymentMethodType"
                      ? "វិធីសស្រ្តបង់ប្រាក់/បញ្ជីប្រភេទបង់ប្រាក់"
                      : ""}
                  </p>


                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 select-none">
              <div className="flex items-center gap-1">
                <p>កាលបរិច្ឆេត:</p>
                <p className="text-blue-600">{currentDate}</p>
              </div>
              <div className="flex gap-2">
                <h1 className="font-bold font-NotoSansKhmer">ប្រវត្តិរូប៖</h1>
                <h1>{names}</h1>
              </div>
              <div
                onClick={toggleDropdown}
                className="p-3 rounded-full cursor-pointer bg-gray-50"
              >
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
                  <div onClick={handleLogout} className="flex items-center gap-1 cursor-pointer hover:text-red-400">
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
