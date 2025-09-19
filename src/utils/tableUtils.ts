import { Item } from "../types/item";

export const filterItems = (items: Item[], search: string, type: string): Item[] => {
  return items.filter(i => {
    const matchesSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesType = type === "all" || i.type === type;
    return matchesSearch && matchesType;
  });
};

export const sortItems = (items: Item[], key: keyof Item, asc: boolean): Item[] => {
  return [...items].sort((a, b) => {
    const aVal = a[key] ?? "";
    const bVal = b[key] ?? "";
    if (aVal < bVal) return asc ? -1 : 1;
    if (aVal > bVal) return asc ? 1 : -1;
    return 0;
  });
};
