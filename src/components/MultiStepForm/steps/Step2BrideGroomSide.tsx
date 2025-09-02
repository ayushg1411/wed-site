import React from 'react';
import { StepProps } from '../types';

export const Step2BrideGroomSide: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleSideChange = (side: 'bride' | 'groom') => {
    updateFormData({ side });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Whose Invite is this?</h4>
      <p className="step-description">Bride or Groom Side?</p>
      
      <div className="form-group">
        <div className="radio-group">
          <div 
            className={`radio-option ${formData.side === 'bride' ? 'selected' : ''}`}
            onClick={() => handleSideChange('bride')}
          >
            <input
              type="radio"
              name="side"
              value="bride"
              checked={formData.side === 'bride'}
              onChange={() => handleSideChange('bride')}
            />
            <span>Bride's Side</span>
          </div>
          
          <div 
            className={`radio-option ${formData.side === 'groom' ? 'selected' : ''}`}
            onClick={() => handleSideChange('groom')}
          >
            <input
              type="radio"
              name="side"
              value="groom"
              checked={formData.side === 'groom'}
              onChange={() => handleSideChange('groom')}
            />
            <span>Groom's Side</span>
          </div>
        </div>
      </div>
    </div>
  );
};