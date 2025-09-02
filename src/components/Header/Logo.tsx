import React, { useState, useEffect } from 'react';
import laptoo_logo from '../../assests/Images/laptop_logo.jpg';
import mobile_logo from '../../assests/Images/mobile_logo.jpg';

interface LogoProps {
  text: string;
  href: string;
}

export const Logo: React.FC<LogoProps> = ({ text, href }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="header__logo">
      <a href={href}>
        <img 
          width={isMobile ? 50 : 200} 
          height={isMobile ? 50 : 70} 
          src={isMobile ? mobile_logo : laptoo_logo} 
          alt={text}
          className="header__logo-img"
        />
      </a>
    </div>
  );
};