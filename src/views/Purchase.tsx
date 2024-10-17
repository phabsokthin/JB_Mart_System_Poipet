
import Sidebar from './Sidebar'

import Navbar from './Navbar'

function Purchase() {
    return (
        <div>
            <Sidebar />
            <div className="p-4 sm:ml-[17rem]">
                <Navbar />
                <div className="p-4 border-2 border-gray-200  dark:border-gray-700 mt-5">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-center h-24 rounded  bg-white">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded  bg-white">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Purchase