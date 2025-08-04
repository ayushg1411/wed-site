import React from 'react';

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav className="header__navigation">
      <ul className="navigation__list">
        {items.map((item, index) => (
          <li key={index} className="navigation__item">
            <a href={item.href} className="navigation__link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};