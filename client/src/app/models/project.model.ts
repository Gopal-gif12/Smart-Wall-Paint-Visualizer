export interface Point2D {
  x: number;
  y: number;
}

export interface WallLayer {
  name: string;
  polygon: Point2D[];
  color?: {
    code: string;
    name: string;
    hex: string;
  };
  pattern?: string;
  finish: string;
  opacity: number;
}

export interface RoomProject {
  _id?: string;
  id?: string;
  userId?: string;
  title: string;
  roomType: string;
  originalImage: string;
  previewImage?: string;
  walls: WallLayer[];
  dualTone?: {
    enabled: boolean;
    secondaryColor?: string;
    orientation: 'horizontal' | 'vertical';
    splitRatio: number;
  };
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SampleRoom {
  id: string;
  name: string;
  type: string;
  description: string;
  aspectRatio: string;
  suggestedWalls: {
    name: string;
    polygon: Point2D[];
    defaultColor: string;
    defaultFinish: string;
  }[];
}
