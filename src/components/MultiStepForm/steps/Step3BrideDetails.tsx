import React from 'react';
import { StepProps } from '../types';

export const Step3BrideDetails: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleBrideDetailsChange = (field: string, value: string | boolean) => {
    updateFormData({
      brideDetails: {
        ...formData.brideDetails,
        [field]: value
      }
    });
  };

  const handleGrandParentsChange = (type: 'maternal' | 'paternal', value: string) => {
    updateFormData({
      brideDetails: {
        ...formData.brideDetails,
        grandParents: {
          ...formData.brideDetails.grandParents,
          [type]: value
        }
      }
    });
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Bride's Details</h4>
      
      <div className="form-group">
        <label className="form-label">Bride's Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Name of the bride"
          value={formData.brideDetails.name}
          onChange={(e) => handleBrideDetailsChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bride's Mother's Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Leave blank if not required on invite"
          value={formData.brideDetails.motherName}
          onChange={(e) => handleBrideDetailsChange('motherName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bride's Father's Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Leave blank if not required on invite"
          value={formData.brideDetails.fatherName}
          onChange={(e) => handleBrideDetailsChange('fatherName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <div 
            className={`checkbox-option ${formData.brideDetails.addGrandParents ? 'selected' : ''}`}
            onClick={() => handleBrideDetailsChange('addGrandParents', !formData.brideDetails.addGrandParents)}
          >
            <input
              type="checkbox"
              checked={formData.brideDetails.addGrandParents}
              onChange={(e) => handleBrideDetailsChange('addGrandParents', e.target.checked)}
            />
            <span>Add Grand-Parents Names?</span>
          </div>
        </div>
      </div>

      {formData.brideDetails.addGrandParents && (
        <>
          <div className="form-group">
            <label className="form-label">Maternal Grand-Parents</label>
            <input
              type="text"
              className="form-input"
              placeholder="Maternal grand-parents names"
              value={formData.brideDetails.grandParents.maternal}
              onChange={(e) => handleGrandParentsChange('maternal', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Paternal Grand-Parents</label>
            <input
              type="text"
              className="form-input"
              placeholder="Paternal grand-parents names"
              value={formData.brideDetails.grandParents.paternal}
              onChange={(e) => handleGrandParentsChange('paternal', e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};