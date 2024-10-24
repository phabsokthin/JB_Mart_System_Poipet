import React, { useState } from "react";

// Sample supplier list
const suppliers = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
  { id: 4, name: "Supplier D" },
  { id: 5, name: "Supplier E" },
  { id: 6, name: "Supplier F" },
  { id: 7, name: "Supplier G" },
];

function SearchSupplierDropdown() {
    
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSupplier, setSelectedSupplier] = useState<{ id: number; name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle selection of a supplier
  const handleSelectSupplier = (supplier: { id: number; name: string }) => {
    setSelectedSupplier(supplier);
    setSearchQuery(supplier.name);
    setShowDropdown(false); 
  };

  // Toggle the dropdown visibility and clear search if reopening
  const toggleDropdown = () => {
    setShowDropdown((prev) => {
      const newState = !prev;
      if (newState) {
        setSearchQuery(""); 
      }
      return newState;
    });
  };

  return (
    <div className="relative w-64">

      {/* Button to toggle dropdown */}
      <div
        className="input_text "
        onClick={toggleDropdown}
      >
        {selectedSupplier ? `${selectedSupplier.id}: ${selectedSupplier.name}` : "ជ្រើសរើសអ្នកផ្គត់ផ្គង់"}
      </div>

      {/* Dropdown for filtered suppliers */}
      {showDropdown && (
        <div className="absolute left-0 z-10 w-full p-3 mt-1 bg-white border border-gray-300 rounded shadow-md">
          {/* Search input inside the dropdown */}
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 input_text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)} // Keep dropdown open on focus
          />

          <ul className="overflow-y-auto max-h-48">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <li
                  key={supplier.id}
                  className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                  onClick={() => handleSelectSupplier(supplier)}
                >
                  {/* Display supplier ID and name */}
                  {`${supplier.id}: ${supplier.name}`}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No suppliers found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchSupplierDropdown;
