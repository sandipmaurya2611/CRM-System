import React, { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';

const Payment = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const paymentsData = [
    {
      id: 1,
      customerName: 'John Anderson',
      amount: 1299.99,
      date: '11/5/2025',
      paymentMethod: 'Credit Card',
      transactionId: '#TXN-58743',
      status: 'Success'
    },
    {
      id: 2,
      customerName: 'Sarah Mitchell',
      amount: 899.50,
      date: '11/1/2025',
      paymentMethod: 'PayPal',
      transactionId: '#TXN-19284',
      status: 'Success'
    },
    {
      id: 3,
      customerName: 'Michael Chen',
      amount: 249.99,
      date: '11/4/2025',
      paymentMethod: 'Debit Card',
      transactionId: '#TXN-33451',
      status: 'Failed'
    },
    {
      id: 4,
      customerName: 'Emily Roberts',
      amount: 599.00,
      date: '10/28/2025',
      paymentMethod: 'Credit Card',
      transactionId: '#TXN-98765',
      status: 'Success'
    },
    {
      id: 5,
      customerName: 'David Thompson',
      amount: 1899.99,
      date: '11/3/2025',
      paymentMethod: 'Bank Transfer',
      transactionId: '#TXN-54321',
      status: 'Failed'
    },
    {
      id: 6,
      customerName: 'Lisa Martinez',
      amount: 1499.00,
      date: '10/25/2025',
      paymentMethod: 'Credit Card',
      transactionId: '#TXN-76543',
      status: 'Success'
    },
    {
      id: 7,
      customerName: 'James Wilson',
      amount: 379.99,
      date: '11/6/2025',
      paymentMethod: 'PayPal',
      transactionId: '#TXN-11111',
      status: 'Success'
    },
    {
      id: 8,
      customerName: 'Amanda Garcia',
      amount: 799.50,
      date: '11/2/2025',
      paymentMethod: 'Debit Card',
      transactionId: '#TXN-22222',
      status: 'Failed'
    },
    {
      id: 9,
      customerName: 'Robert Brown',
      amount: 2199.99,
      date: '10/30/2025',
      paymentMethod: 'Credit Card',
      transactionId: '#TXN-33333',
      status: 'Success'
    },
    {
      id: 10,
      customerName: 'Jennifer Davis',
      amount: 449.00,
      date: '11/7/2025',
      paymentMethod: 'Bank Transfer',
      transactionId: '#TXN-44444',
      status: 'Success'
    }
  ];

  const getFilteredPayments = () => {
    let filtered = paymentsData;

    if (activeTab === 'success') {
      filtered = filtered.filter(p => p.status === 'Success');
    } else if (activeTab === 'failed') {
      filtered = filtered.filter(p => p.status === 'Failed');
    }

    return filtered;
  };

  const successCount = paymentsData.filter(p => p.status === 'Success').length;
  const failedCount = paymentsData.filter(p => p.status === 'Failed').length;

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleAccept = (payment) => {
    alert(`Payment ${payment.transactionId} accepted!`);
    setShowModal(false);
  };

  const handleReject = (payment) => {
    alert(`Payment ${payment.transactionId} rejected!`);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Payment Verification</h1>

        {/* Tabs */}
        <div className="flex gap-8 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'all'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Payments ({paymentsData.length})
          </button>
          <button
            onClick={() => setActiveTab('success')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'success'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment Success ({successCount})
          </button>
          <button
            onClick={() => setActiveTab('failed')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'failed'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment Failed ({failedCount})
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    View Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredPayments().map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-600 font-semibold">
                          {payment.customerName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{payment.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{payment.transactionId}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          payment.status === 'Success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{payment.date}</td>
                    <td className="px-6 py-4 text-gray-700">{payment.paymentMethod}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleViewDetails(payment)}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Eye size={18} />
                        <span>View</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAccept(payment)}
                          className="w-7 h-7 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Check size={14} className="text-white" />
                        </button>
                        <button 
                          onClick={() => handleReject(payment)}
                          className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Payment Details */}
        {showModal && selectedPayment && (
<div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Customer Information */}
                  <div className="border-b pb-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Customer Name</p>
                        <p className="font-medium text-gray-900 text-sm">{selectedPayment.customerName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Transaction ID</p>
                        <p className="font-medium text-gray-900 text-sm">{selectedPayment.transactionId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="border-b pb-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Payment Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Amount</p>
                        <p className="font-bold text-lg text-gray-900">${selectedPayment.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Payment Method</p>
                        <p className="font-medium text-gray-900 text-sm">{selectedPayment.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Date</p>
                        <p className="font-medium text-gray-900 text-sm">{selectedPayment.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Status</p>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            selectedPayment.status === 'Success'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {selectedPayment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="border-b pb-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Additional Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Payment Description</p>
                        <p className="text-gray-900 text-sm">Payment for products/services</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Payment ID</p>
                        <p className="text-gray-900 text-sm">{selectedPayment.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Processing Fee</p>
                        <p className="text-gray-900 text-sm">${(selectedPayment.amount * 0.029).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Net Amount</p>
                        <p className="font-semibold text-gray-900 text-sm">
                          ${(selectedPayment.amount - selectedPayment.amount * 0.029).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleAccept(selectedPayment)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      <Check size={16} />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(selectedPayment)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      <X size={16} />
                      Reject
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;