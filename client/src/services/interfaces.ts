export interface CitiesHome {
  id: number;
  name: string;
  description: string;
  picture: string;
}

export interface MiniCardProps {
  city: CitiesHome;
}
