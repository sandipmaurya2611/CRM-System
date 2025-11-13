// import React from "react";
// import { FaChevronDown, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

// /**
//  * Reusable Filter & Search Bar Component
//  *
//  * Props:
//  * - filters: array of filter options (e.g., ["All", "Dress", "Bags"])
//  * - selectedFilter: currently selected filter value
//  * - onFilterChange: function(value) => void
//  * - searchValue: current text in search input
//  * - onSearchChange: function(value) => void
//  * - onEditClick: optional callback for edit button
//  * - onDeleteClick: optional callback for delete button
//  * - showActions: boolean (whether to show edit/delete buttons)
//  */
// const FilterSearchBar = ({
//   filters = ["All"],
//   selectedFilter = "",
//   onFilterChange = () => {},
//   searchValue = "",
//   onSearchChange = () => {},
//   onEditClick,
//   onDeleteClick,
//   showActions = true,
// }) => {
//   return (
//     <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
//       {/* Filter + Search Group */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
//         {/* Filter Dropdown */}
//         <div className="relative w-full sm:w-40">
//           <select
//             value={selectedFilter}
//             onChange={(e) => onFilterChange(e.target.value)}
//             className="appearance-none w-full bg-white border border-gray-300 text-gray-500 text-sm rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//           >
//             {filters.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
//         </div>

//         {/* Search Bar */}
//         <div className="relative w-full sm:w-64">
//           <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchValue}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="w-full border border-gray-300 bg-white rounded-md text-sm pl-10 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
//           />
//         </div>
//       </div>

//       {/* Edit & Delete Buttons */}
//       {showActions && (
//         <div className="flex items-center space-x-2 self-end md:self-auto">
//           <button
//             onClick={onEditClick}
//             className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-500 flex items-center justify-center"
//           >
//             <FaEdit className="text-sm" />
//           </button>
//           <button
//             onClick={onDeleteClick}
//             className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-500 flex items-center justify-center"
//           >
//             <FaTrash className="text-sm" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterSearchBar;


import React from "react";
import { FaChevronDown, FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

/**
 * Reusable Filter, Search, and Date Range Component
 *
 * Props:
 * - filters: array of filter options (e.g., ["All", "Dress", "Bags"])
 * - selectedFilter: current filter
 * - onFilterChange(value)
 * - searchValue: string
 * - onSearchChange(value)
 * - startDate: string (YYYY-MM-DD)
 * - endDate: string (YYYY-MM-DD)
 * - onStartDateChange(value)
 * - onEndDateChange(value)
 * - onClearFilters(): resets filters/search/dates
 * - onEditClick()
 * - onDeleteClick()
 * - showActions: boolean
 */
const FilterSearchBar = ({
  filters = ["All"],
  selectedFilter = "",
  onFilterChange = () => {},
  searchValue = "",
  onSearchChange = () => {},
  startDate = "",
  endDate = "",
  onStartDateChange = () => {},
  onEndDateChange = () => {},
  onClearFilters = () => {},
  onEditClick,
  onDeleteClick,
  showActions = true,
}) => {
  return (
    <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
      {/* Left Side: Filters, Dates, Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 w-full md:w-auto flex-wrap">

        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-40">
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 text-gray-500 text-sm rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {filters.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
        </div>
         {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-300 bg-white rounded-md text-sm pl-10 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Start Date */}
        <div className="relative w-full sm:w-40">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full border border-gray-300 bg-white rounded-md text-sm pl-3 pr-2 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* End Date */}
        <div className="relative w-full sm:w-40">
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full border border-gray-300 bg-white rounded-md text-sm pl-3 pr-2 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Clear Filter Button */}
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 text-sm px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition"
        >
          Clear Filter
        </button>
      </div>

      {/* Right Side: Edit & Delete Actions */}
      {showActions && (
        <div className="flex items-center space-x-2 self-end md:self-auto">
          <button
            onClick={onEditClick}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-500 flex items-center justify-center"
          >
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={onDeleteClick}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-500 flex items-center justify-center"
          >
            <FaTrash className="text-sm" />
          </button>
          
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
