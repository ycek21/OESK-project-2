import { environment } from 'src/environments/environment';

export const BASE_URL = environment.baseUrl + '/api/';
export const HISTORICDATA_URL = BASE_URL + `historicData`;
export const pexelsUrl: string =
  'https://api.pexels.com/v1/search?query=animal&per_page=:PER_PAGE:&page=:PAGE_NUMBER:&size=large';
export const pexelsKey: string =
  '563492ad6f917000010000013fb66d388f504027b230b7f44b263be2';
export const unsplashUrl: string =
  'https://api.unsplash.com/photos/random/?client_id=wo1w-k_a3rEHLCP9d009H1WbU7R6_YR7klllQqDD79M&query=animal&count=:PER_PAGE:';
export const fullHdQuery = '?&h=1080&w=1920&fit=crop';
export const fourKQuery = '?&h=2160&w=3840&fit=crop';
