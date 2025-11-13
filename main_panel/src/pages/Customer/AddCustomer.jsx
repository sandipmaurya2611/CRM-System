import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();

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
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call example (uncomment when backend ready)
      /*
      await API.post("/admin/customers", formData);
      */

      console.log("Submitting:", formData);

      alert("Customer added successfully!");
      navigate("/customers");
    } catch (error) {
      console.error(error);
      alert("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Customer</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Company Name */}
          <div>
            <label className="font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter company name"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="font-medium">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
              placeholder="Owner name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
              placeholder="Company email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium">Phone</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
              placeholder="Contact number"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Company address"
            ></textarea>
          </div>

          {/* Subscription Plan */}
          <div>
            <label className="font-medium">Subscription Plan</label>
            <select
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select Plan</option>
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
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          {/* Status */}
          <div>
            <label className="font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Add Customer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
