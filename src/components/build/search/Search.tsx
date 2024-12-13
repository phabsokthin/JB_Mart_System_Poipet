import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder = 'Search...', value, onChange }) => {
    return (
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                className="w-full pr-10 input_text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className="absolute right-3 top-3.5">
                <FaSearch className="text-gray-500" />
            </div>
        </div>
    );
};

export default Search;
