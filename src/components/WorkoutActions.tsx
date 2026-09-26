"use client";

import { CalendarPlus, Bookmark, BookmarkCheck, CalendarCheck } from "lucide-react";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { isInPlan, isSaved, isPlanFull, addToPlan, saveForLater } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const disablePlanAdd = inPlan || (isPlanFull && !inPlan);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        disabled={disablePlanAdd}
        onClick={() => addToPlan(workout.id, workout.name)}
        title={
          isPlanFull && !inPlan
            ? `Today's plan is full (cap of ${PLAN_CAP})`
            : undefined
        }
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-accent transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {inPlan ? <CalendarCheck size={18} strokeWidth={2.5} /> : <CalendarPlus size={18} strokeWidth={2.5} />}
        {inPlan ? "In Today's Plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout.id, workout.name)}
        disabled={saved}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saved ? <BookmarkCheck size={18} strokeWidth={2.5} /> : <Bookmark size={18} strokeWidth={2.5} />}
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
