import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Logo } from './Logo';
import { ActionButtons } from './ActionButtons';  
import { LoginModal } from '../LoginModal';
import { useAuth } from '../../contexts/AuthContext';
import { HeaderProps } from './types';
import './Header.css';

export const Header: React.FC<HeaderProps> = ({
  logo = { text: 'Gathbandhan', href: '/' },
  navigationItems = [
    { label: 'Wedding', href: '/Wedding' }
  ],
  scrollThreshold = 50,
  className
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, signOut } = useAuth();

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
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  function getFirstAndSecondName(nameString:any): string {
  if (!nameString) return 'U'
  
  const parts = nameString.split(' ');
  const str:string = parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase()
    
  return str
}




  const actionButtons = user
    ? [
        { 
          label: getFirstAndSecondName(user.user_metadata?.full_name ),
          variant: 'secondary' as const,
          onClick: () => {} 
        },
        { 
          label:  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
     viewBox="0 0 24 24" fill="none" stroke="currentColor" 
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
   >
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
  <polyline points="16 17 21 12 16 7"/>
  <line x1="21" y1="12" x2="9" y2="12"/>
</svg>,
          variant: 'primary' as const,
          onClick: handleSignOut 
        }
      ]
    : [
        { 
          label: 'Login', 
          variant: 'primary' as const,
          onClick: handleLoginClick 
        },
        
      ];

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${className || ''}`}>
        <div className="header__container">
          <Logo {...logo} />
          <Navigation items={navigationItems} />
          <ActionButtons buttons={actionButtons} />
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
