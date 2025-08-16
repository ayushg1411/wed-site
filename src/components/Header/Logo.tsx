import React from 'react';
import logo from '../../assests/logog.png'

interface LogoProps {
  text: string;
  href: string;
}

export const Logo: React.FC<LogoProps> = ({ text, href }) => {
  return (
    <div className="header__logo">
      <img width='250px' height={70} src={logo} alt="" />
    </div>
  );
};