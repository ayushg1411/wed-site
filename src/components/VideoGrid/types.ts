export interface Video {
  id: string;
  vimeoId: string;
  title: string;
  description?: string;
  duration?: string;
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
