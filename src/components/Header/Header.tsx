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
    { label: 'About', href: '/about' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' }
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

  const actionButtons = user
    ? [
        { 
          label: user.user_metadata?.full_name || user.email || 'User', 
          variant: 'secondary' as const,
          onClick: () => {} 
        },
        { 
          label: 'Sign Out', 
          variant: 'primary' as const,
          onClick: handleSignOut 
        }
      ]
    : [
        { 
          label: 'Login', 
          variant: 'secondary' as const,
          onClick: handleLoginClick 
        },
        { 
          label: 'Start selling', 
          variant: 'primary' as const,
          href: '/signup' 
        }
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
