import React, { useState } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    name: "Basic",
    billingType: "both",
    monthlyPrice: "",
    yearlyPrice: "",
    productLimit: "",
    features: [{ text: "", included: true }],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { text: "", included: true }],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Plan name is required";
    if (
      formData.billingType !== "yearly" &&
      (!formData.monthlyPrice || formData.monthlyPrice <= 0)
    )
      newErrors.monthlyPrice = "Valid monthly price is required";
    if (
      formData.billingType !== "monthly" &&
      (!formData.yearlyPrice || formData.yearlyPrice <= 0)
    )
      newErrors.yearlyPrice = "Valid yearly price is required";
    if (formData.features.some((f) => !f.text.trim()))
      newErrors.features = "All features must have descriptions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log("Form Data:", formData);
    alert("✅ Subscription plan created successfully!");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "Basic",
      billingType: "both",
      monthlyPrice: "",
      yearlyPrice: "",
      productLimit: "",
      features: [{ text: "", included: true }],
    });
    setErrors({});
  };

  const calculateDiscount = () => {
    if (formData.monthlyPrice && formData.yearlyPrice) {
      const monthlyCost = formData.monthlyPrice * 12;
      const yearlyCost = formData.yearlyPrice;
      return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl">
        {/* Header - Left Aligned */}
        <div className="mb-6 text-left border-b border-gray-300 pb-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Create Subscription Plan
          </h1>
          <p className="text-sm text-gray-500">
            Manage your marketplace pricing and plan features easily
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-10">
            {/* Section 1 - Basic Information */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-xs">
                  1
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Basic Information
                </h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Plan Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Plan Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 text-sm bg-white border ${errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg text-gray-800 focus:outline-none focus:border-black transition-colors`}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Elite">Elite</option>
                  </select>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Billing Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Billing Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="billingType"
                    value={formData.billingType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                {/* Product Limit */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Employee Limit
                  </label>
                  <input
                    type="text"
                    name="productLimit"
                    value={formData.productLimit}
                    onChange={handleInputChange}
                    placeholder="e.g., 50, 500, Unlimited"
                    className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Section 2 - Pricing Details */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-xs">
                  2
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Pricing Details
                </h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {(formData.billingType === "monthly" ||
                  formData.billingType === "both") && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Monthly Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          name="monthlyPrice"
                          value={formData.monthlyPrice}
                          onChange={handleInputChange}
                          placeholder="499"
                          className={`w-full pl-8 pr-3 py-2.5 text-sm bg-white border ${errors.monthlyPrice
                            ? "border-red-500"
                            : "border-gray-300"
                            } rounded-lg text-gray-800 focus:outline-none focus:border-black`}
                        />
                      </div>
                      {errors.monthlyPrice && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.monthlyPrice}
                        </p>
                      )}
                    </div>
                  )}

                {(formData.billingType === "yearly" ||
                  formData.billingType === "both") && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Yearly Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          name="yearlyPrice"
                          value={formData.yearlyPrice}
                          onChange={handleInputChange}
                          placeholder="4990"
                          className={`w-full pl-8 pr-3 py-2.5 text-sm bg-white border ${errors.yearlyPrice
                            ? "border-red-500"
                            : "border-gray-300"
                            } rounded-lg text-gray-800 focus:outline-none focus:border-black`}
                        />
                      </div>
                      {errors.yearlyPrice && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.yearlyPrice}
                        </p>
                      )}
                      {formData.monthlyPrice &&
                        formData.yearlyPrice &&
                        formData.billingType === "both" && (
                          <p className="text-green-600 text-xs mt-1 font-medium">
                            💰 Save ₹
                            {(
                              formData.monthlyPrice * 12 -
                              formData.yearlyPrice
                            ).toFixed(2)}{" "}
                            ({calculateDiscount()}% off yearly)
                          </p>
                        )}
                    </div>
                  )}
              </div>
            </section>

            {/* Section 3 - Plan Features */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-xs">
                  3
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Plan Features
                </h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-300 transition-colors"
                  >
                    <span className="text-xs text-gray-500">{index + 1}.</span>
                    <input
                      type="text"
                      value={feature.text}
                      onChange={(e) =>
                        handleFeatureChange(index, "text", e.target.value)
                      }
                      placeholder="Feature description"
                      className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black"
                    />
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-gray-300">
                      <input
                        type="checkbox"
                        checked={feature.included}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "included",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-black rounded"
                      />
                      <span className="text-xs text-gray-700">Include</span>
                    </label>
                    {formData.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {errors.features && (
                <p className="text-red-500 text-xs mt-1">{errors.features}</p>
              )}

              <button
                onClick={addFeature}
                className="mt-3 w-full border-2 border-dashed border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:border-black hover:text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-xs"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </section>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-300">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <Save className="w-4 h-4" />
                Create Plan
              </button>
              <button
                onClick={resetForm}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
