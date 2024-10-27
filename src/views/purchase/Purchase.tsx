import { useState } from 'react'; // Import useState
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { BiPurchaseTag } from "react-icons/bi";
import PurchaseList from '../../components/purchase/PurchaseList';
import PurchaseListInfo from '../../components/purchase/PurchaseListInfo';

const categories = [
    {
        name: 'បញ្ជីទិញផលិតផល',

    },
    {
        name: 'បញ្ជីប្តូរទំនិញវិញ',

    },
    {
        name: 'ព័ត៍មាននៃការទិញ',

    },
    {
        name: 'របាយការណ៍ទិញទាំងអស់',

    },
    
];

function Purchase() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div className='grid grid-cols-6'>
            <Sidebar />
            <div className="col-span-5 p-4">
                <Navbar />
                <div className="w-full p-4 mt-5 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
                    <div className='flex items-center gap-2 py-5'>
                        <BiPurchaseTag className='text-xl ' />
                        <p className='text-lg font-bold font-NotoSansKhmer'>រាយបញ្ជីទិញផលិតផល</p>
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
                                    <PurchaseList/>
                                </TabPanel>
                            </TabPanels>
                            <TabPanels className="mt-3">
                                <TabPanel className="p-4 border">
                                    <p>មិនទានមានបញ្ជីទេ</p>
                                </TabPanel>
                            </TabPanels>
                            <TabPanels className="mt-3">

                                <TabPanel className="p-4 border">
                                    <PurchaseListInfo/>
                                </TabPanel>
                               

                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Purchase;
