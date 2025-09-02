import React from 'react';

interface ActionButton {
  label: any;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons }) => {
  return (
    <div className="header__actions">
      {buttons.map((button, index) => {
        const className = `action-button action-button--${button.variant}`;
        
        if (button.href) {
          return (
            <a
              key={index}
              href={button.href}
              className={className}
            >
              {button.label}
            </a>
          );
        }
        
        return (
          <button
            key={index}
            onClick={button.onClick}
            className={className}
            style={{fontWeight:700}}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};