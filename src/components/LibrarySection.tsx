"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Workout, SortKey } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

function sortWorkouts(workouts: Workout[], key: SortKey): Workout[] {
  const copy = [...workouts];
  switch (key) {
    case "duration":
      return copy.sort((a, b) => a.duration - b.duration);
    case "calories":
      return copy.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : workouts;
    return sortWorkouts(base, sortKey);
  }, [workouts, sortKey, query]);

  const activeLabel = sortOptions.find((o) => o.key === sortKey)?.label ?? "Duration";

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workouts..."
              className="w-full rounded-full border border-white/10 bg-ink-850 py-2 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-accent/60 focus:outline-none sm:w-56"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen((v) => !v)}
              onBlur={() => setTimeout(() => setIsSortOpen(false), 120)}
              className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-ink-850 px-4 py-2 text-sm font-semibold text-white sm:w-44"
            >
              Sort By: {activeLabel}
              <ChevronDown
                size={16}
                className={`text-accent transition-transform ${isSortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isSortOpen && (
              <ul className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-xl">
                {sortOptions.map((option) => (
                  <li key={option.key}>
                    <button
                      type="button"
                      onMouseDown={() => setSortKey(option.key)}
                      className={`block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-ink-700 ${
                        sortKey === option.key ? "text-accent" : "text-zinc-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-ink-850 py-16 text-center text-sm text-zinc-500">
          No workouts match &quot;{query}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
