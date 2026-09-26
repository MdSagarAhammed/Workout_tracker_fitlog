# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built to test my next.js skills. Pick a lift from the library, lock it into today's plan, and save others for later — all backed by a live workouts API and persisted in your browser.

## 🔗 Links

- **Live Link:** https://workouttrackerfitlog.vercel.app/
- **GitHub Repository:** https://github.com/MdSagarAhammed/Workout_tracker_fitlog.git

## 🛠️ Technologies Used

- **Next.js 14** (App Router) — dynamic routing, server components, data fetching
- **React 18** + TypeScript
- **Tailwind CSS** — styling and responsive layout
- **lucide-react** — icon set
- **Context API + localStorage** — Today's Plan / Saved / Done state persistence across reloads
- FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`) — workout data

## ✨ Features

1. **Responsive workout library** — a 3×4 card grid on desktop that collapses gracefully to 2 and 1 columns on tablet and mobile.
2. **Live sort & search** — reorder the library by Duration, Calories, or Rating, or filter by name/muscle group, without leaving the page.
3. **Today's Plan with a 5-lift cap** — add workouts from any detail page; the "Add to today's plan" button disables itself once the plan is full.
4. **Persistent Plan / Saved / Done state** — everything is written to `localStorage`, so your plan survives a page reload, and badge counters in the navbar always reflect the current counts.
5. **Toast notifications** — every add, save, remove, and done/undone action gets instant, unobtrusive feedback.
6. **Graceful loading & empty states** — animated loaders while data is fetched, and a friendly "Nothing Here Yet" state with a CTA back to the library.
7. **Custom 404 page** — any unknown route lands on a themed not-found screen with a way back home.