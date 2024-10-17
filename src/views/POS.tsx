
import Sidebar from './Sidebar'

import Navbar from './Navbar'

function POS() {
    return (
        <div>
            <Sidebar />
            <div className="p-4 sm:ml-[17rem]">
                <Navbar />
                <div className="p-4 border-2 border-gray-200  dark:border-gray-700 mt-5">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-center h-24 rounded  bg-white">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                              POS System
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default POS