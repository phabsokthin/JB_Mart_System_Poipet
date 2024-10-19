import { useState } from 'react'; // Import useState
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { RiContactsBook3Fill } from "react-icons/ri";
import SupplierDetail from '../../components/contact/supplier/SupplierDetail';
import CustomerDetails from '../../components/contact/customer/CustomerDetail';

const categories = [
    {
        name: 'អំពីអ្នកផ្គត់ផ្គង់',

    },
    {
        name: 'អំពីអតិថិជន',

    }
];

function ContactInfo() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div className='grid grid-cols-6'>
            <Sidebar />
            <div className="p-4 col-span-5">
                <Navbar />
                <div className="p-4 bg-white w-full dark:border-gray-700 mt-5  animate-fade-up animate-duration-2000 animate-ease-in-out">
                    <div className='flex items-center gap-2 py-5'>
                        <RiContactsBook3Fill className=' text-lg' />
                        <p className='font-NotoSansKhmer font-bold text-lg'>ព័ត៍មានផ្សេងៗពីទំនាក់ទំនង</p>
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
                                <TabPanel className="p-4 border">
                                    <SupplierDetail/>
                                </TabPanel>
                            </TabPanels>
                            <TabPanels className="mt-3">

                                <TabPanel className="p-4 border">
                                    <CustomerDetails/>
                                </TabPanel>
                               

                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
