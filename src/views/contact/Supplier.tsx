import { useState } from 'react'; // Import useState
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { RiContactsBook3Fill } from "react-icons/ri";
// import CreateSupplier from '../../components/contact/supplier/CreateSupplier';
import SupplierList from '../../components/contact/supplier/SupplierList';
import SupplierInfo from '../../components/contact/supplier/SupplierInfo';

const categories = [
    {
        name: 'បង្កើតអ្នកផ្គត់ផ្គង់',

    },
    {
        name: 'បញ្ជីអ្នកផ្គត់ផ្គង់',

    },
    // {
    //     name: 'ព័ត៍មានរបស់អ្នកផ្គត់ផ្គង់',
    // },
];

function Supplier() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div className='grid grid-cols-6'>
            <Sidebar />
            <div className="col-span-5 p-4">
                <Navbar />
                <div className="w-full p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">
                    <div className='flex items-center gap-2 py-5'>
                        <RiContactsBook3Fill className='text-lg ' />
                        <p className='text-lg font-bold font-NotoSansKhmer'>អ្នកផ្គត់ផ្គង់</p>
                    </div>
                    <div className="w-full">
                        <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
                            <TabList className="flex gap-4">
                                {categories.map(({ name }, index) => (
                                    <Tab
                                        key={name}
                                        className={`rounded-full py-3 px-4 text-sm  text-black font-NotoSansKhmer font-bold ${activeTabIndex === index ? 'border-[2px] border-blue-500' : 'border-2'} focus:outline-none`}
                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanels className="mt-3">
                                <TabPanel className="p-4">
                                    {/* <CreateSupplier /> */}
                                </TabPanel>
                            </TabPanels>
                            <TabPanels className="mt-3">

                                <TabPanel className="p-4 border">
                                    <SupplierList />
                                </TabPanel>
                                <TabPanels className="mt-3">

                                    <TabPanel className="p-4 border border-gray-300 rounded-md">
                                        <SupplierInfo/>
                                    </TabPanel>

                                </TabPanels>

                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Supplier;
