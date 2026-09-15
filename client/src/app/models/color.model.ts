export interface PaintColor {
  _id?: string;
  code: string;
  name: string;
  hex: string;
  rgb: string;
  brand: string;
  category: string;
  finishOptions: string[];
  popular?: boolean;
  tags?: string[];
  createdAt?: string;
}

export type PaintFinish = 'matte' | 'eggshell' | 'satin' | 'semi-gloss' | 'glossy';
