import { useState, ChangeEvent } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TbSwitch3 } from "react-icons/tb";

const ExchangeRate: React.FC = () => {
  const [khmerValue, setKhmerValue] = useState<number>(0);
  const [usdValue, setUsdValue] = useState<number>(0);
  const [thbValue, setThbValue] = useState<number>(0);
  const [isKhmerToUsd, setIsKhmerToUsd] = useState<boolean>(true);
  const [isTHBToKhr, setIsTHBToKhr] = useState<boolean>(true);
  const [isUSDToTHB, setIsUSDToTHB] = useState<boolean>(true);

  const exchangeRate = 4100; // KHR to USD
  const thbToKhrRate = 120; // THB to KHR
  const usdToThbRate = thbToKhrRate / exchangeRate; // THB to USD conversion rate

  const handleKhmerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setKhmerValue(value);
    setUsdValue(parseFloat((value / exchangeRate).toFixed(2)));
    setThbValue(parseFloat((value / thbToKhrRate).toFixed(2)));
  };

  const handleUsdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setUsdValue(value);
    setKhmerValue(parseFloat((value * exchangeRate).toFixed(2)));
    setThbValue(parseFloat((value * usdToThbRate).toFixed(2))); // Convert USD to THB
  };

  const handleThbChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setThbValue(value);
    setKhmerValue(parseFloat((value * thbToKhrRate).toFixed(2)));
    setUsdValue(parseFloat((value * usdToThbRate).toFixed(2))); // Convert THB to USD
  };

  const handleSwitch = () => {
    setIsKhmerToUsd(!isKhmerToUsd);
    setKhmerValue(0);
    setUsdValue(0);
    setThbValue(0);
  };

  const handleSwitchTHB = () => {
    setIsTHBToKhr(!isTHBToKhr);
    setKhmerValue(0);
    setUsdValue(0);
    setThbValue(0);
  };

  const handleSwitchUSDToTHB = () => {
    setIsUSDToTHB(!isUSDToTHB);
    setKhmerValue(0);
    setUsdValue(0);
    setThbValue(0);
  };

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

          {/* KHR to USD and THB */}
          <div className="flex items-center gap-10">
            <div className="relative w-full space-y-2">
              <label htmlFor="khmer">{isKhmerToUsd ? "ប្រាក់រៀល" : "ប្រាក់ដុល្លា"}</label>
              <input
                type="number"
                id="khmer"
                max={20}
                className="input_text"
                placeholder={isKhmerToUsd ? "ប្រាក់រៀល" : "ប្រាក់ដុល្លា"}
                value={isKhmerToUsd ? khmerValue : usdValue}
                onChange={isKhmerToUsd ? handleKhmerChange : handleUsdChange}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{isKhmerToUsd ? "រៀល" : "ដុល្លា"}</p>
              </div>
            </div>

            <div className="mt-5">
              <TbSwitch3
                className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={handleSwitch}
              />
            </div>

            <div className="relative w-full space-y-2">
              <label htmlFor="usd">{isKhmerToUsd ? "ប្រាក់ដុល្លា" : "ប្រាក់រៀល"}</label>
              <input
                max={20}
                type="number"
                id="usd"
                readOnly
                className="bg-gray-100 input_text"
                placeholder={isKhmerToUsd ? "ប្រាក់ដុល្លា" : "ប្រាក់រៀល"}
                value={isKhmerToUsd ? usdValue : khmerValue}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{isKhmerToUsd ? "ដុល្លា" : "រៀល"}</p>
              </div>
            </div>
          </div>

          {/* THB Rate Conversion */}
          <div className="flex items-center gap-10 mt-5">
            <div className="relative w-full space-y-2">
              <label htmlFor="thb">{isTHBToKhr ? "ប្រាក់បាត" : "ប្រាក់រៀល"}</label>
              <input
                type="number"
                id="thb"
                max={20}
                className="input_text"
                placeholder={isTHBToKhr ? "ប្រាក់បាត" : "ប្រាក់រៀល"}
                value={isTHBToKhr ? thbValue : khmerValue}
                onChange={isTHBToKhr ? handleThbChange : handleKhmerChange}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{isTHBToKhr ? "បាត" : "រៀល"}</p>
              </div>
            </div>

            <div className="mt-5">
              <TbSwitch3
                className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={handleSwitchTHB}
              />
            </div>

            <div className="relative w-full space-y-2">
              <label htmlFor="khr">{isTHBToKhr ? "ប្រាក់រៀល" : "ប្រាក់បាត"}</label>
              <input
                max={20}
                type="number"
                id="khr"
                readOnly
                className="bg-gray-100 input_text"
                placeholder={isTHBToKhr ? "ប្រាក់រៀល" : "ប្រាក់បាត"}
                value={isTHBToKhr ? khmerValue : thbValue}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{isTHBToKhr ? "រៀល" : "បាត"}</p>
              </div>
            </div>
          </div>

          {/* USD Rate Conversion to THB */}
          <div className="flex items-center gap-10 mt-5">
            <div className="relative w-full space-y-2">
              <label htmlFor="usdToThb">{isUSDToTHB ? "ដុល្លា" : "បាត"}</label>
              <input
                type="number"
                id="usdToThb"
                max={20}
                className="input_text"
                placeholder={isUSDToTHB ? "ដុល្លា" : "ប្រាក់បាត"}
                value={isUSDToTHB ? usdValue : thbValue}
                onChange={isUSDToTHB ? handleUsdChange : handleThbChange}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{isUSDToTHB ? "បាត" : "ដុល្លា"}</p>
              </div>
            </div>

            <div className="mt-5">
              <TbSwitch3
                className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={handleSwitchUSDToTHB}
              />
            </div>

            <div className="relative w-full space-y-2">
              <label htmlFor="thbToUsd">{isUSDToTHB ? "បាត" : "ដុល្លា"}</label>
              <input
                max={20}
                type="number"
                id="thbToUsd"
                readOnly
                className="bg-gray-100 input_text"
                placeholder={isUSDToTHB ? "ប្រាក់បាត" : "ដុល្លា"}
                value={isUSDToTHB ? thbValue : usdValue}
              />
              <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                <p className="text-white">{isUSDToTHB ? "ដុល្លា" : "បាត"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
