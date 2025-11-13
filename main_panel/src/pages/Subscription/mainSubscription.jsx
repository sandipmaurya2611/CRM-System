import React, { useState } from "react";
import { Check, Plus, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import subscriptionPlans from "./mainSubscription.json";

export default function MainSubscription() {
  const [billingCycle, setBillingCycle] = useState("Monthly");

  // Editable plans
  const [plans, setPlans] = useState(subscriptionPlans);

  // Track open dropdown
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (planName) => {
    setOpenMenu(openMenu === planName ? null : planName);
  };

  // Delete plan
  const handleDelete = (plan) => {
    if (window.confirm(`Are you sure you want to delete ${plan.name}?`)) {
      setPlans((prev) => prev.filter((p) => p.name !== plan.name));
      setOpenMenu(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-8 py-12">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1"></div>

          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              CRM Subscription Plans
            </h1>
            <p className="text-gray-500 mt-2">
              Choose the best plan for your CRM
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            <Link to="/subscriptionForm">
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-800 transition-colors">
                <Plus size={20} /> Add Subscription
              </button>
            </Link>
          </div>
        </div>

        {/* Billing Switch */}
        <div className="inline-flex bg-white rounded-full p-0.5 shadow-sm border border-gray-200">
          <button
            onClick={() => setBillingCycle("Monthly")}
            className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${
              billingCycle === "Monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBillingCycle("Yearly")}
            className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${
              billingCycle === "Yearly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow flex flex-col overflow-visible"
          >
            {/* 3-dot menu button */}
            <button
              onClick={() => toggleMenu(plan.name)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <MoreVertical size={20} />
            </button>

            {/* Dropdown Menu */}
            {openMenu === plan.name && (
              <div
                className="absolute top-10 right-4 bg-white rounded-md shadow-xl 
                           ring-1 ring-gray-200 w-36 z-50 overflow-visible"
              >
                {/* Edit using Link */}
                <Link
                  to="/subscriptionForm"
                  state={{ plan }}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-t-md"
                >
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(plan)}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-md"
                >
                  Delete
                </button>
              </div>
            )}

            {/* Name */}
            <h2 className="text-xl font-bold mb-1 text-gray-900">{plan.name}</h2>

            {/* Price */}
            <div className="mb-4">
              {plan.priceMonthly !== null ? (
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹
                    {billingCycle === "Monthly"
                      ? plan.priceMonthly
                      : plan.priceYearly}
                  </span>
                  <span className="text-gray-500 ml-1 text-sm">/month</span>
                </div>
              ) : (
                <div className="text-3xl font-bold text-gray-900">
                  Contact Us
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6 flex-grow">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 text-sm"
                >
                  <Check className="text-green-600 mr-2 mt-0.5" size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
              {plan.name === "Free"
                ? "Get Started"
                : plan.name === "Basic"
                ? "Choose Basic"
                : plan.name === "Pro"
                ? "Choose Pro"
                : plan.name === "Elite"
                ? "Choose Elite"
                : "Contact Sales"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
