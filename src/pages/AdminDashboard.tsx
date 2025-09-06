import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

interface Order {
  id: string;
  customer_name: string;
  customer_mobile: string;
  customer_email?: string;
  customer_city?: string;
  status: string;
  video_title: string;
  video_id?: string;
  created_at: string;
  submission_method: string;
  side: string;
  bride_details: {
    name: string;
    fatherName: string;
    motherName: string;
    addGrandParents: boolean;
    grandParents?: {
      maternal: string;
      paternal: string;
    };
  };
  groom_details: {
    name: string;
    fatherName: string;
    motherName: string;
    addGrandParents: boolean;
    grandParents?: {
      maternal: string;
      paternal: string;
    };
  };
  wedding_details: {
    eventName: string;
    venue: string;
    dateTime: string;
  };
  rsvp_details: {
    name: string;
    phone: string;
    additionalRSVPs?: Array<{
      name: string;
      phone: string;
    }>;
  };
  caricature: {
    type: 'custom' | 'generic' | 'none';
    price: number;
  };
  additional_events?: Array<{
    id: string;
    eventName: string;
    venue: string;
    dateTime: string;
    price: number;
  }>;
  topups: {
    logoRemoval: boolean;
    logoRemovalPrice: number;
    backgroundMusic: boolean;
    backgroundMusicPrice: number;
    customMusicName?: string;
  };
  pricing: {
    productPrice: number;
    originalPrice?: number;
    total: number;
  };
  comments?: string;
  photos: Array<{
    file_name: string;
    file_size: number;
    file_type: string;
    content: string;
    uploaded_at: string;
  }>;
}

export const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="dashboard-unauthorized">
        <h2>Please log in to view your dashboard</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__header">
          <h1>My Orders Dashboard</h1>
          <p>Welcome back, {user.user_metadata?.full_name || 'User'}!</p>
        </div>

        {ordersLoading ? (
          <div className="dashboard__loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="dashboard__empty">
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="dashboard__content">
            <div className="orders-grid">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="order-card"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-card__header">
                    <h3>{order.video_title || 'Wedding Invitation'}</h3>
                    <span 
                      className="order-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="order-card__details">
                    <p><strong>Customer:</strong> {order.customer_name}</p>
                    <p><strong>Mobile:</strong> {order.customer_mobile}</p>
                    <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> ₹{order.pricing?.total || 'N/A'}</p>
                  </div>

                  <div className="order-card__footer">
                    <span className="order-id">#{order.id.slice(0, 8)}</span>
                    <span className="photo-count">{order.photos?.length || 0} photos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedOrder && (
          <div className="order-modal" onClick={() => setSelectedOrder(null)}>
            <div className="order-modal__content" onClick={(e) => e.stopPropagation()}>
              <div className="order-modal__header">
                <h2>Order Details</h2>
                <button onClick={() => setSelectedOrder(null)}>×</button>
              </div>
              
              <div className="order-modal__body">
                {/* Basic Order Info */}
                <div className="order-detail-grid">
                  <div><strong>Order ID:</strong> {selectedOrder.id}</div>
                  <div><strong>Status:</strong> 
                    <span 
                      className="order-status"
                      style={{ backgroundColor: getStatusColor(selectedOrder.status), marginLeft: '8px' }}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div><strong>Video:</strong> {selectedOrder.video_title}</div>
                  <div><strong>Created:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</div>
                </div>

                {/* Customer Information */}
                <div className="order-section">
                  <h3>Customer Information</h3>
                  <div className="order-detail-grid">
                    <div><strong>Name:</strong> {selectedOrder.customer_name}</div>
                    <div><strong>Mobile:</strong> {selectedOrder.customer_mobile}</div>
                    <div><strong>Email:</strong> {selectedOrder.customer_email || 'N/A'}</div>
                    <div><strong>City:</strong> {selectedOrder.customer_city || 'N/A'}</div>
                    <div><strong>Side:</strong> {selectedOrder.side}</div>
                    <div><strong>Submission:</strong> {selectedOrder.submission_method}</div>
                  </div>
                </div>

                {/* Bride Details */}
                {selectedOrder.bride_details && (
                  <div className="order-section">
                    <h3>Bride Details</h3>
                    <div className="order-detail-grid">
                      <div><strong>Name:</strong> {selectedOrder.bride_details.name}</div>
                      <div><strong>Father:</strong> {selectedOrder.bride_details.fatherName}</div>
                      <div><strong>Mother:</strong> {selectedOrder.bride_details.motherName}</div>
                      {selectedOrder.bride_details.addGrandParents && (
                        <>
                          <div><strong>Maternal Grandparents:</strong> {selectedOrder.bride_details.grandParents?.maternal || 'N/A'}</div>
                          <div><strong>Paternal Grandparents:</strong> {selectedOrder.bride_details.grandParents?.paternal || 'N/A'}</div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Groom Details */}
                {selectedOrder.groom_details && (
                  <div className="order-section">
                    <h3>Groom Details</h3>
                    <div className="order-detail-grid">
                      <div><strong>Name:</strong> {selectedOrder.groom_details.name}</div>
                      <div><strong>Father:</strong> {selectedOrder.groom_details.fatherName}</div>
                      <div><strong>Mother:</strong> {selectedOrder.groom_details.motherName}</div>
                      {selectedOrder.groom_details.addGrandParents && (
                        <>
                          <div><strong>Maternal Grandparents:</strong> {selectedOrder.groom_details.grandParents?.maternal || 'N/A'}</div>
                          <div><strong>Paternal Grandparents:</strong> {selectedOrder.groom_details.grandParents?.paternal || 'N/A'}</div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Wedding Details */}
                {selectedOrder.wedding_details && (
                  <div className="order-section">
                    <h3>Wedding Details</h3>
                    <div className="order-detail-grid">
                      <div><strong>Event:</strong> {selectedOrder.wedding_details.eventName}</div>
                      <div><strong>Venue:</strong> {selectedOrder.wedding_details.venue}</div>
                      <div><strong>Date & Time:</strong> {selectedOrder.wedding_details.dateTime}</div>
                    </div>
                  </div>
                )}

                {/* RSVP Details */}
                {selectedOrder.rsvp_details && (
                  <div className="order-section">
                    <h3>RSVP Details</h3>
                    <div className="order-detail-grid">
                      <div><strong>Contact Name:</strong> {selectedOrder.rsvp_details.name}</div>
                      <div><strong>Contact Phone:</strong> {selectedOrder.rsvp_details.phone}</div>
                    </div>
                    {selectedOrder.rsvp_details.additionalRSVPs &&selectedOrder.rsvp_details.additionalRSVPs?.length > 0 && (
                      <div>
                        <strong>Additional RSVPs:</strong>
                        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                          {selectedOrder.rsvp_details.additionalRSVPs.map((rsvp: any, index: number) => (
                            <li key={index}>{rsvp.name} - {rsvp.phone}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Additional Events */}
                {selectedOrder.additional_events && selectedOrder.additional_events?.length > 0 && (
                  <div className="order-section">
                    <h3>Additional Events</h3>
                    {selectedOrder.additional_events.map((event: any, index: number) => (
                      <div key={index} className="order-detail-grid" style={{ marginBottom: '1rem' }}>
                        <div><strong>Event:</strong> {event.eventName}</div>
                        <div><strong>Venue:</strong> {event.venue}</div>
                        <div><strong>Date & Time:</strong> {event.dateTime}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Caricature */}
                {selectedOrder.caricature && selectedOrder.caricature.type !== 'none' && (
                  <div className="order-section">
                    <h3>Caricature</h3>
                    <div className="order-detail-grid">
                      <div><strong>Type:</strong> {selectedOrder.caricature.type}</div>
                      <div><strong>Price:</strong> ₹{selectedOrder.caricature.price}</div>
                    </div>
                  </div>
                )}

                {/* Topups */}
                {selectedOrder.topups && (Object.values(selectedOrder.topups).some(Boolean)) && (
                  <div className="order-section">
                    <h3>Add-ons</h3>
                    <div className="order-detail-grid">
                      {selectedOrder.topups.logoRemoval && (
                        <div><strong>Logo Removal:</strong> ₹{selectedOrder.topups.logoRemovalPrice}</div>
                      )}
                      {selectedOrder.topups.backgroundMusic && (
                        <>
                          <div><strong>Background Music:</strong> ₹{selectedOrder.topups.backgroundMusicPrice}</div>
                          {selectedOrder.topups.customMusicName && (
                            <div><strong>Music Name:</strong> {selectedOrder.topups.customMusicName}</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {selectedOrder.pricing && (
                  <div className="order-section">
                    <h3>Pricing Details</h3>
                    <div className="order-detail-grid">
                      <div><strong>Product Price:</strong> ₹{selectedOrder.pricing.productPrice}</div>
                   
                      <div><strong>Total Amount:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>₹{selectedOrder.pricing.total}</span></div>
                    </div>
                  </div>
                )}

                {/* Comments */}
                {selectedOrder.comments && (
                  <div className="order-section">
                    <h3>Comments</h3>
                    <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', margin: 0 }}>
                      {selectedOrder.comments}
                    </p>
                  </div>
                )}

                {/* Photos */}
                {selectedOrder.photos && selectedOrder.photos.length > 0 && (
                  <div className="order-section">
                    <h3>Photos ({selectedOrder.photos.length})</h3>
                    <div className="photos-grid">
                      {selectedOrder.photos.map((photo: any, index: number) => (
                        <div key={index} className="photo-item">
                          {photo.content && (
                            <img src={photo.content} alt={photo.file_name} />
                          )}
                          <p>{photo.file_name}</p>
                          <small style={{ color: '#6b7280' }}>
                            {(photo.file_size / 1024).toFixed(1)} KB
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
