import React from 'react';
import { StepProps } from '../types';

export const Step7Caricature: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleCaricatureChange = (type: 'custom' | 'generic' | 'none', price: number) => {
    updateFormData({
      caricature: { type, price },
      pricing: {
        ...formData.pricing,
        total: formData.pricing.productPrice + price + 
               (formData.topups.logoRemovalPrice || 0) + 
               (formData.topups.backgroundMusicPrice || 0)
      }
    });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Caricature</h4>
      <p className="step-description">
        Add Caricature?<br />
        Do you want to add a caricature to this event slide?
      </p>
      
      <div className="form-group">
        <div className="radio-group caricature-options">
          {/* <div 
            className={`radio-option caricature-option ${formData.caricature.type === 'custom' ? 'selected' : ''}`}
            onClick={() => handleCaricatureChange('custom', 999)}
          >
            <input
              type="radio"
              name="caricature"
              value="custom"
              checked={formData.caricature.type === 'custom'}
              onChange={() => handleCaricatureChange('custom', 999)}
            />
            <div className="caricature-content">
              <span className="caricature-title">Custom Caricature</span>
              <span className="caricature-price">(₹999.00)</span>
            </div>
          </div> */}
          
          <div 
            className={`radio-option caricature-option ${formData.caricature.type === 'generic' ? 'selected' : ''}`}
            onClick={() => handleCaricatureChange('generic', 199)}
          >
            <input
              type="radio"
              name="caricature"
              value="generic"
              checked={formData.caricature.type === 'generic'}
              onChange={() => handleCaricatureChange('generic', 199)}
            />
            <div className="caricature-content">
              <span className="caricature-title">Generic Caricature</span>
              <span className="caricature-price">(₹199.00)</span>
            </div>
          </div>
          
          <div 
            className={`radio-option caricature-option ${formData.caricature.type === 'none' ? 'selected' : ''}`}
            onClick={() => handleCaricatureChange('none', 0)}
          >
            <input
              type="radio"
              name="caricature"
              value="none"
              checked={formData.caricature.type === 'none'}
              onChange={() => handleCaricatureChange('none', 0)}
            />
            <div className="caricature-content">
              <span className="caricature-title">None</span>
              <span className="caricature-price">(₹0.00)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="price-display">
        <strong>₹{formData.caricature.price}.00</strong>
      </div>
    </div>
  );
};