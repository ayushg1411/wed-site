import React from 'react';
import { StepProps } from '../types';

export const Step6RSVPDetails: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleRSVPChange = (field: string, value: string) => {
    updateFormData({
      rsvpDetails: {
        ...formData.rsvpDetails,
        [field]: value
      }
    });
  };

  const addMoreRSVP = () => {
    updateFormData({
      rsvpDetails: {
        ...formData.rsvpDetails,
        additionalRSVPs: [
          ...formData.rsvpDetails.additionalRSVPs,
          { name: '', phone: '' }
        ]
      }
    });
  };

  const updateAdditionalRSVP = (index: number, field: string, value: string) => {
    const updatedRSVPs = [...formData.rsvpDetails.additionalRSVPs];
    updatedRSVPs[index] = { ...updatedRSVPs[index], [field]: value };
    
    updateFormData({
      rsvpDetails: {
        ...formData.rsvpDetails,
        additionalRSVPs: updatedRSVPs
      }
    });
  };

  const removeRSVP = (index: number) => {
    const updatedRSVPs = formData.rsvpDetails.additionalRSVPs.filter((_, i) => i !== index);
    updateFormData({
      rsvpDetails: {
        ...formData.rsvpDetails,
        additionalRSVPs: updatedRSVPs
      }
    });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">RSVP Slide</h4>
      
      <div className="form-group">
        <label className="form-label">Name for RSVP</label>
        <input
          type="text"
          className="form-input"
          value={formData.rsvpDetails.name}
          onChange={(e) => handleRSVPChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Phone Number of RSVP</label>
        <input
          type="tel"
          className="form-input"
          placeholder="Leave Blank if not required"
          value={formData.rsvpDetails.phone}
          onChange={(e) => handleRSVPChange('phone', e.target.value)}
        />
      </div>

      {formData.rsvpDetails.additionalRSVPs.map((rsvp, index) => (
        <div key={index} className="additional-rsvp">
          <div className="form-group">
            <label className="form-label">Additional RSVP Name {index + 1}</label>
            <input
              type="text"
              className="form-input"
              value={rsvp.name}
              onChange={(e) => updateAdditionalRSVP(index, 'name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Additional RSVP Phone {index + 1}</label>
            <div className="input-with-button">
              <input
                type="tel"
                className="form-input"
                value={rsvp.phone}
                onChange={(e) => updateAdditionalRSVP(index, 'phone', e.target.value)}
              />
              <button
                type="button"
                className="btn btn--danger btn--small"
                onClick={() => removeRSVP(index)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn--secondary"
        onClick={addMoreRSVP}
      >
        Add more RSVP
      </button>
    </div>
  );
};