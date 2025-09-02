import { VideoGrid } from '../components/VideoGrid/VideoGrid'
import { CategoryBar } from '../components/CategoryBar/CategoryBar'
import { useParams } from "react-router-dom";
import { sampleVideos } from "../constatnts/VideosData";
import { WEDDING_CATEGORIES } from "../constants/WeddingCategories";

const SaveDate = () => {
    const {category} = useParams<{ category: string }>();
    
    const filteredVideos = sampleVideos.filter((item)=>{
        return item.category === category
    })

    // Find the current category for display
    const currentCategory = WEDDING_CATEGORIES.find(cat => cat.id === category);
    const categoryTitle = currentCategory ? currentCategory.label : category;

    return (
        <div>
            <CategoryBar categories={WEDDING_CATEGORIES} />
            
          <img
                src='https://images.unsplash.com/photo-1620752948588-88675f48bca1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='dfs'
                // className="carousel-image"
                width={'100%'}
                height={'300px'}
                // loading={index === 0 ? 'eager' : 'lazy'}
              />
            
            <VideoGrid 
                videos={filteredVideos}
                title={`${categoryTitle} Collection`}
            />
        </div>
    );
};

export default SaveDate;
