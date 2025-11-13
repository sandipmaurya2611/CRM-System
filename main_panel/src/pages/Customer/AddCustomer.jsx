import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaToggleOn,
  FaSave,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import { MdBusinessCenter } from 'react-icons/md';
import api from '../services/api';
import './AddCustomer.css';

// Validation Schema
const customerSchema = yup.object().shape({
  companyName: yup
    .string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must not exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s&.,'-]+$/, 'Company name contains invalid characters'),
  
  ownerName: yup
    .string()
    .required('Owner name is required')
    .min(2, 'Owner name must be at least 2 characters')
    .max(50, 'Owner name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Owner name should only contain letters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Invalid phone number format (e.g., +91-9876543210)'
    ),
  
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters'),
  
  subscriptionPlan: yup
    .string()
    .required('Please select a subscription plan'),
  
  startDate: yup
    .date()
    .required('Start date is required')
    .typeError('Invalid date format')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Start date cannot be in the past'),
  
  endDate: yup
    .date()
    .required('End date is required')
    .typeError('Invalid date format')
    .min(
      yup.ref('startDate'),
      'End date must be after start date'
    )
    .test(
      'minimum-duration',
      'Subscription must be at least 30 days',
      function(value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        const diffTime = Math.abs(value - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 30;
      }
    ),
  
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['active', 'inactive'], 'Invalid status')
});

const AddCustomer = () => {
  const navigate = useNavigate();
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, touchedFields }
  } = useForm({
    resolver: yupResolver(customerSchema),
    mode: 'onBlur',
    defaultValues: {
      companyName: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      subscriptionPlan: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'active'
    }
  });

  // Watch for subscription plan changes
  const selectedPlan = watch('subscriptionPlan');
  const startDate = watch('startDate');

  // Fetch subscription plans
  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  // Auto-calculate end date based on plan
  useEffect(() => {
    if (selectedPlan && startDate) {
      const plan = subscriptionPlans.find(p => p.id === parseInt(selectedPlan));
      if (plan) {
        setPlanDetails(plan);
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(end.getDate() + plan.duration_days);
        setValue('endDate', end.toISOString().split('T')[0]);
      }
    }
  }, [selectedPlan, startDate, subscriptionPlans, setValue]);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await api.get('/admin/subscription-plans');
      setSubscriptionPlans(response.data);
    } catch (error) {
      toast.error('Failed to fetch subscription plans');
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        company_name: data.companyName,
        owner_name: data.ownerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        subscription_plan_id: parseInt(data.subscriptionPlan),
        start_date: data.startDate,
        end_date: data.endDate,
        status: data.status
      };

      const response = await api.post('/admin/customers', payload);
      
      toast.success('Customer registered successfully!');
      navigate(`/customers/${response.data.id}`);
      
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to register customer. Please try again.');
      }
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/customers');
    }
  };

  return (
    <div className="add-customer-container">
      <div className="page-header">
        <div className="header-content">
          <MdBusinessCenter className="header-icon" />
          <div>
            <h1>Register New Customer</h1>
            <p>Add a new real estate company to the CRM system</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="customer-form">
        
        {/* Company Information Section */}
        <section className="form-section">
          <h2 className="section-title">Company Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">
                <FaBuilding /> Company Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                {...register('companyName')}
                className={errors.companyName ? 'error' : touchedFields.companyName ? 'valid' : ''}
                placeholder="e.g., ABC Realty Pvt Ltd"
              />
              {errors.companyName && (
                <span className="error-message">{errors.companyName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="ownerName">
                <FaUser /> Owner Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="ownerName"
                {...register('ownerName')}
                className={errors.ownerName ? 'error' : touchedFields.ownerName ? 'valid' : ''}
                placeholder="e.g., Rajesh Kumar"
              />
              {errors.ownerName && (
                <span className="error-message">{errors.ownerName.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={errors.email ? 'error' : touchedFields.email ? 'valid' : ''}
                placeholder="e.g., contact@abcrealty.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone /> Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'error' : touchedFields.phone ? 'valid' : ''}
                placeholder="e.g., +91-9876543210"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">
              <FaMapMarkerAlt /> Address <span className="required">*</span>
            </label>
            <textarea
              id="address"
              {...register('address')}
              className={errors.address ? 'error' : touchedFields.address ? 'valid' : ''}
              placeholder="e.g., 123 MG Road, Bangalore, Karnataka - 560001"
              rows="3"
            />
            {errors.address && (
              <span className="error-message">{errors.address.message}</span>
            )}
          </div>
        </section>

        {/* Subscription Details Section */}
        <section className="form-section">
          <h2 className="section-title">Subscription Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subscriptionPlan">
                <FaCreditCard /> Subscription Plan <span className="required">*</span>
              </label>
              <select
                id="subscriptionPlan"
                {...register('subscriptionPlan')}
                className={errors.subscriptionPlan ? 'error' : touchedFields.subscriptionPlan ? 'valid' : ''}
              >
                <option value="">-- Select Plan --</option>
                {subscriptionPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ₹{plan.price}/{plan.billing_cycle}
                  </option>
                ))}
              </select>
              {errors.subscriptionPlan && (
                <span className="error-message">{errors.subscriptionPlan.message}</span>
              )}
              
              {planDetails && (
                <div className="plan-info">
                  <p><strong>Duration:</strong> {planDetails.duration_days} days</p>
                  <p><strong>Features:</strong> {planDetails.max_users} users, {planDetails.max_properties} properties</p>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">
                <FaToggleOn /> Status <span className="required">*</span>
              </label>
              <select
                id="status"
                {...register('status')}
                className={errors.status ? 'error' : ''}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <span className="error-message">{errors.status.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">
                <FaCalendarAlt /> Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                {...register('startDate')}
                className={errors.startDate ? 'error' : touchedFields.startDate ? 'valid' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && (
                <span className="error-message">{errors.startDate.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">
                <FaCalendarAlt /> End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                {...register('endDate')}
                className={errors.endDate ? 'error' : touchedFields.endDate ? 'valid' : ''}
                readOnly={!!selectedPlan}
              />
              {errors.endDate && (
                <span className="error-message">{errors.endDate.message}</span>
              )}
              {selectedPlan && (
                <p className="helper-text">Auto-calculated based on plan duration</p>
              )}
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <FaTimes /> Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" /> Registering...
              </>
            ) : (
              <>
                <FaSave /> Register Customer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
