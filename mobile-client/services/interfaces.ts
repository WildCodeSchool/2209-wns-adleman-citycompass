export interface CitiesHome {
  id: number;
  name: string;
  description: string;
  picture: string;
}

export interface MiniCardProps {
  city: CitiesHome;
}

export interface CityCoord {
  latitude: string;
  longitude: string;
}

export interface CityCoordInt {
  latitude: number | undefined;
  longitude: number | undefined;
}

export interface Poi {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  adress: string;
  website?: string | null | undefined;
  picture: string;
  description: string;
}
