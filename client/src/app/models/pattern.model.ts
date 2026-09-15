export interface WallpaperPattern {
  _id?: string;
  code: string;
  name: string;
  category: string;
  style: string;
  description?: string;
  type: string;
  scale: number;
  blendMode: string;
  svgPattern: string;
  createdAt?: string;
}
