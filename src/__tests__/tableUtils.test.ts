import { filterItems, sortItems } from "../utils/tableUtils";
import { Item } from "../types/item";

const mockItems: Item[] = [
  { id: 1, type: "meal", title: "Chicken & Rice", kcal: 650, tags: ["protein"] },
  { id: 2, type: "training", title: "Intervals 6x400m", kcal: 450, tags: ["running"] },
];

test("filter by search string", () => {
  const result = filterItems(mockItems, "chicken", "all");
  expect(result).toHaveLength(1);
  expect(result[0].title).toBe("Chicken & Rice");
});

test("filter by type", () => {
  const result = filterItems(mockItems, "", "training");
  expect(result).toHaveLength(1);
  expect(result[0].type).toBe("training");
});

test("sort by kcal ascending", () => {
  const result = sortItems(mockItems, "kcal", true);
  expect(result[0].kcal).toBe(450);
});
