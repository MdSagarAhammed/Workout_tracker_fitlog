import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-bold tracking-wide">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-ink-950">
            <Dumbbell size={16} strokeWidth={2.5} />
          </span>
          FITLOG
        </Link>
        <p className="text-center text-xs text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
