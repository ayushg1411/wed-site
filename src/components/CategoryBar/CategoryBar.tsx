import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryBar.css';

interface Category {
  id: string;
  label: string;
  href: string;
}

interface CategoryBarProps {
  categories: Category[];
  className?: string;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ categories, className = '' }) => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const handleCategoryClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className={`category-bar ${className}`}>
      <div className="category-bar__container">
        <div className="category-bar__scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-bar__item ${category === cat.id ? 'category-bar__item--active' : ''}`}
              onClick={() => handleCategoryClick(cat.href)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};