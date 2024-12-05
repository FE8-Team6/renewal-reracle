export interface WasteCategoryTypes {
  id: string;
  name: string;
  img: string;
  items: WasteItemTypes[];
}

interface WasteItemTypes {
  id: string;
  name: string;
  img: string;
  disposalMethod: string;
}
