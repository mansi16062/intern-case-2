# React + TypeScript Filterable & Sortable Table

This is a small **React (Next.js) + TypeScript** project that loads a local JSON dataset of items and displays them in a **filterable, sortable table** with a lightweight detail view.  

---

## Features

- **Client-side table** with:
  - Text search (by title or tags)
  - Column sorting (ascending/descending)
  - Type filtering (`meal` vs `training`)
- **Row selection** shows inline modal with details
- Strong **TypeScript typing** for all models
- Pure **utility functions** for filtering and sorting
- **Unit tests** for utility functions
- Basic **responsive design** using TailwindCSS
- Lightweight **accessibility** considerations (focusable elements, aria-labels)

---

## Dataset

The dataset is stored locally at:  
`/public/data/intern-case-2.json`  

Example structure:

```json
{
  "items": [
    {
      "id": 1,
      "type": "meal",
      "title": "Chicken & Rice",
      "kcal": 650,
      "tags": ["protein"]
    },
    {
      "id": 2,
      "type": "training",
      "title": "Intervals 6x400m",
      "kcal": 450,
      "tags": ["running"]
    }
  ]
}
