import { useState } from 'react'; // Import useState

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Sample categories with posts for demonstration
const categories = [
    {
        name: 'Recent',
        
    },
    {
        name: 'Popular',
      
    },
    {
        name: 'Trending',
       
    },
];

function Supplier() {
    const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track the active tab

    return (
        <div>
            <Sidebar />
            <div className="p-4 sm:ml-[17rem]">
                <Navbar />
                <div className="p-4 border-2 border-gray-200 bg-white dark:border-gray-700 mt-5">
                    <div>
                        <p className='font-NotoSansKhmer font-bold'>ទំនាក់ទំនង</p>
                    </div>
                    <div className="w-full max-w-md">
                        <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
                            <TabList className="flex gap-4">
                                {categories.map(({ name }, index) => (
                                    <Tab
                                        key={name}
                                        className={`rounded-full py-2 px-5 text-sm font-semibold text-black ${activeTabIndex === index ? 'border-[1px] border-blue-500' : 'border-2'} focus:outline-none`}
                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanels className="mt-3">
                              
                                    <TabPanel  className="p-4 border border-gray-300 rounded-md">
                                        <div>Recent</div>
                                    </TabPanel>
                             
                            </TabPanels>
                            <TabPanels className="mt-3">
                              
                              <TabPanel  className="p-4 border border-gray-300 rounded-md">
                                  <div>Recents</div>
                              </TabPanel>
                              <TabPanels className="mt-3">
                              
                              <TabPanel  className="p-4 border border-gray-300 rounded-md">
                                  <div>Recentsweew</div>
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
