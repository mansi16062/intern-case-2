export type ItemType = "meal" | "training";

export interface Item {
  id: number;
  type: ItemType;
  title: string;
  kcal: number;
  tags: string[];
}
