import React from 'react'; 
import { AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineRight, AiOutlineDoubleRight } from "react-icons/ai";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  className = ""
}) => {

  // Get visible pages for pagination
  const getVisiblePages = () => {
    const delta = window.innerWidth < 640 ? 1 : 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <>
    <div className={`sticky bottom-0 bg-white border-t border-gray-200 shadow-lg py-3 sm:py-2 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Mobile/Tablet Pagination - Improved Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Previous Button - Extreme Left */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 border rounded-md text-gray-700 bg-white disabled:opacity-50 text-sm font-medium hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden xs:inline">Previous</span>
            <span className="xs:hidden">Prev</span>
          </button>

          {/* Center Section - Page Info and Dropdown */}
          <div className="flex items-center gap-2 mx-4 flex-1 justify-center">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {currentPage} of {totalPages}
            </span>

            {/* Items per page dropdown - Right aligned, prevents overflow */}
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 min-w-0"
              >
                <option value={7}>7</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Next Button - Extreme Right */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 border rounded-md text-gray-700 bg-white disabled:opacity-50 text-sm font-medium hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
          >
            <span className="hidden xs:inline">Next</span>
            <span className="xs:hidden">Next</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop Pagination - Full Controls */}
        <div className="hidden md:flex items-center justify-center space-x-1.5">
          {/* First Page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
          >
            <AiOutlineDoubleLeft className="w-4 h-4" />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
          >
            <AiOutlineLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {totalPages <= 7
            ? Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`w-10 h-10 border rounded-full text-sm font-semibold transition-colors
                    ${currentPage === pageNumber
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {pageNumber}
                </button>
              ))
            : visiblePages.map((pageNumber, index) =>
                pageNumber === '...' ? (
                  <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
                ) : (
                  <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`w-10 h-10 border rounded-full text-sm font-semibold transition-colors
                      ${currentPage === pageNumber
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {pageNumber}
                  </button>
                )
              )
          }

          {/* Next Page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
          >
            <AiOutlineRight className="w-4 h-4" />
          </button>

          {/* Last Page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
          >
            <AiOutlineDoubleRight className="w-4 h-4" />
          </button>

          {/* Items per page dropdown */}
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="ml-4 px-3 py-2 border border-blue-300 rounded-md text-sm text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
          >
            <option value={7} className="text-blue-600">7</option>
            <option value={20 } className="text-blue-600">20</option>
            <option value={50} className="text-blue-600">50</option>
          </select>
        </div>
      </div>
    </div>
    </>
  );
};

export default Pagination;