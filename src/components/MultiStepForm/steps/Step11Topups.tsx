import React from 'react';
import { StepProps } from '../types';

export const Step11Topups: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleLogoRemovalChange = (remove: boolean) => {
    const logoRemovalPrice = remove ? 50 : 0;
    updateFormData({
      topups: {
        ...formData.topups,
        logoRemoval: remove,
        logoRemovalPrice
      },
      pricing: {
        ...formData.pricing,
        total: Number(formData.pricing.productPrice) + 
               logoRemovalPrice + 
               Number(formData.topups.backgroundMusicPrice || 0) +
               Number(formData.caricature.price || 0)
      }
    });
  };

  const handleBackgroundMusicChange = (add: boolean) => {
    const backgroundMusicPrice = add ? 100 : 0;
    updateFormData({
      topups: {
        ...formData.topups,
        backgroundMusic: add,
        backgroundMusicPrice
      },
      pricing: {
        ...formData.pricing,
        total: Number(formData.pricing.productPrice) + 
               Number(formData.topups.logoRemovalPrice || 0) + 
               backgroundMusicPrice +
               Number(formData.caricature.price || 0)
      }
    });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Invite Top-ups</h4>
      <p className="step-description">
        Customize extras like remove logo or background music here.
      </p>

      {/* Logo Removal */}
      <div className="form-group">
        <label className="form-label">Gathbandhan Logo Removal</label>
       
        
        <div className="topup-section">
          <span className="topup-title">Remove Logo</span>
          <div className="radio-group">
            <div 
              className={`radio-option ${formData.topups.logoRemoval ? 'selected' : ''}`}
              onClick={() => handleLogoRemovalChange(true)}
            >
              <input
                type="radio"
                name="logoRemoval"
                checked={formData.topups.logoRemoval}
                onChange={() => handleLogoRemovalChange(true)}
              />
              <div className="topup-content">
                <span>Yes</span>
                <span className="topup-price">(₹50.00)</span>
              </div>
            </div>
            
            <div 
              className={`radio-option ${!formData.topups.logoRemoval ? 'selected' : ''}`}
              onClick={() => handleLogoRemovalChange(false)}
            >
              <input
                type="radio"
                name="logoRemoval"
                checked={!formData.topups.logoRemoval}
                onChange={() => handleLogoRemovalChange(false)}
              />
              <div className="topup-content">
                <span>No</span>
                <span className="topup-price">(₹0.00)</span>
              </div>
            </div>
          </div>
          {/* <div className="price-display">
            <strong>₹{formData.topups.logoRemovalPrice}.00</strong>
          </div> */}
        </div>
      </div>

      {/* Background Music */}
      <div className="form-group">
        <label className="form-label">Customize Background Music</label>
      
        
        <div className="topup-section">
          <div className="radio-group">
            <div 
              className={`radio-option ${formData.topups.backgroundMusic ? 'selected' : ''}`}
              onClick={() => handleBackgroundMusicChange(true)}
            >
              <input
                type="radio"
                name="backgroundMusic"
                checked={formData.topups.backgroundMusic}
                onChange={() => handleBackgroundMusicChange(true)}
              />
              <div className="topup-content">
                <span>Custom Background Music</span>
                <span className="topup-price">(₹100.00)</span>
              </div>
            </div>
            
            <div 
              className={`radio-option ${!formData.topups.backgroundMusic ? 'selected' : ''}`}
              onClick={() => handleBackgroundMusicChange(false)}
            >
              <input
                type="radio"
                name="backgroundMusic"
                checked={!formData.topups.backgroundMusic}
                onChange={() => handleBackgroundMusicChange(false)}
              />
              <div className="topup-content">
                <span>Default background Music</span>
                <span className="topup-price">(₹0.00)</span>
              </div>
            </div>
          </div>
          {/* <div className="price-display">
            <strong>₹{formData.topups.backgroundMusicPrice}.00</strong>
          </div> */}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="pricing-summary">
        <div className="pricing-row">
          <span>Options Price</span>
          <span>₹{(formData.topups.logoRemovalPrice + formData.topups.backgroundMusicPrice + formData.caricature.price)}.00</span>
        </div>
        
        <div className="pricing-row product-price">
          <span>Product Price</span>
          <span>
            <span className="original-price">₹{formData.pricing.originalPrice.toLocaleString()}.00</span>
            <span className="current-price">₹{formData.pricing.productPrice.toLocaleString()}.00</span>
          </span>
        </div>
        
        <div className="pricing-row total-price">
          <span><strong>Total</strong></span>
          <span>
            <span className="original-total">₹{(formData.pricing.originalPrice + formData.topups.logoRemovalPrice + formData.topups.backgroundMusicPrice + formData.caricature.price).toLocaleString()}.00</span>
            <span className="current-total"><strong>₹{formData.pricing.total.toLocaleString()}.00</strong></span>
          </span>
        </div>
      </div>
    </div>
  );
};
