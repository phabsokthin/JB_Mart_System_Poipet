// import { useState, ChangeEvent } from "react";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";
// import { RiContactsBook3Fill } from "react-icons/ri";
// import { TbSwitch3 } from "react-icons/tb";

// const ExchangeRate: React.FC = () => {
//   const [khmerValue, setKhmerValue] = useState<number>(0);
//   const [usdValue, setUsdValue] = useState<number>(0);
//   const [thbValue, setThbValue] = useState<number>(0);
//   const [isKhmerToUsd, setIsKhmerToUsd] = useState<boolean>(true);
//   const [isTHBToKhr, setIsTHBToKhr] = useState<boolean>(true);
//   const [isUSDToTHB, setIsUSDToTHB] = useState<boolean>(true);

//   const exchangeRate = 4100; // KHR to USD
//   const thbToKhrRate = 120; // THB to KHR
//   const usdToThbRate = thbToKhrRate / exchangeRate; // THB to USD conversion rate

//   const handleKhmerChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value) || 0;
//     setKhmerValue(value);
//     setUsdValue(parseFloat((value / exchangeRate).toFixed(2)));
//     setThbValue(parseFloat((value / thbToKhrRate).toFixed(2)));
//   };

//   const handleUsdChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value) || 0;
//     setUsdValue(value);
//     setKhmerValue(parseFloat((value * exchangeRate).toFixed(2)));
//     setThbValue(parseFloat((value * usdToThbRate).toFixed(2))); // Convert USD to THB
//   };

//   const handleThbChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value) || 0;
//     setThbValue(value);
//     setKhmerValue(parseFloat((value * thbToKhrRate).toFixed(2)));
//     setUsdValue(parseFloat((value * usdToThbRate).toFixed(2))); // Convert THB to USD
//   };

//   const handleSwitch = () => {
//     setIsKhmerToUsd(!isKhmerToUsd);
//     setKhmerValue(0);
//     setUsdValue(0);
//     setThbValue(0);
//   };

//   const handleSwitchTHB = () => {
//     setIsTHBToKhr(!isTHBToKhr);
//     setKhmerValue(0);
//     setUsdValue(0);
//     setThbValue(0);
//   };

//   const handleSwitchUSDToTHB = () => {
//     setIsUSDToTHB(!isUSDToTHB);
//     setKhmerValue(0);
//     setUsdValue(0);
//     setThbValue(0);
//   };

//   return (
//     <div className="grid grid-cols-6 select-none">
//       <Sidebar />
//       <div className="col-span-5 p-4">
//         <Navbar />
//         <div className="p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
//           <div className="flex items-center gap-2 py-5">
//             <RiContactsBook3Fill className="text-lg" />
//             <p className="text-lg font-bold font-NotoSansKhmer">អត្រាប្តូប្រាក់</p>
//           </div>

//           {/* KHR to USD and THB */}
//           <div className="flex items-center gap-10">
//             <div className="relative w-full space-y-2">
//               <label htmlFor="khmer">{isKhmerToUsd ? "ប្រាក់រៀល" : "ប្រាក់ដុល្លា"}</label>
//               <input
//                 type="number"
//                 id="khmer"
//                 max={20}
//                 className="input_text"
//                 placeholder={isKhmerToUsd ? "ប្រាក់រៀល" : "ប្រាក់ដុល្លា"}
//                 value={isKhmerToUsd ? khmerValue : usdValue}
//                 onChange={isKhmerToUsd ? handleKhmerChange : handleUsdChange}
//               />
//               <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
//                 <p className="text-white">{isKhmerToUsd ? "រៀល" : "ដុល្លា"}</p>
//               </div>
//             </div>

//             <div className="mt-5">
//               <TbSwitch3
//                 className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
//                 onClick={handleSwitch}
//               />
//             </div>

//             <div className="relative w-full space-y-2">
//               <label htmlFor="usd">{isKhmerToUsd ? "ប្រាក់ដុល្លា" : "ប្រាក់រៀល"}</label>
//               <input
//                 max={20}
//                 type="number"
//                 id="usd"
//                 readOnly
//                 className="bg-gray-100 input_text"
//                 placeholder={isKhmerToUsd ? "ប្រាក់ដុល្លា" : "ប្រាក់រៀល"}
//                 value={isKhmerToUsd ? usdValue : khmerValue}
//               />
//               <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
//                 <p className="text-white">{isKhmerToUsd ? "ដុល្លា" : "រៀល"}</p>
//               </div>
//             </div>
//           </div>

//           {/* THB Rate Conversion */}
//           <div className="flex items-center gap-10 mt-5">
//             <div className="relative w-full space-y-2">
//               <label htmlFor="thb">{isTHBToKhr ? "ប្រាក់បាត" : "ប្រាក់រៀល"}</label>
//               <input
//                 type="number"
//                 id="thb"
//                 max={20}
//                 className="input_text"
//                 placeholder={isTHBToKhr ? "ប្រាក់បាត" : "ប្រាក់រៀល"}
//                 value={isTHBToKhr ? thbValue : khmerValue}
//                 onChange={isTHBToKhr ? handleThbChange : handleKhmerChange}
//               />
//               <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
//                 <p className="text-white">{isTHBToKhr ? "បាត" : "រៀល"}</p>
//               </div>
//             </div>

//             <div className="mt-5">
//               <TbSwitch3
//                 className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
//                 onClick={handleSwitchTHB}
//               />
//             </div>

//             <div className="relative w-full space-y-2">
//               <label htmlFor="khr">{isTHBToKhr ? "ប្រាក់រៀល" : "ប្រាក់បាត"}</label>
//               <input
//                 max={20}
//                 type="number"
//                 id="khr"
//                 readOnly
//                 className="bg-gray-100 input_text"
//                 placeholder={isTHBToKhr ? "ប្រាក់រៀល" : "ប្រាក់បាត"}
//                 value={isTHBToKhr ? khmerValue : thbValue}
//               />
//               <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
//                 <p className="text-white">{isTHBToKhr ? "រៀល" : "បាត"}</p>
//               </div>
//             </div>
//           </div>

//           {/* USD Rate Conversion to THB */}
//           <div className="flex items-center gap-10 mt-5">
//             <div className="relative w-full space-y-2">
//               <label htmlFor="usdToThb">{isUSDToTHB ? "ដុល្លា" : "បាត"}</label>
//               <input
//                 type="number"
//                 id="usdToThb"
//                 max={20}
//                 className="input_text"
//                 placeholder={isUSDToTHB ? "ដុល្លា" : "ប្រាក់បាត"}
//                 value={isUSDToTHB ? usdValue : thbValue}
//                 onChange={isUSDToTHB ? handleUsdChange : handleThbChange}
//               />
//               <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
//                 <p className="text-white">{isUSDToTHB ? "បាត" : "ដុល្លា"}</p>
//               </div>
//             </div>

//             <div className="mt-5">
//               <TbSwitch3
//                 className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
//                 onClick={handleSwitchUSDToTHB}
//               />
//             </div>

//             <div className="relative w-full space-y-2">
//               <label htmlFor="thbToUsd">{isUSDToTHB ? "បាត" : "ដុល្លា"}</label>
//               <input
//                 max={20}
//                 type="number"
//                 id="thbToUsd"
//                 readOnly
//                 className="bg-gray-100 input_text"
//                 placeholder={isUSDToTHB ? "ប្រាក់បាត" : "ដុល្លា"}
//                 value={isUSDToTHB ? thbValue : usdValue}
//               />
//               <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
//                 <p className="text-white">{isUSDToTHB ? "ដុល្លា" : "បាត"}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExchangeRate;




import { useState, useEffect, ChangeEvent } from "react";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TbSwitch3 } from "react-icons/tb";
import { GoArrowRight } from "react-icons/go";
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

type Currency = "រៀល" | "ដុល្លារ" | "បាត";

interface ExchangeRates {
  [key: string]: {
    [key: string]: number;
  };
}

const ExchangeRate: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number>(0);
  const [orderOutputValue, setOrderOutputValue] = useState<number>(0);
  const [orderOutCurrency, setOrderCurrency] = useState<Currency>("បាត");
  const [fromCurrency, setFromCurrency] = useState<Currency>("រៀល");
  const [toCurrency, setToCurrency] = useState<Currency>("ដុល្លារ");

  const images = {
    រៀល: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/640px-Flag_of_Cambodia.svg.png",
    ដុល្លារ: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/640px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png",
    បាត: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgR91x7xqvhr1q_3QLs_UWSbKgSOHG0fST4EMqdpwG97qD4u1Ig9tnLG6dxmxJb1kOLPU&usqp=CAU",
  };

  const exchangeRateKHR = 4100; // រៀល to ដុល្លារ​
  const thbToKhrRateTHB = 120; // បាត to រៀល

  const exchangeRates: ExchangeRates = {
    រៀល: { ដុល្លារ: 1 / exchangeRateKHR, បាត: 1 / thbToKhrRateTHB },
    ដុល្លារ: { រៀល: exchangeRateKHR, បាត: exchangeRateKHR / thbToKhrRateTHB },
    បាត: { រៀល: thbToKhrRateTHB, ដុល្លារ: thbToKhrRateTHB / exchangeRateKHR },
  };

  useEffect(() => {
    // Check if both currencies are "ដុល្លារ" and change to "រៀល" if true
    if (fromCurrency === "ដុល្លារ" && toCurrency === "ដុល្លារ") {
      setToCurrency("រៀល");
    }
    setInputValue(0);
    setOutputValue(0);
    setOrderOutputValue(0);

    if (fromCurrency === "រៀល" && toCurrency === "រៀល") {
      setToCurrency("ដុល្លារ");
    }

    // Determine order currency based on the selected toCurrency
    const currencyMap: { [key in Currency]: { [key in Currency]?: Currency } } = {
      ដុល្លារ: { រៀល: "បាត", បាត: "រៀល" },
      រៀល: { ដុល្លារ: "បាត", បាត: "ដុល្លារ" },
      បាត: { ដុល្លារ: "រៀល", រៀល: "ដុល្លារ" },
    };

    setOrderCurrency(currencyMap[toCurrency][fromCurrency] as Currency);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    // Update orderOutputValue when inputValue or currencies change
    const conversionRateOrder = exchangeRates[fromCurrency][orderOutCurrency];
    setOrderOutputValue(parseFloat((inputValue * conversionRateOrder).toFixed(2)));
  }, [inputValue, fromCurrency, orderOutCurrency]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInputValue(value);

    // Conversion logic for output value
    if (fromCurrency !== toCurrency) {
      const conversionRate = exchangeRates[fromCurrency][toCurrency];
      setOutputValue(parseFloat((value * conversionRate).toFixed(2)));
    } else {
      setOutputValue(value);
    }
  };

  const handleSwitch = () => {
    // Switch the currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setInputValue(0);
    setOutputValue(0);
    setOrderOutputValue(0);
  };

  const getToCurrencyOptions = () => {
    // Return the available options for "To" currency based on "From" currency
    const options = [
      { value: "រៀល", label: "Khmer Riel (រៀល)" },
      { value: "ដុល្លារ", label: "US Dollar (ដុល្លារ)" },
      { value: "បាត", label: "Thai Baht (បាត)" },
    ];

    return options.filter((option) => {
      if (fromCurrency === "ដុល្លារ" && option.value === "ដុល្លារ") return false;
      if (fromCurrency === "រៀល" && option.value === "រៀល") return false;
      if (fromCurrency === "បាត" && option.value === "បាត") return false;
      return true;
    });
  };


  // Function to get all exchange rate statements
  const getExchangeRateStatements = () => {
    const statements = [];

    for (const fromCurrency in exchangeRates) {
      for (const toCurrency in exchangeRates[fromCurrency]) {
        const rate = exchangeRates[fromCurrency][toCurrency];
        // Create the exchange rate statement
        statements.push({
          fromCurrency,
          toCurrency,
          rate: rate.toFixed(4),
        });
      }
    }

    return statements;
  };

  const exchangeRateStatements = getExchangeRateStatements();

  return (
    <div className="grid grid-cols-6 select-none">
      <Sidebar />
      <div className="col-span-5 p-4">
        <Navbar />
        <div className="p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
          <div className="flex items-center gap-2 py-5">
            <RiContactsBook3Fill className="text-lg" />
            <p className="text-lg font-bold font-NotoSansKhmer">អត្រាប្តូប្រាក់</p>
          </div>

          {/* Currency Selector */}
          <div className="mt-5 flex gap-5 items-center pb-8">
            <div className="space-y-2">
              <label htmlFor="fromCurrencySelect" className="font-NotoSansKhmer font-bold text-lg">អត្រាប្តូប្រាក់ ពី</label>
              <select
                id="fromCurrencySelect"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value as Currency)}
                className="input_text font-NotoSansKhmer font-bold w-[350px] block"
              >
                <option value="រៀល">Khmer Riel (រៀល)</option>
                <option value="ដុល្លារ">US Dollar (ដុល្លារ)</option>
                <option value="បាត">Thai Baht (បាត)</option>
              </select>
            </div>
            <div><GoArrowRight className="w-10 h-10 translate-y-3 text-gray-600" /></div>
            <div className="space-y-2">
              <label htmlFor="toCurrencySelect" className="font-NotoSansKhmer font-bold text-lg">ទៅ</label>
              <select
                id="toCurrencySelect"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value as Currency)}
                className="input_text input_text font-NotoSansKhmer font-bold w-[350px] block"
              >
                {getToCurrencyOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* From Currency Input */}
          <div className="flex items-center gap-10">
            <div className="relative w-full space-y-2">
              <label htmlFor="fromCurrency" className="font-NotoSansKhmer font-bold">អត្រាប្តូប្រាក់ ពី ប្រាក់{fromCurrency}</label>
              <input
                type="number"
                id="fromCurrency"
                className="input_text"
                placeholder={fromCurrency}
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{fromCurrency}</p>
              </div>
            </div>

            {/* Switch Currencies Button */}
            <div className="mt-5">
              <TbSwitch3
                className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={handleSwitch}
              />
            </div>

            <div className="relative w-full space-y-2">
              <label htmlFor="toCurrency" className="font-NotoSansKhmer font-bold">ទៅ  ប្រាក់{toCurrency}</label>
              <input
                type="number"
                id="toCurrency"
                readOnly
                className="bg-gray-100 input_text"
                placeholder={toCurrency}
                value={outputValue}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{toCurrency}</p>
              </div>
            </div>

            <div className="relative w-full space-y-2">
              <label htmlFor="orderCurrency" className="font-NotoSansKhmer font-bold">ប្រាក់{orderOutCurrency}</label>
              <input
                type="number"
                id="orderCurrency"
                readOnly
                className="bg-gray-100 input_text"
                placeholder={orderOutCurrency}
                value={orderOutputValue}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{orderOutCurrency}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="flex border-t-4 justify-between mt-10 shadow-lg p-2 pr-8 border-blue-700 rounded-lg">
          <div>
            <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
              <div className="flex justify-between mb-5">
                <div>
                  <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">$12,423</h5>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
                </div>
                <div
                  className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                  23%
                  <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                  </svg>
                </div>
              </div>
              <div id="legend-chart"></div>
              <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
                <div className="flex justify-between items-center pt-5">

                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="lastDaysdropdown"
                    data-dropdown-placement="bottom"
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                    type="button">
                    Last 7 days
                    <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">

                    <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-blue-950 rounded-lg">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2"></th>
                  <th className="border border-gray-300 px-4 py-2">អត្រាប្តូប្រាក់</th>
                  <th className="border border-gray-300 px-4 py-2">Rate</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRateStatements.map((statement, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-2xl">
                    <td className="border border-gray-300 px-4 py-2 flex space-x-2 items-center">
                      <img src={images[statement.fromCurrency]} alt={statement.fromCurrency} width="50" height="50" />
                      <img className="h-8 w-8" src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif" />
                      <img src={images[statement.toCurrency]} alt={statement.toCurrency} width="50" height="50" />
                    </td>
                    <td className="border border-gray-300 px-4 text-center text-yellow-300 py-2">
                      <div className="flex space-x-12 items-center">
                        <span>   {statement.fromCurrency}</span>
                        <span><img className="h-8" src="https://cdn.pixabay.com/animation/2022/10/06/13/44/13-44-02-515_512.gif" alt="" />
                        </span>
                        <span>   {statement.toCurrency}</span>
                      </div>
                    </td>

                    <td className="border border-gray-300 text-yellow-300 px-4 py-2">
                      {statement.rate}
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;