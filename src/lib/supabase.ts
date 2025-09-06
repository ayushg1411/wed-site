import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.url||  'https://qvkzhpulchcjsjzvylvy.supabase.co'!;
const supabaseAnonKey = process.env.key|| 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2a3pocHVsY2hjanNqenZ5bHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzY3NzUsImV4cCI6MjA2OTkxMjc3NX0.99KKAzaQhKdkmiXCIf6YfezA3qPtHb9he4vASW5R3hQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Order submission function
export const submitOrder = async (orderData: any, userId?: string) => {
  try {
    // Prepare photos data with base64 content
    const photosData = await Promise.all(
      orderData.photos?.map(async (photo: File) => ({
        file_name: photo.name,
        file_size: photo.size,
        file_type: photo.type,
        content: await fileToBase64(photo),
        uploaded_at: new Date().toISOString()
      })) || []
    );

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId || null,
        customer_name: orderData.customerInfo.name,
        customer_mobile: orderData.customerInfo.mobile,
        customer_email: orderData.customerInfo.email,
        customer_city: orderData.customerInfo.city,
        submission_method: orderData.submissionMethod,
        side: orderData.side,
        bride_details: orderData.brideDetails,
        groom_details: orderData.groomDetails,
        wedding_details: orderData.weddingDetails,
        rsvp_details: orderData.rsvpDetails,
        caricature: orderData.caricature,
        additional_events: orderData.additionalEvents,
        comments: orderData.comments,
        topups: orderData.topups,
        pricing: orderData.pricing,
        video_id: orderData.videoId,
        video_title: orderData.videoTitle,
        photos: photosData,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, error };
  }
};

// Save photo links for an order
export const saveOrderPhotos = async (orderId: string, photos: any[]) => {
  if (!photos || photos.length === 0) return { success: true, data: [] };

  try {
    const photoRecords = photos.map(photo => ({
      order_id: orderId,
      file_name: photo.file.name,
      drive_link: photo.driveLink,
      direct_link: photo.directLink,
      thumbnail_link: photo.thumbnailLink,
      drive_id: photo.driveId,
      file_size: photo.file.size,
      file_type: photo.file.type,
      uploaded_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('order_photos')
      .insert(photoRecords)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving photos:', error);
    return { success: false, error };
  }
};
