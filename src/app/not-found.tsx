import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        Nothing here yet
      </h1>
      <p className="mt-3 text-sm text-zinc-400 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-accent transition-transform hover:scale-105"
      >
        <ArrowLeft size={16} strokeWidth={3} />
        Go to workouts
      </Link>
    </div>
  );
}
