import React from 'react';
import { StepProps } from '../types';

export const Step5WeddingDetails: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleWeddingDetailsChange = (field: string, value: string) => {
    updateFormData({
      weddingDetails: {
        ...formData.weddingDetails,
        [field]: value
      }
    });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Wedding Details</h4>
      
      <div className="form-group">
        <label className="form-label">Wedding Event Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Want to use another name instead of Wedding?"
          value={formData.weddingDetails.eventName}
          onChange={(e) => handleWeddingDetailsChange('eventName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Wedding Venue</label>
        <input
          type="text"
          className="form-input"
          placeholder="Name of Wedding Venue"
          value={formData.weddingDetails.venue}
          onChange={(e) => handleWeddingDetailsChange('venue', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date & Time of Wedding</label>
        <input
          type="datetime-local"
          className="form-input"
          value={formData.weddingDetails.dateTime}
          onChange={(e) => handleWeddingDetailsChange('dateTime', e.target.value)}
        />
        <small className="form-help">dd/mm/yyyy, --:-- --</small>
      </div>
    </div>
  );
};