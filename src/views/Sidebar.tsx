import { NavLink } from "react-router-dom";

function Sidebar() {
    const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return `flex items-center p-3 ${isActive ? 'bg-blue-600 dark:bg-blue-500 text-white dark:text-white' : 'text-gray-900 dark:text-white'}`;
    };

    return (
        <>
            <div className="">
                <aside className="fixed top-0 left-0 z-40 w-64 h-[96%] sm:ml-3.5 mt-3 transition-transform -translate-x-full bg-white shadow-sm mb-10 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <div className="my-4 text-center">
                            <h1 className="font-NotoSansKhmer font-bold text-xl">ហាងលក់ <br /> ទំនិញចែប៊ីម៉ាត</h1>
                        </div>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <NavLink to={'/dashboard'} className={navLinkStyle}>
                                    <svg className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">ផ្ទាំងគ្រប់គ្រង</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/test'} className={navLinkStyle}>
                                    <svg className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Test</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Sidebar;
