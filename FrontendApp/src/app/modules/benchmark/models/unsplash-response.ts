export interface UnsplashResponse {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  widht: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: UnsplashPhoto;
  links: Object;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Object;
  topic_submissions: Object;
  user: Object;
}

export interface UnsplashPhoto {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
