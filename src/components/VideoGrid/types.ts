export interface Video {
  id: string;
  vimeoId: string;
  title: string;
  description?: string;
  duration?: string;
  price:string;
  pages:number;
  originalPrice:string;
  category:string;
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
