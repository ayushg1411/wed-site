import React from 'react';
import { StepProps } from '../types';

export const Step1SubmissionMethod: React.FC<StepProps> = ({ formData, updateFormData }) => {
  // const handleMethodChange = (method: 'upload' | 'website') => {
  //   updateFormData({ submissionMethod: method });
  // };

  const handleCustomerInfoChange = (field: 'name' | 'mobile' | 'city', value: string) => {
    updateFormData({
      customerInfo: {
        ...formData.customerInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="step-content">
      
      
      {/* Customer Information Section */}
      <div className="customer-info-section">
        <h5 className="section-subtitle">Your Contact Information</h5>
        
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            value={formData.customerInfo.name}
            onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mobile Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            className="form-input"
            placeholder="Enter your mobile number"
            value={formData.customerInfo.mobile}
            onChange={(e) => handleCustomerInfoChange('mobile', e.target.value)}
            required
          />
        </div>
          <div className="form-group">
          <label className="form-label">
            City <span className="required">*</span>
          </label>
          <input
            type="string"
            className="form-input"
            placeholder="Enter your city"
            value={formData.customerInfo.city}
            onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
            required
          />
        </div>
      </div>
      {/* <h4 className="step-title">Choose how you want to provide your information</h4>
      <p className="step-description">
        If you have your wedding details in a written format or PDF, you can upload it directly. 
        Alternatively, you can enter the details on our site. 
        Our designer will reach out to confirm the information regardless of your submission method.
      </p>
      
      <div className="form-group">
        <label className="form-label">Do you want to</label>
        <div className="radio-group">
          <div 
            className={`radio-option ${formData.submissionMethod === 'upload' ? 'selected' : ''}`}
            onClick={() => handleMethodChange('upload')}
          >
            <input
              type="radio"
              name="submissionMethod"
              value="upload"
              checked={formData.submissionMethod === 'upload'}
              onChange={() => handleMethodChange('upload')}
            />
            <span>Upload Details</span>
          </div>
          
          <div 
            className={`radio-option ${formData.submissionMethod === 'website' ? 'selected' : ''}`}
            onClick={() => handleMethodChange('upload')}
          >
            <input
              type="radio"
              name="submissionMethod"
              value="website"
              checked={formData.submissionMethod === 'website'}
              onChange={() => handleMethodChange('website')}
            />
            <span>Fill Detail on Website</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};