import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { formatDistanceToNow, format } from 'date-fns';
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaKey,
  FaBan,
  FaUsers,
  FaChartLine,
  FaHistory,
  FaSignInAlt,
  FaDesktop,
  FaMobile,
  FaTabletAlt,
  FaGlobe,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaArrowLeft
} from 'react-icons/fa';
import { MdBusinessCenter, MdActivity } from 'react-icons/md';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import api from '../services/api';
import './CustomerDetails.css';

// Validation Schema for Edit Mode
const editCustomerSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required').min(2).max(100),
  ownerName: yup.string().required('Owner name is required').min(2).max(50),
  email: yup.string().required('Email is required').email('Invalid email'),
  phone: yup.string().required('Phone is required').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
  address: yup.string().required('Address is required').min(10).max(200)
});

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [activityLog, setActivityLog] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(editCustomerSchema),
    mode: 'onBlur'
  });

  useEffect(() => {
    fetchCustomerData();
  }, [id]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCustomerDetails(),
        fetchSubscriptionDetails(),
        fetchActivityLog(),
        fetchLoginHistory(),
        fetchEmployeeCount()
      ]);
    } catch (error) {
      toast.error('Failed to load customer data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async () => {
    const response = await api.get(`/admin/customers/${id}`);
    setCustomer(response.data);
    reset({
      companyName: response.data.company_name,
      ownerName: response.data.owner_name,
      email: response.data.email,
      phone: response.data.phone,
      address: response.data.address
    });
  };

  const fetchSubscriptionDetails = async () => {
    const response = await api.get(`/admin/customers/${id}/subscription`);
    setSubscription(response.data);
  };

  const fetchActivityLog = async (filter = 'all') => {
    const params = filter !== 'all' ? `?type=${filter}` : '';
    const response = await api.get(`/admin/customers/${id}/activity-log${params}`);
    setActivityLog(response.data.data);
  };

  const fetchLoginHistory = async () => {
    const response = await api.get(`/admin/customers/${id}/login-history`);
    setLoginHistory(response.data.data);
  };

  const fetchEmployeeCount = async () => {
    const response = await api.get(`/admin/customers/${id}/employee-count`);
    setEmployeeCount(response.data.count);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await api.put(`/admin/customers/${id}`, {
        company_name: data.companyName,
        owner_name: data.ownerName,
        email: data.email,
        phone: data.phone,
        address: data.address
      });
      
      toast.success('Customer details updated successfully');
      setIsEditMode(false);
      fetchCustomerDetails();
    } catch (error) {
      toast.error('Failed to update customer details');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (window.confirm(`Send password reset link to ${customer.email}?`)) {
      try {
        await api.post(`/admin/customers/${id}/reset-password`);
        toast.success('Password reset email sent successfully');
      } catch (error) {
        toast.error('Failed to send password reset email');
      }
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmText = customer.status === 'active' ? 'deactivate' : 'activate';
    
    if (window.confirm(`Are you sure you want to ${confirmText} this account?`)) {
      try {
        await api.post(`/admin/customers/${id}/toggle-status`);
        toast.success(`Account ${confirmText}d successfully`);
        fetchCustomerDetails();
      } catch (error) {
        toast.error(`Failed to ${confirmText} account`);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    reset({
      companyName: customer.company_name,
      ownerName: customer.owner_name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    });
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile': return <FaMobile />;
      case 'tablet': return <FaTabletAlt />;
      case 'desktop': return <FaDesktop />;
      default: return <FaGlobe />;
    }
  };

  const getActivityIcon = (activityType) => {
    const icons = {
      login: <BiLogIn className="activity-icon-login" />,
      logout: <BiLogOut className="activity-icon-logout" />,
      lead_added: <FaUser className="activity-icon-create" />,
      lead_updated: <FaEdit className="activity-icon-update" />,
      lead_deleted: <FaTimes className="activity-icon-delete" />,
      property_added: <FaBuilding className="activity-icon-create" />,
      payment_made: <FaCreditCard className="activity-icon-payment" />
    };
    return icons[activityType] || <MdActivity />;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner-large" />
        <p>Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="error-container">
        <h2>Customer not found</h2>
        <button onClick={() => navigate('/customers')} className="btn btn-primary">
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="customer-details-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate('/customers')} className="btn-back">
          <FaArrowLeft /> Back
        </button>
        
        <div className="header-content">
          <MdBusinessCenter className="header-icon" />
          <div>
            <h1>{customer.company_name}</h1>
            <div className="header-meta">
              <span className={`status-badge ${customer.status}`}>
                {customer.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                {customer.status}
              </span>
              <span className="customer-id">ID: #{customer.id}</span>
            </div>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div>
              <p className="stat-value">{employeeCount}</p>
              <p className="stat-label">Employees</p>
            </div>
          </div>
          <div className="stat-card">
            <FaSignInAlt className="stat-icon" />
            <div>
              <p className="stat-value">{loginHistory.filter(l => l.is_active).length}</p>
              <p className="stat-label">Active Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {!isEditMode && (
          <>
            <button
              onClick={() => setIsEditMode(true)}
              className="btn btn-primary"
            >
              <FaEdit /> Edit Info
            </button>
            <button
              onClick={handleResetPassword}
              className="btn btn-secondary"
            >
              <FaKey /> Reset Password
            </button>
            <button
              onClick={handleDeactivateAccount}
              className={`btn ${customer.status === 'active' ? 'btn-danger' : 'btn-success'}`}
            >
              <FaBan /> {customer.status === 'active' ? 'Deactivate' : 'Activate'} Account
            </button>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button
          className={`tab ${activeTab === 'subscription' ? 'active' : ''}`}
          onClick={() => setActiveTab('subscription')}
        >
          <FaCreditCard /> Subscription
        </button>
        <button
          className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          <MdActivity /> Activity Log
        </button>
        <button
          className={`tab ${activeTab === 'logins' ? 'active' : ''}`}
          onClick={() => setActiveTab('logins')}
        >
          <FaHistory /> Login History
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="info-section">
                <h2>Basic Information</h2>
                
                <div className="info-grid">
                  <div className="info-item">
                    <label><FaBuilding /> Company Name</label>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          {...register('companyName')}
                          className={errors.companyName ? 'error' : ''}
                        />
                        {errors.companyName && (
                          <span className="error-message">{errors.companyName.message}</span>
                        )}
                      </>
                    ) : (
                      <p>{customer.company_name}</p>
                    )}
                  </div>

                  <div className="info-item">
                    <label><FaUser /> Owner Name</label>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          {...register('ownerName')}
                          className={errors.ownerName ? 'error' : ''}
                        />
                        {errors.ownerName && (
                          <span className="error-message">{errors.ownerName.message}</span>
                        )}
                      </>
                    ) : (
                      <p>{customer.owner_name}</p>
                    )}
                  </div>

                  <div className="info-item">
                    <label><FaEnvelope /> Email</label>
                    {isEditMode ? (
                      <>
                        <input
                          type="email"
                          {...register('email')}
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && (
                          <span className="error-message">{errors.email.message}</span>
                        )}
                      </>
                    ) : (
                      <p>{customer.email}</p>
                    )}
                  </div>

                  <div className="info-item">
                    <label><FaPhone /> Phone</label>
                    {isEditMode ? (
                      <>
                        <input
                          type="tel"
                          {...register('phone')}
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && (
                          <span className="error-message">{errors.phone.message}</span>
                        )}
                      </>
                    ) : (
                      <p>{customer.phone}</p>
                    )}
                  </div>

                  <div className="info-item full-width">
                    <label><FaMapMarkerAlt /> Address</label>
                    {isEditMode ? (
                      <>
                        <textarea
                          {...register('address')}
                          className={errors.address ? 'error' : ''}
                          rows="2"
                        />
                        {errors.address && (
                          <span className="error-message">{errors.address.message}</span>
                        )}
                      </>
                    ) : (
                      <p>{customer.address}</p>
                    )}
                  </div>
                </div>

                {isEditMode && (
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn btn-cancel"
                      disabled={isSubmitting}
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <><FaSpinner className="spinner" /> Saving...</> : <><FaSave /> Save Changes</>}
                    </button>
                  </div>
                )}
              </section>
            </form>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && subscription && (
          <div className="subscription-tab">
            <section className="info-section">
              <h2>Subscription Details</h2>
              
              <div className="subscription-card">
                <div className="subscription-header">
                  <h3>{subscription.plan_name}</h3>
                  <span className={`status-badge ${subscription.status}`}>
                    {subscription.status}
                  </span>
                </div>
                
                <div className="subscription-details">
                  <div className="detail-item">
                    <label>Plan Price</label>
                    <p className="price">₹{subscription.price}</p>
                  </div>
                  <div className="detail-item">
                    <label>Billing Cycle</label>
                    <p>{subscription.billing_cycle}</p>
                  </div>
                  <div className="detail-item">
                    <label>Start Date</label>
                    <p>{format(new Date(subscription.start_date), 'dd MMM yyyy')}</p>
                  </div>
                  <div className="detail-item">
                    <label>End Date</label>
                    <p>{format(new Date(subscription.end_date), 'dd MMM yyyy')}</p>
                  </div>
                  <div className="detail-item">
                    <label>Next Billing</label>
                    <p>{subscription.next_billing_date 
                      ? format(new Date(subscription.next_billing_date), 'dd MMM yyyy')
                      : 'N/A'
                    }</p>
                  </div>
                  <div className="detail-item">
                    <label>Auto Renew</label>
                    <p>{subscription.auto_renew ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div className="subscription-features">
                  <h4>Plan Features</h4>
                  <ul>
                    <li>Max Users: {subscription.max_users || 'Unlimited'}</li>
                    <li>Max Properties: {subscription.max_properties || 'Unlimited'}</li>
                    <li>Max Leads: {subscription.max_leads || 'Unlimited'}</li>
                    <li>Storage: {subscription.max_storage_gb || 'Unlimited'} GB</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Activity Log Tab */}
        {activeTab === 'activity' && (
          <div className="activity-tab">
            <div className="activity-filters">
              <select
                value={activityFilter}
                onChange={(e) => {
                  setActivityFilter(e.target.value);
                  fetchActivityLog(e.target.value);
                }}
              >
                <option value="all">All Activities</option>
                <option value="login">Logins</option>
                <option value="lead_added">Leads Added</option>
                <option value="property_added">Properties Added</option>
                <option value="payment_made">Payments</option>
              </select>
            </div>

            <div className="activity-list">
              {activityLog.length === 0 ? (
                <div className="empty-state">
                  <MdActivity />
                  <p>No activity recorded yet</p>
                </div>
              ) : (
                activityLog.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon-wrapper">
                      {getActivityIcon(activity.activity_type)}
                    </div>
                    <div className="activity-content">
                      <p className="activity-description">
                        <strong>{activity.user_name || 'System'}</strong> {activity.activity_description}
                      </p>
                      <div className="activity-meta">
                        <span>{getDeviceIcon(activity.device_type)} {activity.device_type}</span>
                        <span>IP: {activity.ip_address}</span>
                        <span>{formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Login History Tab */}
        {activeTab === 'logins' && (
          <div className="login-history-tab">
            <table className="login-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Login Time</th>
                  <th>Logout Time</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map(login => (
                  <tr key={login.id}>
                    <td>{login.user_name}</td>
                    <td>{format(new Date(login.login_time), 'dd MMM yyyy, hh:mm a')}</td>
                    <td>{login.logout_time ? format(new Date(login.logout_time), 'hh:mm a') : '-'}</td>
                    <td>{login.logout_time 
                      ? (() => {
                          const diff = new Date(login.logout_time) - new Date(login.login_time);
                          const hours = Math.floor(diff / 3600000);
                          const minutes = Math.floor((diff % 3600000) / 60000);
                          return `${hours}h ${minutes}m`;
                        })()
                      : 'Active'
                    }</td>
                    <td>{login.location || 'Unknown'}</td>
                    <td>
                      <span className="device-badge">
                        {getDeviceIcon(login.device_info?.device)}
                        {login.device_info?.device || 'Web'}
                      </span>
                    </td>
                    <td>{login.browser || 'Unknown'}</td>
                    <td>
                      <span className={`status-badge ${login.is_active ? 'active' : 'inactive'}`}>
                        {login.is_active ? 'Active' : 'Ended'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
