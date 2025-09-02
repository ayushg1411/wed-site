import { VideoGrid } from '../components/VideoGrid/VideoGrid'
import { useParams } from "react-router-dom";
import { sampleVideos } from "../constatnts/VideosData";

const SaveDate = () => {

    const {category} = useParams<{ category: string }>();
    const filteredVideos = sampleVideos.filter((item)=>{
    return item.category ===category
    })
  return (
    <div>
      <section className="hero">
        
        <h1>{category}</h1>
        <p>Because Every Love Story Deserves a Beautiful Beginning</p>
      </section>
      <VideoGrid 
              videos={filteredVideos}
              title="Digital Wedding Invitations"
            />
    </div>
  );
};

export default SaveDate;
