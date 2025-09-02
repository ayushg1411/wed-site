export interface BrideGroomDetails {
  name: string;
  motherName: string;
  fatherName: string;
  addGrandParents: boolean;
  grandParents: {
    maternal: string;
    paternal: string;
  };
}

export interface WeddingDetails {
  eventName: string;
  venue: string;
  dateTime: string;
}

export interface RSVPDetails {
  name: string;
  phone: string;
  additionalRSVPs: Array<{
    name: string;
    phone: string;
  }>;
}

export interface Caricature {
  type: 'custom' | 'generic' | 'none';
  price: number;
}

export interface AdditionalEvent {
  id: string;
  name: string;
  venue: string;
  dateTime: string;
  price: number;
}

export interface Topups {
  logoRemoval: boolean;
  logoRemovalPrice: number;
  backgroundMusic: boolean;
  backgroundMusicPrice: number;
}

export interface Pricing {
  productPrice: number;
  originalPrice: number;
  total: number;
}

export interface FormData {
  submissionMethod: 'upload' | 'website';
  side: 'bride' | 'groom';
  brideDetails: BrideGroomDetails;
  groomDetails: BrideGroomDetails;
  weddingDetails: WeddingDetails;
  rsvpDetails: RSVPDetails;
  caricature: Caricature;
  additionalEvents: AdditionalEvent[];
  comments: string;
  photos: File[];
  topups: Topups;
  pricing: Pricing;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}