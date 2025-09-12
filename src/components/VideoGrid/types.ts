export interface Video {
  id: string;
  vimeoId: string;
  title: string;
  description?: string;
  duration?: string;
  price:number;
  pages:number;
  originalPrice:number;
  categories:any[];
  tier: {
    id: string;
    label: string;
    color: string;
    bgColor: string;
    icon: string;
    description: string;
  };
  code: string;
}

export interface VideoGridProps {
  videos: Video[];
  title?: string;
  className?: string;
}

export interface VideoPlayerProps {
  vimeoId: string;
  title?: string;
  className?: string;
  
}
