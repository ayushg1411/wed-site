import React from 'react';

const openInChrome = () => {
  // Try to open the current URL in Chrome (works best on Android)
  const url = window.location.href;
  window.location.href = `googlechrome://${url.replace(/^https?:\/\//, '')}`;
};

export const NavigateToChrome: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(20, 20, 20, 0.85)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}
  >
    <div style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
      For best experience, please open this site in Chrome browser.
    </div>
    <button
      style={{
        padding: '14px 32px',
        fontSize: '1.1rem',
        background: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '24px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
      onClick={openInChrome}
    >
      Open in Chrome
    </button>
  </div>
);

export default NavigateToChrome;