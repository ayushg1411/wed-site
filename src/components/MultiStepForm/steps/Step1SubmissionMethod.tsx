import React from 'react';
import { StepProps } from '../types';

export const Step1SubmissionMethod: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleMethodChange = (method: 'upload' | 'website') => {
    updateFormData({ submissionMethod: method });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Choose how you want to provide your information</h4>
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
            onClick={() => handleMethodChange('website')}
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
      </div>
    </div>
  );
};