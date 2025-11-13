import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/common/Pagination"
import FilterSearchBar from "../../components/common/FilterSearchBar"

const Customers= () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rakesh Mishra",
      initial: "R",
      location: "Sawaynchester",
      orders: 5,
      spent: "RS.2500",
      status: "Pending",
      joinDate: "2023-10-15",
    },
    {
      id: 2,
      name: "Lakshman singh",
      initial: "L",
      location: "Kaydenville",
      orders: 12,
      spent: "RS.1500",
      status: "Delivered",
      joinDate: "2023-09-20",
    },
    {
      id: 3,
      name: "Dinanath sah",
      initial: "D",
      location: "East Freidaton",
      orders: 6,
      spent: "RS.5600",
      status: "Cancelled",
      joinDate: "2023-11-05",
    },
    {
      id: 4,
      name: "Anmol yadav",
      initial: "A",
      location: "South Marcellus",
      orders: 3,
      spent: "RS.8500",
      status: "Pending",
      joinDate: "2023-10-28",
    },
    {
      id: 5,
      name: "Raushan singh Rajput",
      initial: "R",
      location: "South Olestad",
      orders: 15,
      spent: "RS.5500",
      status: "Delivered",
      joinDate: "2023-09-15",
    },
    {
      id: 6,
      name: "Lokesh Rahul",
      initial: "L",
      location: "Dereckberg",
      orders: 12,
      spent: "RS.2500",
      status: "Cancelled",
      joinDate: "2023-11-02",
    },
    {
      id: 7,
      name: "Randhir Kumar",
      initial: "R",
      location: "Franeckiview",
      orders: 5,
      spent: "RS.500",
      status: "Delivered",
      joinDate: "2023-10-10",
    },
    {
      id: 8,
      name: "Khushi Kumari",
      initial: "K",
      location: "Port Kathryne",
      orders: 7,
      spent: "RS.6500",
      status: "Pending",
      joinDate: "2023-09-25",
    },
    {
      id: 9,
      name: "Pooja Kumari",
      initial: "P",
      location: "McGlynnstown",
      orders: 14,
      spent: "RS.5500",
      status: "Delivered",
      joinDate: "2023-11-01",
    },
    {
      id: 10,
      name: "Ruhi Kumari",
      initial: "R",
      location: "Krystalview",
      orders: 5,
      spent: "RS.9005",
      status: "Pending",
      joinDate: "2023-10-05",
    },
  ]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);

    const newSelectedCustomers = {};
    if (isChecked) {
      customers.forEach((customer) => {
        newSelectedCustomers[customer.id] = true;
      });
    }
    setSelectedCustomers(newSelectedCustomers);
  };

  const handleCustomerCheck = (customerId) => {
    setSelectedCustomers((prev) => ({
      ...prev,
      [customerId]: !prev[customerId],
    }));
  };

  // ✅ Handle status change for dropdown
  const handleStatusChange = (id, newStatus) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  // Filter customers based on search query, active tab, and date range
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        searchQuery === "" ||
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toString().includes(searchQuery);

      const matchesStatus =
        activeTab === "all" ||
        (activeTab === "active" && customer.status === "Active") ||
        (activeTab === "inactive" && customer.status === "Inactive");

      let matchesDate = true;
      if (startDate || endDate) {
        const customerDate = new Date(customer.joinDate);
        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          if (customerDate < start) matchesDate = false;
        }
        if (endDate && matchesDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          if (customerDate > end) matchesDate = false;
        }
      }

      const matchesAdditionalFilter =
        selectedFilter === "All" ||
        (selectedFilter === "High Value" &&
          parseFloat(customer.spent.replace(/[^0-9.-]+/g, "")) > 5000) ||
        (selectedFilter === "Frequent" && customer.orders > 10);

      return (
        matchesSearch && matchesStatus && matchesDate && matchesAdditionalFilter
      );
    });
  }, [customers, searchQuery, activeTab, startDate, endDate, selectedFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 h-full ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {}}
              className="px-4 py-2 text-white font-medium text-gray-700 dark:text--300 bg-black dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Export
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm px-6 sm:px-8 h-full flex flex-col mt-2">
          
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => handleTabChange("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                All Customers
              </button>
              {/* <button
                onClick={() => handleTabChange("active")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "active"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleTabChange("inactive")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "inactive"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Inactive
              </button> */}
            </nav>
          </div>

          {/* Search and Filter */}
          <FilterSearchBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onClearFilters={() => {
              setSearchQuery("");
              setStartDate("");
              setEndDate("");
              setActiveTab("all");
              setSelectedFilter("All");
              setCurrentPage(1);
            }}
            filters={["All", "High Value", "Frequent"]}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            showActions
          />

          <div
            className="rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col"
            style={{ maxHeight: "calc(100vh - 300px)" }}
          >
            <div
              className="overflow-x-auto overflow-y-auto flex-1"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#9CA3AF #F3F4F6",
              }}
            >
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={selectAllChecked}
                          onChange={handleSelectAll}
                        />
                        <span className="ml-2">Customer</span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            checked={selectedCustomers[customer.id] || false}
                            onChange={() => handleCustomerCheck(customer.id)}
                          />
                          <div className="ml-4 flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium">
                              {customer.initial}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {customer.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {customer.id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.spent}
                      </td>

                      {/* ✅ Dropdown Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={customer.status}
                          onChange={(e) =>
                            handleStatusChange(customer.id, e.target.value)
                          }
                          className={`text-xs font-semibold rounded-full px-2 py-1 focus:outline-none ${
                            customer.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : customer.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(customer.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
          totalItems={filteredCustomers.length}
        />
      </div>
    </div>
  );
};

export default Customers;
