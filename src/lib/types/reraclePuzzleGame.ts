export type PuzzleItem = {
  id: number;
  type: string;
  name: string;
  image: string;
  correctBin: WASTE_TYPES;
};

export type Cell = {
  id: number;
  binType: WASTE_TYPES;
  item: PuzzleItem | null;
};

export enum WASTE_TYPES {
  METAL = 'metal',
  PAPER = 'paper',
  PLASTIC = 'plastic',
  GLASS = 'glass',
  FOOD = 'food',
  ELECTRONICS = 'electronics',
  HAZARDOUS = 'hazardous',
}
