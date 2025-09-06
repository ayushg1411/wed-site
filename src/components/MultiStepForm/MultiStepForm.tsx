import React, { useState } from 'react';
import { Step1SubmissionMethod } from './steps/Step1SubmissionMethod';
import { Step2BrideGroomSide } from './steps/Step2BrideGroomSide'
import { Step3BrideDetails } from './steps/Step3BrideDetails';
import { Step4GroomDetails } from './steps/Step4GroomDetails';
import { Step5WeddingDetails } from './steps/Step5WeddingDetails';
import { Step6RSVPDetails } from './steps/Step6RSVPDetails';
import { Step7Caricature } from './steps/Step7Caricature';
import { Step8AdditionalEvents } from './steps/Step8AdditionalEvents';
import { Step9Comments } from './steps/Step9Comments';
import { Step10PhotosUploads } from './steps/Step10PhotosUploads';
import { Step11Topups } from './steps/Step11Topups';
import { FormData } from './types';
import './MultiStepForm.css';

interface Video {
  id: string;
  vimeoId: string;
  title: string;
  description?: string;
  duration?: string;
  price: number;
  originalPrice: number;
}interface MultiStepFormProps {
  videoId?: string;
  video: Video;
  videoTitle?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ videoId, video,  videoTitle }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    customerInfo: {
      name: '',
      mobile: '',
      city: ''
    },
    submissionMethod: 'website',
    side: 'bride',
    brideDetails: {
      name: '',
      motherName: '',
      fatherName: '',
      addGrandParents: false,
      grandParents: { maternal: '', paternal: '' }
    },
    groomDetails: {
      name: '',
      motherName: '',
      fatherName: '',
      addGrandParents: false,
      grandParents: { maternal: '', paternal: '' }
    },
    weddingDetails: {
      eventName: 'Wedding',
      venue: '',
      dateTime: ''
    },
    rsvpDetails: {
      name: '',
      phone: '',
      additionalRSVPs: []
    },
    caricature: {
      type: 'none',
      price: 0
    },
    additionalEvents: [],
    comments: '',
    photos: [],
    topups: {
      logoRemoval: false,
      logoRemovalPrice: 0,
      backgroundMusic: false,
      backgroundMusicPrice: 0
    },
    pricing: {
      productPrice: video.price,
      originalPrice: video.originalPrice,
      total: video.price
    }
  });

  const totalSteps = 11;

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1SubmissionMethod formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2BrideGroomSide formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3BrideDetails formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4GroomDetails formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Step5WeddingDetails formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <Step6RSVPDetails formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <Step7Caricature formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <Step8AdditionalEvents formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <Step9Comments formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <Step10PhotosUploads formData={formData} updateFormData={updateFormData} />;
      case 11:
        return <Step11Topups formData={formData} updateFormData={updateFormData} />;
      default:
        return <Step1SubmissionMethod formData={formData} updateFormData={updateFormData} />;
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted with data:', formData);
    
    // You can also format it nicely for better readability
    console.log('=== WEDDING INVITATION ORDER DETAILS ===');
    console.log('Submission Method:', formData.submissionMethod);
    console.log('Side:', formData.side);
    console.log('Bride Details:', formData.brideDetails);
    console.log('Groom Details:', formData.groomDetails);
    console.log('Wedding Details:', formData.weddingDetails);
    console.log('RSVP Details:', formData.rsvpDetails);
    console.log('Caricature:', formData.caricature);
    console.log('Additional Events:', formData.additionalEvents);
    console.log('Comments:', formData.comments);
    console.log('Photos:', formData.photos);
    console.log('Topups:', formData.topups);
    console.log('Pricing:', formData.pricing);
    console.log('Video ID:', videoId);
    console.log('Video Title:', videoTitle);
    console.log('==========================================');
  };

  return (
    <div className="multi-step-form">
      <div className="multi-step-form__header">
        <h3 className="multi-step-form__title">Submitting Your Wedding Details</h3>
        <div className="multi-step-form__progress">
          <div className="progress-bar">
            <div 
              className="progress-bar__fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <span className="progress-text">Step {currentStep} of {totalSteps}</span>
        </div>
      </div>

      <div className="multi-step-form__content">
        {renderStep()}
      </div>

      <div className="multi-step-form__navigation">
        <button 
          type="button" 
          onClick={prevStep} 
          disabled={currentStep === 1}
          className="btn btn--secondary"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
  <line x1="19" y1="12" x2="5" y2="12" />
  <polyline points="12 19 5 12 12 5" />
</svg>

        </button>
        
        {currentStep < totalSteps ? (
          <button 
            type="button" 
            onClick={nextStep}
            className="btn btn--primary"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" />
  <polyline points="12 5 19 12 12 19" />
</svg>

          </button>
        ) : (
          <button 
            type="submit"
            onClick={handleSubmit}
            className="btn btn--primary btn--submit"
          >
            Submit Order
          </button>
        )}
      </div>
    </div>
  );
};
