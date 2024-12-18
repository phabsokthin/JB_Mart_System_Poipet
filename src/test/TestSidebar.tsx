
import { RiContactsBook3Fill } from "react-icons/ri";
import Sidebar from '../views/Sidebar';
import Navbar from '../views/Navbar';




function Supplier() {

    return (
        <div className='grid grid-cols-6'>
            <Sidebar />
            <div className=" p-4 col-span-5">
                <Navbar />
                <div className="p-4 bg-white dark:border-gray-700 mt-5 animate-fade-up animate-duration-2000 animate-ease-in-out ">
                    <div className='flex items-center gap-2 py-5'>
                        <RiContactsBook3Fill className=' text-lg' />
                        <p className='font-NotoSansKhmer font-bold text-lg'>អតិជន</p>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Supplier;
