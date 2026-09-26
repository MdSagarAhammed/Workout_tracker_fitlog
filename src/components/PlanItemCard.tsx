"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, CheckCircle2, Circle, X } from "lucide-react";
import { Workout } from "@/lib/types";
import { formatCalories, formatMinutes, formatRating } from "@/lib/format";

export default function PlanItemCard({
  workout,
  showDoneToggle,
  isDone,
  onToggleDone,
  onRemove,
}: {
  workout: Workout;
  showDoneToggle: boolean;
  isDone: boolean;
  onToggleDone: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-850 p-4 transition-opacity sm:flex-row sm:items-center ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-ink-700 sm:h-16 sm:w-24">
        <Image src={workout.image} alt={workout.name} fill sizes="120px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-base font-bold uppercase tracking-tight ${
            isDone ? "text-zinc-500 line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-1.5 flex items-center gap-3 text-xs font-semibold text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-accent" />
            {formatMinutes(workout.duration)}
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} className="text-accent" />
            {formatCalories(workout.caloriesBurned)}
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-accent text-accent" />
            {formatRating(workout.rating)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/20 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {showDoneToggle && (
          <button
            type="button"
            onClick={onToggleDone}
            title="Mark as done"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              isDone
                ? "border-accent bg-accent text-ink-950"
                : "border-white/20 text-zinc-300 hover:border-accent hover:text-accent"
            }`}
          >
            {isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          title="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-zinc-300 transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
