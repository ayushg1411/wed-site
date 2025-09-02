import React from 'react';
import { StepProps } from '../types';

export const Step4GroomDetails: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleGroomDetailsChange = (field: string, value: string | boolean) => {
    updateFormData({
      groomDetails: {
        ...formData.groomDetails,
        [field]: value
      }
    });
  };

  const handleGrandParentsChange = (type: 'maternal' | 'paternal', value: string) => {
    updateFormData({
      groomDetails: {
        ...formData.groomDetails,
        grandParents: {
          ...formData.groomDetails.grandParents,
          [type]: value
        }
      }
    });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Groom's Details</h4>
      
      <div className="form-group">
        <label className="form-label">Groom's Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Name of the Groom"
          value={formData.groomDetails.name}
          onChange={(e) => handleGroomDetailsChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Groom's Mother's Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Leave blank if not required on invite"
          value={formData.groomDetails.motherName}
          onChange={(e) => handleGroomDetailsChange('motherName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Groom's Father's Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Leave blank if not required on invite"
          value={formData.groomDetails.fatherName}
          onChange={(e) => handleGroomDetailsChange('fatherName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <div 
            className={`checkbox-option ${formData.groomDetails.addGrandParents ? 'selected' : ''}`}
            onClick={() => handleGroomDetailsChange('addGrandParents', !formData.groomDetails.addGrandParents)}
          >
            <input
              type="checkbox"
              checked={formData.groomDetails.addGrandParents}
              onChange={(e) => handleGroomDetailsChange('addGrandParents', e.target.checked)}
            />
            <span>Add Grand-Parents Names?</span>
          </div>
        </div>
      </div>

      {formData.groomDetails.addGrandParents && (
        <>
          <div className="form-group">
            <label className="form-label">Maternal Grand-Parents</label>
            <input
              type="text"
              className="form-input"
              placeholder="Maternal grand-parents names"
              value={formData.groomDetails.grandParents.maternal}
              onChange={(e) => handleGrandParentsChange('maternal', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Paternal Grand-Parents</label>
            <input
              type="text"
              className="form-input"
              placeholder="Paternal grand-parents names"
              value={formData.groomDetails.grandParents.paternal}
              onChange={(e) => handleGrandParentsChange('paternal', e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};