"use client";
import { useState, useEffect } from "react";
import { Item } from "../types/item";
import { filterItems, sortItems } from "../utils/tableUtils";

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof Item>("title");
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    fetch("/data/intern-case-2.json")
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  }, []);

  const filtered = filterItems(items, search, typeFilter);
  const sorted = sortItems(filtered, sortKey, asc);

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Items Table
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or tag..."
          className="p-2 rounded border border-gray-300 w-full sm:w-1/2 focus:ring-1 focus:ring-indigo-400"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:ring-1 focus:ring-indigo-400"
        >
          <option value="all">All</option>
          <option value="meal">Meal</option>
          <option value="training">Training</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              {["title", "type", "kcal", "tags"].map((key) => (
                <th
                  key={key}
                  onClick={() => {
                    if (key !== "tags") {
                      if (sortKey === key) setAsc(!asc);
                      else setSortKey(key as keyof Item);
                    }
                  }}
                  className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none ${
                    key === "tags" ? "cursor-default" : ""
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  {sortKey === key ? (asc ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sorted.map((i) => (
              <tr
                key={i.id}
                onClick={() => setSelected(i)}
                className={`cursor-pointer transition hover:bg-indigo-50 ${
                  selected?.id === i.id ? "bg-indigo-100" : ""
                }`}
              >
                <td className="px-4 py-2">{i.title}</td>
                <td className="px-4 py-2 capitalize">{i.type}</td>
                <td className="px-4 py-2">{i.kcal}</td>
                <td className="px-4 py-2 flex flex-wrap gap-1">
                  {i.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {selected.title}
            </h2>
            <p className="mb-1">
              <span className="font-medium">Type:</span> {selected.type}
            </p>
            <p className="mb-1">
              <span className="font-medium">Calories:</span> {selected.kcal}
            </p>
            <p className="mb-2">
              <span className="font-medium">Tags:</span> {selected.tags.join(", ")}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
