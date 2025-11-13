import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../services/api"; // Uncomment when backend ready

const Customers = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      /*
      const res = await API.get("/admin/customers");
      setCustomers(res.data);
      */

      // Dummy data for UI preview
      const dummy = [
        {
          id: 1,
          companyName: "Sunrise Developers",
          ownerName: "Rahul Verma",
          email: "rahul@sunrise.com",
          phone: "9876543210",
          subscriptionPlan: "Yearly",
          status: "active",
        },
        {
          id: 2,
          companyName: "BlueHill Properties",
          ownerName: "Karan Mehta",
          email: "karan@bluehill.com",
          phone: "9988776655",
          subscriptionPlan: "Monthly",
          status: "inactive",
        },
        {
          id: 3,
          companyName: "Skyline Group",
          ownerName: "Rohit Sharma",
          email: "rohit@skyline.com",
          phone: "9123456780",
          subscriptionPlan: "Free",
          status: "active",
        },
      ];

      setCustomers(dummy);
    } catch (error) {
      console.error(error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      `${c.companyName} ${c.ownerName} ${c.email} ${c.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [customers, search]);

  // Delete Customer
  const handleDelete = (id) => {
    const confirmAction = confirm("Are you sure you want to delete this customer?");
    if (!confirmAction) return;

    // API Call (placeholder)
    /*
    await API.delete(`/admin/customers/${id}`);
    */

    setCustomers((prev) => prev.filter((c) => c.id !== id));
    alert("Customer deleted successfully.");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Customers</h2>

        <button
          onClick={() => navigate("/add-customer")}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          + Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          className="w-full md:w-1/3 p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-medium">Company Name</th>
              <th className="p-3 font-medium">Owner</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Subscription</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => (
                <tr key={cust.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{cust.companyName}</td>
                  <td className="p-3">{cust.ownerName}</td>
                  <td className="p-3">{cust.email}</td>
                  <td className="p-3">{cust.phone}</td>
                  <td className="p-3">{cust.subscriptionPlan}</td>

                  {/* Status Badge */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        cust.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cust.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right space-x-2">

                    <button
                      onClick={() => navigate(`/customer/${cust.id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/customer/${cust.id}?edit=true`)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(cust.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
