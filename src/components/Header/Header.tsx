import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Logo } from './Logo';
import { ActionButtons } from './ActionButtons';  
import { LoginModal } from '../LoginModal';
import { useAuth } from '../../contexts/AuthContext';
import { HeaderProps } from './types';
import './Header.css';

const adminEmails = ['ayushguptass14@gmail.com', 'ayeshadigitalcards@gmail.com']; // Add your admin emails here

export const Header: React.FC<HeaderProps> = ({
  logo = { text: 'Gathbandhan', href: '/' },
  navigationItems = [
    { label: 'Wedding', href: '/Wedding' }
  ],
  scrollThreshold = 50,
  className
}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
const path = window.location.pathname;  // e
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleDashboardClick = () => {
    if (user?.email && adminEmails.includes(user.email)) {
      navigate('/admin/dashboard');
      
    }
    else{
      navigate('/dashboard')
    }
    setIsProfileMenuOpen(false);
  };

  function getFirstAndSecondName(nameString: any): string {
    if (!nameString) return 'U'
    
    const parts = nameString.split(' ');
    const str: string = parts[0].charAt(0).toUpperCase() + (parts[1] ? parts[1].charAt(0).toUpperCase() : '')
      
    return str
  }

  // Show loading state or user/login buttons
  const actionButtons = loading 
    ? [
        { 
          label: <div className="profile-avatar profile-avatar--loading">
            <div className="loading-spinner"></div>
          </div>,
          variant: 'profile' as const,
          onClick: () => {} // No action while loading
        }
      ]
    : user
    ? [
        { 
          label: <div className="profile-avatar">
            {getFirstAndSecondName(user.user_metadata?.full_name)}
          </div>,
          variant: 'profile' as const,
          onClick: handleProfileClick 
        }
      ]
    : [
        { 
          label:<div className="profile-avatar profile-avatar--loading">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="7" r="4" />
  <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
</svg>

          </div>,
          variant: 'profile' as const,
          onClick: handleLoginClick 
        }
      ];

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${className || ''}`}>
       { path.length==1 &&   <div className="promo-banner">
  <span className="promo-banner__icons">
    <a href="https://www.instagram.com/gathbandhhan" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="6" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2"/><circle cx="17" cy="7" r="1.5" fill="#fff"/></svg>
    </a>
    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" stroke="#fff" strokeWidth="2"/><polygon points="10,9 16,12 10,15" fill="#fff"/></svg>
    </a>
    <a href="https://wa.me/7017835443" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
      </svg>
    </a>
  </span>
  <span>
    {/* 🎉 Extra Discount Available! Use code <strong>WEDDING10</strong> at checkout. */}
    🎉 Call us at <a className='header-call-info' href="tel:+917017835443">+91 70178 35443</a> for personalized invitation!
  </span>
    <span className="promo-banner__icons">
   
  </span>
</div>}
        <div className="header__container">
          <Logo {...logo} />
          <Navigation items={navigationItems} />
          <div className="header__actions-wrapper">
            <ActionButtons buttons={actionButtons} />
            
            {/* Profile Dropdown */}
            {user && isProfileMenuOpen && !loading && (
              <div className="profile-dropdown">
                <div className="profile-dropdown__content">
                  <div className="profile-dropdown__header">
                    <div className="profile-dropdown__avatar">
                      {getFirstAndSecondName(user.user_metadata?.full_name)}
                    </div>
                    <div className="profile-dropdown__info">
                      <span className="profile-dropdown__name">
                        {user.user_metadata?.full_name || 'User'}
                      </span>
                      <span className="profile-dropdown__email">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <div className="profile-dropdown__divider"></div>
                  <p 
                    className="profile-dropdown__item"
                    onClick={handleDashboardClick}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    My Orders
                  </p>
                  <button 
                    className="profile-dropdown__logout"
                    onClick={handleSignOut}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
