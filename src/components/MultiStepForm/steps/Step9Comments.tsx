import React from 'react';
import { StepProps } from '../types';

export const Step9Comments: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleCommentsChange = (value: string) => {
    updateFormData({ comments: value });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Comments or Remarks</h4>
      <p className="step-description">
        Please add any remarks or comments you want to convey to the designer!
      </p>
      
      <div className="form-group">
        <label className="form-label">Comments or Remarks</label>
        <textarea
          className="form-textarea"
          placeholder="Enter your comments or special instructions here..."
          value={formData.comments}
          onChange={(e) => handleCommentsChange(e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
};