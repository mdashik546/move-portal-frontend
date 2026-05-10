export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface MovieCardProps {
  id: string;
  title: string;
  description: string;
  genre: string;
  price: number;
  releaseYear: number;
  director: string;
  cast: string[];
  posterUrl: string;
  videoUrl: string;
  isPremium: boolean;
  createdAt: string;
  reviews: Review[];
  watchlistedBy: string[];
  isLock: boolean;
  hasAccess: boolean;
}
