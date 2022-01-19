export interface PexelsResponse {
  next_page: string;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
}

export interface PexelsPhoto {
  alt: string;
  avg_color: string;
  heigh: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: SrcPexels;
  url: string;
  width: number;
}

export interface SrcPexels {
  landscape: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}
