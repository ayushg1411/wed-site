import React from 'react';
import { StepProps, AdditionalEvent } from '../types';

export const Step8AdditionalEvents: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const addEvent = () => {
    const newEvent: AdditionalEvent = {
      id: Date.now().toString(),
      name: '',
      venue: '',
      dateTime: '',
      price: 0
    };

    updateFormData({
      additionalEvents: [...formData.additionalEvents, newEvent]
    });
  };

  const updateEvent = (id: string, field: string, value: string | number) => {
    const updatedEvents = formData.additionalEvents.map(event =>
      event.id === id ? { ...event, [field]: value } : event
    );

    updateFormData({
      additionalEvents: updatedEvents
    });
  };

  const removeEvent = (id: string) => {
    const updatedEvents = formData.additionalEvents.filter(event => event.id !== id);
    updateFormData({
      additionalEvents: updatedEvents
    });
  };

  const totalEventsPrice = formData.additionalEvents.reduce((sum, event) => sum + event.price, 0);

  return (
    <div className="step-content">
      <h4 className="step-title">Add Additional Events ( Haldi/ Mehendi etc.)</h4>
      <p className="step-description">
        Have more then 1 event you need the invite for? Select the event, fill event specific details!
      </p>

      {formData.additionalEvents.map((event) => (
        <div key={event.id} className="additional-event">
          <div className="event-header">
            <h5>Event {formData.additionalEvents.indexOf(event) + 1}</h5>
            <button
              type="button"
              className="btn btn--danger btn--small"
              onClick={() => removeEvent(event.id)}
            >
              Remove
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Event Name</label>
            <input
              type="text"
              className="form-input"
              value={event.name}
              onChange={(e) => updateEvent(event.id, 'name', e.target.value)}
            />
          </div>

        

          <div className="form-group">
            <label className="form-label">Event Venue</label>
            <input
              type="text"
              className="form-input"
              value={event.venue}
              onChange={(e) => updateEvent(event.id, 'venue', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Event Date & Time</label>
            <input
              type="datetime-local"
              className="form-input"
              value={event.dateTime}
              onChange={(e) => updateEvent(event.id, 'dateTime', e.target.value)}
            />
            <small className="form-help">dd/mm/yyyy, --:-- --</small>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn--secondary"
        onClick={addEvent}
      >
        Add More Events
      </button>

      {totalEventsPrice > 0 && (
        <div className="total-price">
          <strong>Total Additional Events: ₹{totalEventsPrice}.00</strong>
        </div>
      )}
    </div>
  );
};