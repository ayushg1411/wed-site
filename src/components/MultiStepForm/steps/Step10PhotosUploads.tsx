import React, { useRef } from 'react';
import { StepProps } from '../types';

export const Step10PhotosUploads: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateFormData({
      photos: [...formData.photos, ...files]
    });
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: updatedPhotos });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="step-content">
      <h4 className="step-title">Special Message & Uploads</h4>
      
      <div className="form-group">
        <label className="form-label">Couple Photos</label>
        <div className="upload-area" onClick={triggerFileInput}>
          <div className="upload-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="upload-icon">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            <p>upload here If the invite has provision to add photos</p>
            <p className="upload-browse">or Browse to choose a file</p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      {formData.photos.length > 0 && (
        <div className="uploaded-photos">
          <h5>Uploaded Photos ({formData.photos.length})</h5>
          <div className="photos-grid">
            {formData.photos.map((photo, index) => (
              <div key={index} className="photo-item">
                <div className="photo-preview">
                  <img 
                    src={URL.createObjectURL(photo)} 
                    alt={`Upload ${index + 1}`}
                    className="photo-thumbnail"
                  />
                  <button
                    type="button"
                    className="photo-remove"
                    onClick={() => removePhoto(index)}
                  >
                    ×
                  </button>
                </div>
                <span className="photo-name">{photo.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};