import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { submitOrder } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModal } from '../LoginModal/LoginModal';
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    customerInfo: {
      name: '',
      mobile: '',
      email: '',
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
    // Validate Step 1 before proceeding
    if (currentStep === 1) {
      const { name, mobile, city, email } = formData.customerInfo;
      if (!email.trim() || !name.trim() || !mobile.trim() || !city.trim()) {
        setValidationError('Please fill in all required fields (Name, Email, Mobile Number, and City) before proceeding.');
        return;
      }
      setValidationError(''); // Clear error if validation passes
    }
    
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

  const handleSubmit = async () => {
    // Check if user is logged in
    // if (!user) {
    //   setIsLoginModalOpen(true);
    //   return;
    // }

    // Validation
    if (!formData.customerInfo.name.trim()) {
      alert('Please enter your name');
      setCurrentStep(1);
      return;
    }

    if (!formData.customerInfo.mobile.trim()) {
      alert('Please enter your mobile number');
      setCurrentStep(1);
      return;
    }

    if (formData.topups.backgroundMusic && !formData.topups.customMusicName?.trim()) {
      alert('Please specify the custom music name');
      setCurrentStep(11);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const orderData = {
        ...formData,
        videoId,
        videoTitle
      };

      const orderResult = await submitOrder(orderData, user?.id);
      
      if (!orderResult.success) {
        throw new Error('Failed to submit order');
      }

      const orderId = orderResult.data.id;
      console.log('Order created with ID:', orderId);

      setSubmitStatus('success');
      setResultMessage(`Order submitted successfully! Order ID: ${orderId.slice(0, 8)}\n\nThank you for your order. We'll contact you soon at ${formData.customerInfo.mobile}.`);
      setShowResultModal(true);
      
      // Auto close and redirect after 3 seconds
      setTimeout(() => {
        setShowResultModal(false);
        navigate('/');
      }, 5000);

    } catch (error) {
      console.error('Order submission failed:', error);
      setSubmitStatus('error');
      setResultMessage(`Failed to submit order: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact support.`);
      setShowResultModal(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowResultModal(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
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
          {validationError && (
            <div className="validation-error">
              {validationError}
            </div>
          )}
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
              disabled={isSubmitting}
              className={`btn btn--primary btn--submit ${isSubmitting ? 'btn--loading' : ''} ${submitStatus === 'success' ? 'btn--success' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="btn-spinner"></div>
                  Submitting Order...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Order Submitted!
                </>
              ) : (
                'Submit Order'
              )}
            </button>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
      />

      {/* Result Modal */}
      {showResultModal && (
        <div className="result-modal-overlay">
          <div className="result-modal">
            <div className={`result-modal__icon ${submitStatus === 'success' ? 'success' : 'error'}`}>
              {submitStatus === 'success' ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              )}
            </div>
            <h3 className="result-modal__title">
              {submitStatus === 'success' ? 'Order Submitted!' : 'Submission Failed'}
            </h3>
            <p className="result-modal__message">{resultMessage}</p>
            <div className="result-modal__progress">
              <div className="progress-circle"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
