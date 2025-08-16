import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoGrid/VideoPlayer';
import { supabase } from '../lib/supabase';
import './OrderPage.css';

interface Video {
  id: string;
  vimeoId: string;
  title: string;
  description?: string;
  duration?: string;
}

interface OrderFormData {
  name: string;
  mobile: string;
  note: string;
  deliveryType: 'days' | 'date';
  deliveryDays?: number;
  deliveryDate?: string;
}

const sampleVideos = [
  {
    id: '1',
    vimeoId: '1107234012',
    title: 'Getting Started Guidedfs',
    description: 'Learn how to create your first digital wedding invitation',
    duration: '3:45'
  },
  {
    id: '2',
    vimeoId: '1107234012',
    title: 'Advanced Features Overview',
    description: 'Discover powerful tools to grow your business',
    duration: '5:20'
  },
  {
    id: '3',
    vimeoId: '1107224531',
    title: 'Success Stories',
    description: 'See how other businesses thrive with our platform',
    duration: '4:15'
  }
];

export const OrderPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    mobile: '',
    note: '',
    deliveryType: 'days',
    deliveryDays: 7,
    deliveryDate: ''
  });

  useEffect(() => {
    const foundVideo = sampleVideos.find(v => v.id === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [videoId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        video_id: videoId,
        video_title: video?.title,
        customer_name: formData.name,
        mobile_number: formData.mobile,
        note: formData.note,
        delivery_type: formData.deliveryType,
        delivery_days: formData.deliveryType === 'days' ? formData.deliveryDays : null,
        delivery_date: formData.deliveryType === 'date' ? formData.deliveryDate : null,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      alert('Order placed successfully!');
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        note: '',
        deliveryType: 'days',
        deliveryDays: 7,
        deliveryDate: ''
      });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!video) {
    return <div className="order-page__loading">Video not found</div>;
  }

  return (
    <div className="order-page">
      <div className="order-page__container">
        {/* Video Section */}
        <div className="order-page__video-section">
          <div className="order-page__video-wrapper">
            <VideoPlayer
              vimeoId={video.vimeoId}
              title={video.title}
              className="order-page__video-player"
            />
          </div>
         
        </div>

        {/* Order Form Section */}
        <div className="order-page__form-section">
          <div className="order-page__form-wrapper">
             <div className="order-page__video-info">
            <h2 className="order-page__video-title">{video.title}</h2>
            {video.description && (
              <p className="order-page__video-description">{video.description}</p>
            )}
          </div>
            <h3 className="order-page__form-title">Place Your Order</h3>
            <p className="order-page__form-subtitle">Fill in your details to get started</p>

            <form onSubmit={handleSubmit} className="order-form">
              <div className="order-form__row">
                <div className="order-form__group order-form__group--half">
                  <label htmlFor="name" className="order-form__label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="order-form__input"
                    required
                  />
                </div>

                <div className="order-form__group order-form__group--half">
                  <label htmlFor="mobile" className="order-form__label">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="order-form__input"
                    required
                  />
                </div>
              </div>

              <div className="order-form__group">
                <label htmlFor="note" className="order-form__label">Additional Notes</label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  className="order-form__textarea"
                  rows={3}
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="order-form__group">
                <label className="order-form__label">When do you need this? *</label>
                <div className="order-form__delivery-options">
                  <label className="order-form__radio-label">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="days"
                      checked={formData.deliveryType === 'days'}
                      onChange={handleInputChange}
                      className="order-form__radio"
                    />
                    <span>In a few days</span>
                  </label>
                  <label className="order-form__radio-label">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="date"
                      checked={formData.deliveryType === 'date'}
                      onChange={handleInputChange}
                      className="order-form__radio"
                    />
                    <span>Specific date</span>
                  </label>
                </div>
              </div>

              {formData.deliveryType === 'days' && (
                <div className="order-form__group">
                  <label htmlFor="deliveryDays" className="order-form__label">Number of days</label>
                  <select
                    id="deliveryDays"
                    name="deliveryDays"
                    value={formData.deliveryDays}
                    onChange={handleInputChange}
                    className="order-form__select"
                  >
                    <option value={3}>3 days</option>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                    <option value={30}>30 days</option>
                  </select>
                </div>
              )}

              {formData.deliveryType === 'date' && (
                <div className="order-form__group">
                  <label htmlFor="deliveryDate" className="order-form__label">Delivery date</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="order-form__input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="order-form__submit"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
