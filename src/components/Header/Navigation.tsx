import React, { useState } from 'react';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Dummy dropdown data
  const getDropdownItems = (label: string): DropdownItem[] => {
    const dropdownData: Record<string, DropdownItem[]> = {
      'Wedding': [
        { label: 'Save The Date', href: 'weddingt/story', description: 'Learn about our journey' },
        { label: 'Engagement Ceremony', href: 'weddingt/team', description: 'Meet our talented team' },
        { label: 'Haldi Ceremony', href: 'weddingt/mission', description: 'Our vision and values' },
        { label: 'Mehandi Ceremony', href: 'weddingt/careers', description: 'Join our growing team' },
        { label: 'Countdown Card', href: 'weddingt/press', description: 'Latest news and updates' },
        { label: 'Wedding logo', href: 'weddingt/contact', description: 'Get in touch with us' },
         { label: 'Destination Wedding Video', href: 'weddingt/contact', description: 'Get in touch with us' },
          { label: 'Premium Card Video', href: 'weddingt/contact', description: 'Get in touch with us' },
      ],
      'Features': [
        { label: 'Video Templates', href: '/features/templates', description: 'Beautiful pre-made designs' },
        { label: 'Custom Editing', href: '/features/editing', description: 'Professional video editing' },
        { label: 'Music Library', href: '/features/music', description: 'Royalty-free soundtracks' },
        { label: 'HD Quality', href: '/features/quality', description: 'Crystal clear output' },
        { label: 'Fast Delivery', href: '/features/delivery', description: 'Quick turnaround time' },
        { label: 'Revisions', href: '/features/revisions', description: 'Unlimited modifications' }
      ],
      'Pricing': [
        { label: 'Basic Plan', href: '/pricing/basic', description: 'Perfect for simple invitations' },
        { label: 'Premium Plan', href: '/pricing/premium', description: 'Advanced features included' },
        { label: 'Enterprise', href: '/pricing/enterprise', description: 'For large events' },
        { label: 'Custom Quote', href: '/pricing/custom', description: 'Tailored pricing' },
        { label: 'Discounts', href: '/pricing/discounts', description: 'Special offers available' },
        { label: 'Refund Policy', href: '/pricing/refund', description: 'Money-back guarantee' }
      ]
    };
    
    return dropdownData[label] || [];
  };

  return (
    <nav className="header__navigation">
      <ul className="navigation__list">
        {items.map((item, index) => {
          const dropdownItems = getDropdownItems(item.label);
          const hasDropdown = dropdownItems.length > 0;
          
          return (
            <li 
              key={index} 
              className={`navigation__item ${hasDropdown ? 'navigation__item--has-dropdown' : ''}`}
              onMouseEnter={() => hasDropdown && handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <a className="navigation__link">
                {item.label}
                {hasDropdown && (
                  <svg 
                    className={`navigation__dropdown-icon ${activeDropdown === index ? 'navigation__dropdown-icon--active' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="currentColor"
                  >
                    <path d="M6 8L2 4h8L6 8z"/>
                  </svg>
                )}
              </a>
              
              {hasDropdown && (
                <div className={`navigation__dropdown ${activeDropdown === index ? 'navigation__dropdown--active' : ''}`}>
                  <div className="navigation__dropdown-content">
                    <div className="navigation__dropdown-grid">
                      {dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <a 
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="navigation__dropdown-item"
                        >
                          <span className="navigation__dropdown-item-label">{dropdownItem.label}</span>
                          {dropdownItem.description && (
                            <span className="navigation__dropdown-item-desc">{dropdownItem.description}</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
