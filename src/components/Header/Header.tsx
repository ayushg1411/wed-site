import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
                    Dashboard
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
