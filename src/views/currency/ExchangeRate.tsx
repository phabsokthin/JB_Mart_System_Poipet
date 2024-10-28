import { useState, useEffect, ChangeEvent } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import { TbSwitch3 } from "react-icons/tb";
import { GoArrowRight } from "react-icons/go";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

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
    const currencyMap: { [key in Currency]: { [key in Currency]?: Currency } } =
      {
        ដុល្លារ: { រៀល: "បាត", បាត: "រៀល" },
        រៀល: { ដុល្លារ: "បាត", បាត: "ដុល្លារ" },
        បាត: { ដុល្លារ: "រៀល", រៀល: "ដុល្លារ" },
      };

    setOrderCurrency(currencyMap[toCurrency][fromCurrency] as Currency);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    // Update orderOutputValue when inputValue or currencies change
    const conversionRateOrder = exchangeRates[fromCurrency][orderOutCurrency];
    setOrderOutputValue(
      parseFloat((inputValue * conversionRateOrder).toFixed(2))
    );
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
      if (fromCurrency === "ដុល្លារ" && option.value === "ដុល្លារ")
        return false;
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
            <MdCurrencyExchange className="text-lg" />
            <p className="text-lg font-bold font-NotoSansKhmer">
              អត្រាប្តូប្រាក់
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-5 pb-8 mt-5">
            <div className="space-y-2">
              <label
                htmlFor="fromCurrencySelect"
                className="text-lg font-bold font-NotoSansKhmer"
              >
                អត្រាប្តូប្រាក់ ពី
              </label>
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
            <div>
              <GoArrowRight className="w-10 h-10 text-gray-600 translate-y-3" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="toCurrencySelect"
                className="text-lg font-bold font-NotoSansKhmer"
              >
                ទៅ
              </label>
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
              <label
                htmlFor="fromCurrency"
                className="font-bold font-NotoSansKhmer"
              >
                អត្រាប្តូប្រាក់ ពី ប្រាក់{fromCurrency}
              </label>
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
              <label
                htmlFor="toCurrency"
                className="font-bold font-NotoSansKhmer"
              >
                ទៅ ប្រាក់{toCurrency}
              </label>
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
              <label
                htmlFor="orderCurrency"
                className="font-bold font-NotoSansKhmer"
              >
                ប្រាក់{orderOutCurrency}
              </label>
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

        <div className="flex justify-end p-2 pr-8 mt-5 animate-fade-up animate-duration-2000 animate-ease-in-out">
          <div>
          <h1 className="mb-2 text-lg font-bold">ហាងឆេងថ្ងៃនេះ</h1>
            <div className="p-4 text-black bg-white ">
              <table className="min-w-full border border-collapse border-gray-200">
                <thead>
                  <tr className="text-white bg-blue-600/90">
                    <th className="px-4 py-2 border border-gray-300">
                      រូបិយប័ណ្ណ
                    </th>
                    <th className="px-4 py-2 border border-gray-300">អត្រាប្តូប្រាក់</th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeRateStatements.map((statement, index) => (
                    <tr key={index} className="text-lg hover:bg-gray-50">
                      <td className="px-4 py-2 text-center border border-gray-300">
                        <div className="flex items-center space-x-12">
                          <span> {statement.fromCurrency}</span>
                          <span>
                            <img
                              className="h-8"
                              src="https://cdn.pixabay.com/animation/2022/10/06/13/44/13-44-02-515_512.gif"
                              alt=""
                            />
                          </span>
                          <span> {statement.toCurrency}</span>
                        </div>
                      </td>

                      <td className="px-4 py-2 border border-gray-300">
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
    </div>
  );
};

export default ExchangeRate;
