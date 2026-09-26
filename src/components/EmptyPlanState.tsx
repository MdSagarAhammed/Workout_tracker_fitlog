import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function EmptyPlanState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-ink-850 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ink-700 text-accent">
        <Dumbbell size={24} />
      </div>
      <h3 className="font-display text-xl font-bold uppercase tracking-tight">
        Nothing Here Yet
      </h3>
      <p className="mt-2 max-w-xs text-sm text-zinc-500">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-accent transition-transform hover:scale-105"
      >
        Go to workouts
      </Link>
    </div>
  );
}
