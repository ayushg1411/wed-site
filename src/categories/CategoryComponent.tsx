import { VideoGrid } from '../components/VideoGrid/VideoGrid'
import { CategoryBar } from '../components/CategoryBar/CategoryBar'
import { useParams } from "react-router-dom";
import { sampleVideos } from "../constatnts/VideosData";
import { WEDDING_CATEGORIES } from "../constants/WeddingCategories";
import './CategoryComponent.css';

const CategoryComponent = () => {
    const {category} = useParams<{ category: string }>();
    
    const filteredVideos = sampleVideos.filter(video => video.categories.includes(category!));

    // Find the current category for display
    const currentCategory = WEDDING_CATEGORIES.find(cat => cat.id === category);
    const categoryTitle = currentCategory ? currentCategory.label : category;

    // Get category-specific hero image
    const getCategoryImage = (categoryId: string) :any=> {
        const images = {
            'wedding-invites': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'save-the-date': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'engagement-ceremony': 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'haldi-ceremony': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'mehndi-ceremony': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'sangeet-ceremony': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'hindu-wedding-cards': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'muslim-wedding-cards': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'anniversary-cards': 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'caricature-invites': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'birthday-cards': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        };
        return images[categoryId as keyof typeof images] || images['wedding-invites'];
    };

    return (
        <div className="category-page">
            <CategoryBar categories={WEDDING_CATEGORIES} />
            
            {/* Hero Section */}
            <div className="category-hero">
                <div className="category-hero__overlay"></div>
                <img
                    src={getCategoryImage(category || '')}
                    alt={categoryTitle}
                    className="category-hero__image"
                />
                <div className="category-hero__content">
                    <div className="category-hero__container">
                        <div className="category-hero__badge">
                            <span className="category-hero__badge-icon">✨</span>
                            Premium Collection
                        </div>
                        <h1 className="category-hero__title">{categoryTitle}</h1>
                        <p className="category-hero__subtitle">
                            Discover our stunning collection of {categoryTitle?.toLowerCase()} designed to make your special moments unforgettable
                        </p>
                        <div className="category-hero__stats">
                            <div className="stat-item">
                                <span className="stat-number">{filteredVideos.length}</span>
                                <span className="stat-label">Invites</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">4.7</span>
                                <span className="stat-label">Rating</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Happy Couples</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="category-content">
                <VideoGrid 
                    videos={filteredVideos}
                    title={`${categoryTitle} Collection`}
                />
            </div>
        </div>
    );
};

export default CategoryComponent;
