import React from 'react';

interface PaginationProps {
    totalPage: number;
    page: number;
    onPageChange: (newPage: number) => void;
    siblings?: number; 
}

// Function to convert numbers to Khmer numerals
const toKhmerNumerals = (num: number): string => {
    const khmerDigits = [
        '០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'
    ];
    return num
        .toString()
        .split('')
        .map(digit => khmerDigits[parseInt(digit)])
        .join('');
};

const Pagination: React.FC<PaginationProps> = ({ totalPage, page, onPageChange, siblings = 1 }) => {
    const getPageNumbers = (): number[] => {
        const pages: number[] = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="mt-5">
            <ul className="flex pagination">
                {/* Previous Button */}
                <li
                    className={`border-[1px] text-gray-500 p-2 px-4 hover:border-blue-600 m-1 ${
                        page === 1 ? 'disabled opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(page - 1)}
                        aria-label="Previous"
                        disabled={page === 1}
                    >
                        <span aria-hidden="true">ត្រលប់</span>
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map((pageNumber) =>
                    pageNumber <= siblings ||
                    pageNumber >= totalPage - siblings ||
                    (pageNumber >= page - siblings && pageNumber <= page + siblings) ? (
                        <li
                            key={pageNumber}
                            className={`m-1 ${
                                page === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                            <button
                                className={`w-10 h-10 ${
                                    page === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {toKhmerNumerals(pageNumber)} {/* Convert to Khmer numeral */}
                            </button>
                        </li>
                    ) : null
                )}

                {/* Next Button */}
                <li
                    className={`border-[1px] text-gray-500 p-2 px-3 hover:border-blue-600 m-1 ${
                        page === totalPage ? 'disabled opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <button
                        onClick={() => onPageChange(page + 1)}
                        aria-label="Next"
                        disabled={page === totalPage}
                    >
                        <span aria-hidden="true">បន្ទាប់</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
