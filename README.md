# Items Table — Next.js + TypeScript (Intern Case)

**Short description**

A small client-side Next.js page that loads a local JSON dataset (`intern-case-2.json`) and renders a searchable, filterable, and sortable table of items (meals and trainings). Clicking a row opens a lightweight modal detail view. The code emphasizes type safety, pure utility functions for filtering/sorting, and small unit tests for those utilities.

---

## Live goals / what this repo shows

* Clean, strongly-typed TypeScript data model (`Item`) and narrow `ItemType` union.
* Pure, testable utility functions: `filterItems` and `sortItems`.
* Client-only page (React + Next.js) that fetches a local JSON file and renders a responsive table.
* Row selection opens a modal-style detail view.
* Minimal, accessible-first UI patterns (focusable rows, labels on controls — see notes below).
* Small unit tests for the utilities.

---

## Features

* Text search (title + tags)
* Type filter (`all | meal | training`)
* Column sorting (click column header toggles ascending/descending)
* Lightweight detail modal on row click
* Unit tests for `filterItems` and `sortItems`

---

## Tech stack

* Next.js (app directory, client component)
* React (client components)
* TypeScript
* Tailwind CSS (utility-first for rapid styling)
* Jest (or the test runner in your stack) for unit tests — simple tests only

---

## File structure (highlight)

```
src/
  app/
    page.tsx             # Main page component (client)
  components/           # (optional) small components if added
  types/
    item.ts             # Item model and types
  utils/
    tableUtils.ts       # filterItems, sortItems (pure functions)
  data/
    intern-case-2.json  # Provided dataset loaded client-side
tests/
  tableUtils.test.ts    # unit tests for utils
package.json
README.md
```

> The repository used a single-file page for simplicity, but components can be split out to improve reuse.

---

## How to run (locally)

1. Install dependencies:

```bash
npm install
# or
yarn
```

2. Run the dev server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) and the page will fetch `public/data/intern-case-2.json` (or `/data/intern-case-2.json` depending on where you place it).

4. Run tests:

```bash
npm test
# or
yarn test
```

---

## Accessibility considerations

The project intentionally keeps accessibility in mind but leaves a few progressive improvements for future work:

* Controls (search input and type select) have visible labels and use native HTML controls for keyboard support.
* Table rows are clickable; keyboard users can focus and activate rows (recommendation: move `onClick` behavior to a button inside the row or make the row `role="button"` and handle `onKeyDown` for Enter/Space to be fully accessible).
* Modal overlay uses a visible backdrop and an obvious close button. Improvements: trap focus inside the modal, return focus to the originating row, and add `aria-modal`, `aria-labelledby` and `aria-describedby` attributes.

If you want, I can add these improvements in the repo (focus management, focus trap, better ARIA attributes) as a follow-up.

---

## Design / UX notes & trade-offs

* **Client-only fetch**: The JSON is loaded client-side with `fetch('/data/intern-case-2.json')` so the page is fast to iterate on and keeps the example simple. For larger datasets or SEO needs, server-side rendering or API routes would be preferable.

* **Pure utils**: `filterItems` and `sortItems` are intentionally pure and synchronous to make unit testing straightforward and to keep UI logic thin.

* **Simplicity vs completeness**: The UI focuses on essentials (search, filter, sort, details). Advanced features like pagination, column resizing, column visibility, or remote sorting were left out to keep the scope within the requested time box.

* **Sorting by mixed types**: `sortItems` does a simple `<` / `>` comparison on the selected item key. If you have fields with mixed types or want locale-aware string comparison, replace comparisons with `String(aVal).localeCompare(String(bVal), undefined, { numeric: true })`.

* **Testing scope**: Tests target only the utilities (`filterItems`, `sortItems`) because they contain the majority of deterministic logic. UI tests (e.g., with React Testing Library) can be added if desired.

---

## Tests included

* `tableUtils.test.ts` includes basic tests:

  * filter by search string
  * filter by type
  * sort by kcal ascending

Run them with your existing test setup. They are small and focused on logic instead of DOM rendering.

---

## How I'd extend this project

Short roadmap ideas:

1. **Accessibility polish**: implement focus trapping in the modal (e.g. `focus-trap-react`), manage focus return, and add full keyboard support for row activation and column sorting.
2. **Large dataset handling**: add pagination, virtualization (react-window), and/or server-side filtering/sorting.
3. **Column features**: allow hiding/showing columns, column re-ordering, and multi-column sort.
4. **Editable rows**: inline editing modal or drawer with form validation.
5. **Persistent user preferences**: store sort/filter state in URL query params so views are shareable and bookmarkable.
6. **E2E tests**: add Playwright or Cypress tests for the main flows.

---

## Notes on AI assistance

* AI was used to help draft README content and to suggest architecture and UX trade-offs. Code was handwritten and tested by the developer (or provided by the candidate). Any AI-generated content is limited to documentation and suggestions; the implementation in `src` is the autho
