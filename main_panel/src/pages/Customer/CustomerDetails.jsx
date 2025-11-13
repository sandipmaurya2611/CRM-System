import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import API from "../../services/api"; // Uncomment when backend ready

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    subscriptionPlan: "",
    startDate: "",
    endDate: "",
    status: "active",
    employeesCount: 0,
    activityLog: [],
  });

  // Fetch Customer Details
  const fetchCustomer = async () => {
    try {
      // Example static data — replace with API when backend ready
      /*
      const res = await API.get(`/admin/customers/${id}`);
      setFormData(res.data);
      */

      const dummy = {
        companyName: "Sunrise Developers",
        ownerName: "Rahul Verma",
        email: "rahul@sunrise.com",
        phone: "9876543210",
        address: "Mumbai, Maharashtra",
        subscriptionPlan: "yearly",
        startDate: "2024-01-10",
        endDate: "2025-01-10",
        status: "active",
        employeesCount: 14,
        activityLog: ["Logged in 3 times", "Added 20 leads", "Updated pricing settings"],
      };

      setFormData(dummy);
    } catch (error) {
      console.error(error);
      alert("Failed to load customer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  // Handle edit inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Save Customer Details
  const handleSave = async () => {
    try {
      /*
      await API.put(`/admin/customers/${id}`, formData);
      */
      alert("Customer updated successfully!");
      setEditMode(false);
    } catch (e) {
      alert("Failed to update");
    }
  };

  // Reset Password
  const handleResetPassword = () => {
    const confirmAction = confirm("Reset password for this customer?");
    if (confirmAction) {
      // API call
      alert("Password reset link sent!");
    }
  };

  // Deactivate Account
  const handleToggleStatus = async () => {
    const newStatus = formData.status === "active" ? "inactive" : "active";

    const confirmAction = confirm(`Are you sure to mark customer as ${newStatus}?`);
    if (!confirmAction) return;

    setFormData((p) => ({ ...p, status: newStatus }));

    try {
      /*
      await API.put(`/admin/customers/${id}/status`, { status: newStatus });
      */
      alert(`Customer marked as ${newStatus}`);
    } catch (e) {
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Customer Details</h2>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            Edit Info
          </button>
        )}
      </div>

      {/* Main Card */}
      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Company Name */}
        <div>
          <label className="font-medium">Company Name</label>
          <input
            type="text"
            disabled={!editMode}
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="font-medium">Owner Name</label>
          <input
            type="text"
            disabled={!editMode}
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            disabled={!editMode}
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium">Phone</label>
          <input
            type="text"
            disabled={!editMode}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="font-medium">Address</label>
          <textarea
            disabled={!editMode}
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          ></textarea>
        </div>

        {/* Subscription */}
        <div>
          <label className="font-medium">Subscription Plan</label>
          <select
            disabled={!editMode}
            name="subscriptionPlan"
            value={formData.subscriptionPlan}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          >
            <option value="free">Free</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="font-medium">Start Date</label>
          <input
            type="date"
            disabled={!editMode}
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="font-medium">End Date</label>
          <input
            type="date"
            disabled={!editMode}
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded disabled:bg-gray-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="font-medium">Status</label>
          <input
            disabled
            value={formData.status.toUpperCase()}
            className={`w-full mt-1 p-2 border rounded font-semibold text-center 
              ${formData.status === "active" ? "text-green-600" : "text-red-600"}
              bg-gray-100`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        {editMode && (
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-green-600 text-white rounded shadow"
          >
            Save Changes
          </button>
        )}

        <button
          onClick={handleResetPassword}
          className="px-5 py-2 bg-yellow-500 text-white rounded shadow"
        >
          Reset Password
        </button>

        <button
          onClick={handleToggleStatus}
          className={`px-5 py-2 text-white rounded shadow 
            ${formData.status === "active" ? "bg-red-600" : "bg-blue-600"}`}
        >
          {formData.status === "active" ? "Deactivate" : "Activate"}
        </button>
      </div>

      {/* Activity Log */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg mb-3">Activity Log</h3>

        {formData.activityLog.length === 0 ? (
          <p className="text-gray-500">No recent activity.</p>
        ) : (
          <ul className="list-disc ml-6 text-gray-700">
            {formData.activityLog.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Employees Count */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg">Employees Count</h3>
        <p className="text-xl font-bold mt-2">{formData.employeesCount}</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
