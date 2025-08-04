import React from 'react';

interface LogoProps {
  text: string;
  href: string;
}

export const Logo: React.FC<LogoProps> = ({ text, href }) => {
  return (
    <div className="header__logo">
      <a href={href} className="logo__link">
        {text}
      </a>
    </div>
  );
};