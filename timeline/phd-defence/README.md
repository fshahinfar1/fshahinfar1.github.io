# PhD Defense Timeline — Static Site

## Files
- index.html   -> the page itself (do not need to edit)
- data.json    -> EDIT THIS to update your timeline

## How to edit
Open data.json in any text editor. Each step looks like:

{
  "no": 16,
  "date": "2026-11-01",
  "task": "Upload final definitive dissertation",
  "responsible": "Student",
  "status": "critical",
  "note": "MANDATORY - review will not start otherwise"
}

- date: format YYYY-MM-DD
- status: one of "done", "in-progress", "upcoming", "critical", "milestone"
- note: optional, leave "" if none

Add, remove, or reorder steps freely — the page rebuilds automatically from the array order.

## How to view it
Browsers block fetch() of local JSON files opened via double-click (file://).
Run a tiny local server from this folder, e.g.:

    python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

Alternatively, upload both files to any static hosting (GitHub Pages, Netlify, your own webpage folder) and it will work directly.
