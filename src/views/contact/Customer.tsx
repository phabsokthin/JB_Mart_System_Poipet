import { useState } from 'react'; // Import useState
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { RiContactsBook3Fill } from "react-icons/ri";
import CreateCustomer from '../../components/contact/customer/CreateCustomer';
import CustomerList from '../../components/contact/customer/CustomerList';
import Customerinfo from '../../components/contact/customer/Customerinfo';

const categories = [
    {
        name: 'បង្កើតអតិជន',
    },
    {
        name: 'បញ្ជីអ្នកអតិជន',
    },
    {
        name: 'ព័ត៍មានរបស់អតិជន',
    },
];

function Supplier() {
    const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track the active tab

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
                                    <CreateCustomer  />
                                </TabPanel>
                            </TabPanels>
                            <TabPanels className="mt-3">

                                <TabPanel className="p-4 border">
                                    <CustomerList />
                                </TabPanel>
                                <TabPanels className="mt-3">

                                    <TabPanel className="p-4 border border-gray-300 rounded-md">
                                        <Customerinfo/>
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
