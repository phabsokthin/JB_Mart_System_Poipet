// import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Dashboard() {

    
    return (
        
        <div className='grid grid-cols-6'>
            <Sidebar />
            <div className="col-span-5 p-4 select-none">
                <Navbar />
                <div className="mt-5">
                    <div className="grid grid-cols-4 gap-4 mb-4 lg:grid-cols-4">
                        <div className="flex items-center h-24 bg-white border-t-2 border-blue-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='p-3 rounded-full bg-blue-500/20'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-blue-500 size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-600 font-NotoSansKhmer'>300</h3>
                                    <h3 className='font-bold text-gray-600 font-NotoSansKhmer'>លក់សរុប</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24 bg-white border-t-2 border-green-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='p-3 rounded-full bg-green-500/20'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-green-500 size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                    </svg>

                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-600 font-NotoSansKhmer'>4400</h3>
                                    <h3 className='font-bold text-gray-600 font-NotoSansKhmer'>ទិញសរុប</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24 bg-white border-t-2 border-red-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='p-3 rounded-full bg-red-500/20'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red-500 size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>


                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-600 font-NotoSansKhmer'>3030</h3>
                                    <h3 className='font-bold text-gray-600 font-NotoSansKhmer'>លក់ជំពាក់</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24 bg-white border-t-2 border-yellow-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='p-3 rounded-full bg-yellow-500/20'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-yellow-500 size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                                    </svg>


                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-700 font-NotoSansKhmer'>300</h3>
                                    <h3 className='font-bold text-gray-700 font-NotoSansKhmer'>ទិញជំពាក់</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Dashboard