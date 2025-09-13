import React, { useState, useEffect } from 'react';
import laptoo_logo from '../../assests/Images/laptop_logo.jpg';
import mobile_logo from '../../assests/Images/mobile_logo.jpg';

interface LogoProps {
  text: string;
  href: string;
}

export const Logo: React.FC<LogoProps> = ({ text, href }) => {
  


  return (
    <div className="header__logo">
      <a href={href}>
        <img 
          width={window.innerWidth <= 768 ? 70 : 240} 
          height={window.innerWidth <= 768 ? 70 : 80} 
          src={window.innerWidth <= 768? mobile_logo : laptoo_logo} 
          alt={text}
          className="header__logo-img"
        />
      </a>
    </div>
  );
};