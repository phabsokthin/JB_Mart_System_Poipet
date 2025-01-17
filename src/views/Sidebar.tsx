import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    // Dropdown states
    const [isContactDropdown, setIsContactDropdown] = useState(false);
    const [isProductDropdown, setIsProductDropdown] = useState(false);
    const [isPurchaseDropdown, setIsPurchaseDropdown] = useState(false);
    // const [isTopupDropdown, setIsTopupDropdown] = useState(false);
    const [isExpenseDropdown, setIsExpenseDropdown] = useState(false);
    // const [isAccountDropdown, setIsAccountDropdown] = useState(false);
    // const [isPaymentMethodDropdown, setIsPaymentMethodDropdown] = useState(false);
    // const [isUsersDropdown, setIsUsersDropdown] = useState(false);
    const [isReportsDropdown, setIsReportsDropdown] = useState(false);
    const [isCurrencyDropdown, setIsCurrencyDropdown] = useState(false);

    const [isBankDropdown, setBankDropdown] = useState(false);

    // Routes
    const contactRoutes = ["/supplier", "/customer", "/contactInfo"];
    const productsRoutes = ["/product","/createProduct", "/productUnit","/category","/brands","/warranty"];
    const purchaseRoutes = ["/purchase", "/createPurchase", '/puchaseReturn'];
    const topupRoutes = ['/topup','/createTopup', '/topuType', '/puchaseTopup']
    const exspenseRoutes = ['/expense', '/expense_list']
    const accountRoutes = ['/account', '/account_list']
    const paymentRoutes = ['/payment', '/payment_list']
    const usersRoutes = ['/payment', '/payment_list']
    const reportsRoutes = ['/reports', '/report_list']
    const currentcyRoutes = ['/exchangeRate', '/currency_list']
    const bankRoutes = ['/bankTypeList', '/bankList', '/bankTransfer']

    // Active route checks
    const isContactActive = contactRoutes.some((route) => location.pathname.startsWith(route));
    const isProductsActive = productsRoutes.some((route) => location.pathname.startsWith(route));
    const isPurchaseActive = purchaseRoutes.some((route) => location.pathname.startsWith(route));
    const isTopupRouteActive = topupRoutes.some((route) => location.pathname.startsWith(route))
    const isExpenseRouteActive = exspenseRoutes.some((route) => location.pathname.startsWith(route))
    const isAccountRouteActive = accountRoutes.some((route) => location.pathname.startsWith(route))
    const isPaymentActive = paymentRoutes.some((route) => location.pathname.startsWith(route))
    const isUsersActive = usersRoutes.some((route) => location.pathname.startsWith(route))
    const isReportsActive = reportsRoutes.some((route) => location.pathname.startsWith(route))
    const isCurrencyActive = currentcyRoutes.some((route) => location.pathname.startsWith(route))
    const isBankActive = bankRoutes.some((route) => location.pathname.startsWith(route))

    // Dropdown behavior on route change
    useEffect(() => {
        if (isContactActive) {
            setIsContactDropdown(true);
        } else {
            setIsContactDropdown(false);
        }

        if (isProductsActive) {
            setIsProductDropdown(true);
        } else {
            setIsProductDropdown(false);
        }

        if (isPurchaseActive) {
            setIsPurchaseDropdown(true);
        } else {
            setIsPurchaseDropdown(false);
        }

        // if (isTopupRouteActive) {
        //     setIsTopupDropdown(true)
        // }
        // else {
        //     setIsTopupDropdown(false)

        // }

        if (isExpenseRouteActive) {
            setIsExpenseDropdown(true)
        }
        else {
            setIsExpenseDropdown(false)

        }

        // if (isAccountRouteActive) {
        //     setIsAccountDropdown(true)
        // }
        // else {
        //     setIsAccountDropdown(false)
        // }

        // if (isPaymentActive) {
        //     setIsPaymentMethodDropdown(true)
        // }
        // else {
        //     setIsPaymentMethodDropdown(false)
        // }

        // if (isUsersActive) {
        //     setIsUsersDropdown(true)
        // }
        // else {
        //     setIsUsersDropdown(false)
        // }

        if(isBankActive){
            setBankDropdown(true)
        }
        else{
            setBankDropdown(false)
        }

        if (isReportsActive) {
            setIsReportsDropdown(true)
        }
        else {
            setIsReportsDropdown(false)
        }

        if (isCurrencyActive) {
            setIsCurrencyDropdown(true)
        }
        else {
            setIsCurrencyDropdown(false)
        }

    }, [isContactActive, isProductsActive, isPurchaseActive, isTopupRouteActive, isExpenseRouteActive, isAccountRouteActive, isPaymentActive, isUsersActive, isReportsActive,isCurrencyActive, isBankActive]);

    const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return `flex items-center p-3 gap-2 ${isActive ? "bg-blue-600 dark:bg-blue-500 text-white" : "text-gray-800 dark:text-white "} `;
    };

    const handleDropdownContact = () => {
        setIsContactDropdown(!isContactDropdown);
    };

    const handleProductDropdown = () => {
        setIsProductDropdown(!isProductDropdown);
    };

    const handlePurchaseDropdown = () => {
        setIsPurchaseDropdown(!isPurchaseDropdown);
    };

    // const handleTopupDropDown = () => {
    //     setIsTopupDropdown(!isTopupDropdown)
    // }

    const handleExspenseDropdown = () => {
        setIsExpenseDropdown(!isExpenseDropdown)
    }

    // const handleAccountDropdown = () => {
    //     setIsAccountDropdown(!isAccountDropdown)
    // }

    // const handlepaymentDropdown = () => {
    //     setIsPaymentMethodDropdown(!isPaymentMethodDropdown)
    // }

    // const handleUsersDropdown = () => {
    //     setIsUsersDropdown(!isUsersDropdown)
    // }

    const handleBankDropdown = () => {
        setBankDropdown(!isBankDropdown)
    }

    const handleReportDropdown = () => {
        setIsReportsDropdown(!isReportsDropdown)
    }

    const handleCurrencyDropdown = () => {
        setIsCurrencyDropdown(!isCurrencyDropdown)
    }


    return (
        
        <aside className=" sm:ml-3.5 mt-3  bg-white mb-10 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className=" px-3 pb-4 sticky top-0 h-[1245px] overflow-y-auto bg-white dark:bg-gray-800 scrollbar-hidden">
                <div className="my-4 text-center">
                    <h1 className="text-xl font-bold font-NotoSansKhmer">ហាងលក់ <br /> ទំនិញចែប៊ីម៉ាត</h1>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink to="/dashboard" className={navLinkStyle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-gauge">
                                <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M13.4 10.6 19 5" />
                            </svg>
                            <span className="flex-1 ml-1 font-bold whitespace-nowrap font-NotoSansKhmer">ផ្ទាំងគ្រប់គ្រង</span>
                        </NavLink>
                    </li>

                    {/* Contact Dropdown */}
                    <li className="space-y-2">
                        <button
                            onClick={handleDropdownContact}
                            className={`flex items-center p-3 w-full text-left justify-between ${isContactDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}
                        >
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-contact">
                                    <path d="M16 2v2" />
                                    <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                                    <path d="M8 2v2" />
                                    <circle cx="12" cy="11" r="3" />
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                </svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">ទំនាក់ទំនង</span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isContactDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isContactDropdown ? "max-h-96 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/supplierList" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">អ្នកផ្គត់ផ្គង់</p>
                            </NavLink>
                            <NavLink to="/customerList" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">អតិជន</p>
                            </NavLink>
                            {/* <NavLink to="/contactInfo" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">អំពីទំនាក់ទំនង</p>
                            </NavLink> */}
                           
                        </div>
                    </li>

                    {/* Product Dropdown */}
                    <li className="space-y-2">
                        <button onClick={handleProductDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isProductDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-open">
                                    <path d="M12 22v-9" />
                                    <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
                                    <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
                                    <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
                                </svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">ផលិតផល</span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isProductDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isProductDropdown ? "max-h-96 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/productList" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                            </NavLink>
                            <NavLink to="/createProduct" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ចូលផលិតផល</p>
                            </NavLink>
                            <NavLink to="/productUnit" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ឯកតាទំនិញ</p>
                            </NavLink>
                            <NavLink to="/category" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ប្រភេទទំនិញ</p>
                            </NavLink>
                            <NavLink to="/brands" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ម៉ាកយីហោ</p>
                            </NavLink>
                            {/* <NavLink to="/warranty" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ការធានាលើទំនិញ</p>
                            </NavLink> */}
                        </div>
                    </li>

                    {/* Purchase Dropdown */}
                    <li className="space-y-2">
                        <button onClick={handlePurchaseDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isPurchaseDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                                </svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">បញ្ជាទិញទំនិញ</span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isPurchaseDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isPurchaseDropdown ? "max-h-40 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/purchase" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីទិញផលិតផល</p>
                            </NavLink>
                            <NavLink to="/createPurchase" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតការទិញផលិតផល</p>
                            </NavLink>
                            <NavLink to="/puchaseReturn" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បង្កើតការផ្លាស់ប្តូទំនិញវិញ</p>
                            </NavLink>
                        </div>
                    </li>
                    {/* Purchase POS */}
                    <li>
                        <NavLink to="/pos" className={navLinkStyle}>
                            <svg
                                className="flex-shrink-0 w-5 h-5 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                            >
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            <span className="flex-1 ml-2 font-bold whitespace-nowrap font-NotoSansKhmer">
                                ផ្ទាំងលក់ទំនិញ
                            </span>
                        </NavLink>
                    </li>

                    {/* Topup Phone dropdown */}
                    {/* <li className="space-y-2">
                        <button onClick={handleTopupDropDown} className={`flex items-center p-3 w-full text-left justify-between ${isTopupDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M13 16H8" /></svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">
                                    កាតទូរស័ព្ទ
                                </span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isTopupDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isTopupDropdown ? "max-h-96 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/topup" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីកាតទូរស័ព្ទ</p>
                            </NavLink>
                            <NavLink to="/createTopup" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">លក់កាត់ទូរស័ព្ទ</p>
                            </NavLink>
                            <NavLink to="/topuType" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ប្រភេទកាតទូរស័ព្ទ</p>
                            </NavLink>
                            <NavLink to="/puchaseTopup" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ទិញចូល</p>
                            </NavLink>
                        </div>
                    </li> */}
                    {/*  Currency Dropdown */}
                    <li className="space-y-2">
                        <button onClick={handleCurrencyDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isCurrencyDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-receipt"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">
                                    រូបិយប័ណ្ណ
                                </span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isCurrencyDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isCurrencyDropdown ? "max-h-40 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/exchangeRate" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">អត្រាប្តូប្រាក់</p>
                            </NavLink>
                        
                        </div>
                    </li>

                    {/*  Extense Dropdown */}
                    <li className="space-y-2">
                        <button onClick={handleExspenseDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isExpenseDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.99 7.5 8.24 3.75m0 0L4.49 7.5m3.75-3.75v16.499h11.25" />
                                </svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">
                                    ចំណាយ
                                </span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isExpenseDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isExpenseDropdown ? "max-h-40 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/expense" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីចំណាយ</p>
                            </NavLink>
                            <NavLink to="/expense_type" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ប្រភេទនៃការចំណាយ</p>
                            </NavLink>
                        </div>
                    </li>


                    {/*  Account Dropdown */}
                    <li className="space-y-2">
                        <button onClick={handleBankDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isBankDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">
                                    គណនី
                                </span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isBankDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isBankDropdown ? "max-h-96 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/bankTypeList" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ប្រភេទគណនី</p>
                            </NavLink>
                            <NavLink to="/bankList" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីគណនី</p>
                            </NavLink>
                            {/* <NavLink to="/bankTransfer" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ផ្ទេរលុយទៅធនាគា</p>
                            </NavLink> */}
                            {/* <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">លំហូរសាច់ប្រាក់</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍គណនីចំណាយ</p>
                            </NavLink> */}
                        </div>
                    </li>

                  
                    {/*  Payment method dropdown */}
                    {/* <li className="space-y-2">
                        <button onClick={handlepaymentDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isPaymentMethodDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>                                    <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">
                                    វិធីសាស្រ្តបង់ប្រាក់
                                </span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isPaymentMethodDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 space-y-2 ${isPaymentMethodDropdown ? "max-h-40 opacity-100" : "max-h-0"}`}>
                            <NavLink to="/paymentMethod" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីវិធីសាស្រ្តបង់ប្រាក់</p>
                            </NavLink>
                            <NavLink to="/paymentMethodType" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">បញ្ជីប្រភេទបង់ប្រាក់</p>
                            </NavLink>
                        </div>
                    </li> */}

            
                    {/*  Report dropdown */}
                    <li className="space-y-2">
                        <button onClick={handleReportDropdown} className={`flex items-center p-3 w-full text-left justify-between ${isReportsDropdown ? "bg-blue-700 dark:bg-blue-500 text-white" : "text-gray-900 dark:text-white"}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                </svg>
                                <span className="flex-1 font-bold ms-3 whitespace-nowrap font-NotoSansKhmer">
                                    របាយការណ៍
                                </span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isReportsDropdown ? "transform rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>


                        <div className={`overflow-hidden transition-all duration-500 ${isReportsDropdown ? "max-h-[900px] opacity-100" : "max-h-0"}`}>
                            <NavLink to="/purchase" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer whitespace-nowrap">របាយការណ៍ចំណេញ/ខាត</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ទិញ & លក់</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ពន្ធ</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer whitespace-nowrap">អតិថិជន & អ្នកផ្គត់ផ្គង់</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ក្រុមអតិថិជន</p>
                            </NavLink>
                            <NavLink to="/purchase" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer whitespace-nowrap">របាយការណ៍ស្តុក</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍កែប្រែស្តុក</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">ផលិតផលពេញនិយម</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer whitespace-nowrap">របាយការណ៍សម្ភារៈ</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ទិញផលិតផល</p>
                            </NavLink>



                            <NavLink to="/purchase" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer whitespace-nowrap">របាយការណ៍លក់ផលិតផល</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ទូទាត់ការទិញ</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ទូទាត់ការលក់</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer whitespace-nowrap">របាយការណ៍ចំណាយ</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍ការបើកផ្ទាំងលក់</p>
                            </NavLink>
                            <NavLink to="/purchase-list" className={navLinkStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-3 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <p className="font-bold font-NotoSansKhmer">របាយការណ៍តំណាងនៃការលក់</p>
                            </NavLink>
                        </div>
                    </li>


                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
