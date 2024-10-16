import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    //contact variable
    const [isContactDropdown, setIssContactDropdown] = useState(false)
    const [isContactClosed, setIsContactClose] = useState(false)

    //proudct variable
    const [isProductDropdown, setIsProductDropdown] = useState(false)
    const [isProductClose, setIsProductClose] = useState(false)

    //purchase variable

    const [isPurchaseDropdown, setIsPurchasedropdown] = useState(false)
    const [isPuchaseClose, setIsPuchaseClose] = useState(false)

    const productRoutes = ["/32", "/ts32t"];
    const contactRoutes = ['/contact', "/tes323t"]
    const productsRoutes = ['/product', "/productList"]
    const purchaseRoutes = ['/puchase', '/puchaseList']

    //product active
    const isProductActive = productRoutes.some((route) =>
        location.pathname.startsWith(route)
    );

    //contact active
    const isContactActive = contactRoutes.some((route) => {
        location.pathname.startsWith(route)
    })

    const isProductsActive = productsRoutes.some((route) => {
        location.pathname.startsWith(route)
    })

    const isPuchaseActive = purchaseRoutes.some((route) => {
        location.pathname.startsWith(route)
    })



    useEffect(() => {
        if (isContactActive) {
            setIssContactDropdown(true)
            setIsContactClose(false)
        }

        else if (isProductsActive) {
            setIsProductDropdown(true)
            setIsProductClose(false)
        }

        else if (isPuchaseActive) {
            setIsPurchasedropdown(true)
            setIsPuchaseClose(false)
        }

    }, [isProductActive, isContactActive, isPuchaseActive]);

    const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return `flex items-center p-3 ${isActive
            ? "bg-blue-600 dark:bg-blue-500 text-white"
            : "text-gray-900 dark:text-white"
            }  `;
    };



    const handleDropdownContact = () => {
        if (isContactActive) {
            if (!isContactClosed) {
                setIssContactDropdown(false)
                setIsContactClose(true)
            }
            else {
                setIssContactDropdown(true)
                setIsContactClose(false)
            }
        }
        else {
            setIssContactDropdown(!isContactDropdown)
        }
    }

    const handleProductDropdown = () => {
        if (isProductsActive) {
            if (!isProductClose) {
                setIsProductDropdown(false)
                setIsProductClose(true)
            }
            else {
                setIsProductDropdown(true)
                setIsProductClose(false)
            }
        }
        else {
            setIsProductDropdown(!isProductDropdown)
        }
    }

    const handlePurchaseDropdown = () => {
        if (isPuchaseActive) {
            if (!isPuchaseClose) {
                setIsPurchasedropdown(false)
                setIsPuchaseClose(true)
            }
            else {
                setIsPurchasedropdown(true)
                setIsPuchaseClose(false)
            }
        }
        else {
            setIsPurchasedropdown(!isPurchaseDropdown)
        }
    }


    const isDropDownContactVisible = (isContactActive && !isContactClosed) || isContactDropdown;

    const isProductDropdownVisible = (isProductsActive && !isProductClose) || isProductDropdown

    const isPurcahseDropdownVisible = (isPuchaseActive && !isPuchaseClose) || isPurchaseDropdown
    ////////////////
    //dropdown phome
    const [isDropDownPhoneDropdown, setDropDownPhoneDropdown] = useState(false);
    const handleDropdownPhone = () => {
        setDropDownPhoneDropdown(!isDropDownPhoneDropdown);
    };
    //dropdown cost
    const [isDropDownCostDropdown, setDropDownCostDropdown] = useState(false);
    const handleDropdownCost = () => {
        setDropDownCostDropdown(!isDropDownCostDropdown);
    };
    //dropdown Account
    const [isDropDownAcocountDropdown, setDropDownAcountDropdown] = useState(false);
    const handleDropdownAccount = () => {
        setDropDownAcountDropdown(!isDropDownAcocountDropdown);
    };

    //dropdown ExSpent
    const [isDropDownExSpentDropdown, setDropDownExSpentDropdown] = useState(false);
    const handleDropdownExSpent = () => {
        setDropDownExSpentDropdown(!isDropDownExSpentDropdown);
    };
    //dropdown UserACC
    const [isDropDownUserACCDropdown, setDropDownUserACCDropdown] = useState(false);
    const handleDropdownUserACcc = () => {
        setDropDownUserACCDropdown(!isDropDownUserACCDropdown);
    };

    //dropdown Invoice
    const [isDropDownInvoiceDropdown, setDropDownIncoiceDropdown] = useState(false); 
    const handleDropdownInvoice = () => {
        setDropDownIncoiceDropdown(!isDropDownInvoiceDropdown);
    };

    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-[96%] sm:ml-3.5 mt-3 transition-transform -translate-x-full bg-white shadow-sm mb-10 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <div className="my-4 text-center">
                    <h1 className="font-NotoSansKhmer font-bold text-xl">
                        ហាងលក់ <br /> ទំនិញចែប៊ីម៉ាត
                    </h1>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink to="/dashboard" className={navLinkStyle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-gauge"><path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" /><circle cx="12" cy="12" r="2" /><path d="M13.4 10.6 19 5" /></svg>
                            <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                ផ្ទាំងគ្រប់គ្រង
                            </span>
                        </NavLink>
                    </li>


                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownContact}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownContactVisible
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">

                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-contact"><path d="M16 2v2" /><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /><path d="M8 2v2" /><circle cx="12" cy="11" r="3" /><rect x="3" y="4" width="18" height="18" rx="2" /></svg>                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        ទំនាក់ទំនង
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownContactVisible ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownContactVisible
                                ? "max-h-40 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតទំនាក់ទំនង</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីទំនាក់ទំនង</p>
                            </NavLink>

                            <NavLink
                                to="/product-list"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ទំនាក់ទំនង</p>
                            </NavLink>
                        </div>
                    </li>


                    <li className="space-y-2">
                        <button
                            onClick={handleProductDropdown}
                            className={`flex items-center p-3 w-full text-left justify-between ${isProductDropdownVisible
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">

                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-open"><path d="M12 22v-9" /><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" /><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" /><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" /></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        ផលិតផល
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isProductDropdownVisible ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isProductDropdownVisible
                                ? "max-h-40 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                            </NavLink>
                            <NavLink
                                to="/product-list"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                            </NavLink>
                        </div>
                    </li>


                    <li className="space-y-2">
                        <button
                            onClick={handlePurchaseDropdown}
                            className={`flex items-center p-3 w-full text-left justify-between ${isPurcahseDropdownVisible
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                                {/* SVG Icon */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        បញ្ជាទិញទំនិញ
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isPurcahseDropdownVisible ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isPurcahseDropdownVisible
                                ? "max-h-40 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                            </NavLink>
                           
                        </div>
                    </li>

                    <li>
                        <NavLink to="/" className={navLinkStyle}>
                            <svg
                                className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                            >
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                ផ្ទាំងលក់ទំនិញ
                            </span>
                        </NavLink>
                    </li>


                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownPhone}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownPhoneDropdown
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                                {/* SVG Icon */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M13 16H8" /></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        កាតទូរស័ព្ទ
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownPhoneDropdown ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownPhoneDropdown
                                ? "max-h-40 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                            </NavLink>
                            
                        </div>
                    </li>


                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownCost}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownCostDropdown
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                                {/* SVG Icon */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.99 7.5 8.24 3.75m0 0L4.49 7.5m3.75-3.75v16.499h11.25" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        ចំណាយ
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownCostDropdown ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownCostDropdown
                                ? "max-h-40 opacity-100"
                                : "max-h-0 "
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                            </NavLink>
                            
                        </div>
                    </li>

                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownAccount}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownAcocountDropdown
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                                {/* SVG Icon */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        គណនី
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownAcocountDropdown ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownAcocountDropdown
                                ? "max-h-40 opacity-100"
                                : "max-h-0 "
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                            </NavLink>
                          
                        </div>
                    </li>

                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownExSpent}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownExSpentDropdown
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                               
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        វិធីសាស្រ្តបង់ប្រាក់
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownExSpentDropdown ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownExSpentDropdown
                                ? "max-h-40 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                            </NavLink>
                           
                        </div>
                    </li>


                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownUserACcc}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownUserACCDropdown
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                                {/* SVG Icon */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /></svg>                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        អ្នកប្រើប្រាស់
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownUserACCDropdown ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownUserACCDropdown
                                ? "max-h-40 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                            </NavLink>
                           
                        </div>
                    </li>

                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownInvoice}
                            className={`flex items-center p-3 w-full text-left justify-between ${isDropDownInvoiceDropdown
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <div className="flex items-center">
                                {/* SVG Icon */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                        របាយការណ៍
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isDropDownInvoiceDropdown ? "transform rotate-90" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <div
                            id="product-dropdown"
                            className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownInvoiceDropdown
                                ? "max-h-96 opacity-100"
                                : "max-h-0"
                                }`}
                        >
                            <NavLink
                                to="/test"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                        ? "bg-blue-500 dark:bg-blue-500 text-white"
                                        : ""
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                            </NavLink>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
