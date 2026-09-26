"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";
import { Workout, PlanTab } from "@/lib/types";
import MetricsSummary from "./MetricsSummary";
import PlanItemCard from "./PlanItemCard";
import EmptyPlanState from "./EmptyPlanState";

const tabs: { key: PlanTab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const [activeTab, setActiveTab] = useState<PlanTab>(initialTab);
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    planIds,
    savedIds,
    isDone,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = usePlan();

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    getWorkouts()
      .then((data) => {
        if (isActive) setWorkouts(data);
      })
      .catch(() => {
        if (isActive) setWorkouts([]);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, []);

  const byId = useMemo(() => {
    const map = new Map<number, Workout>();
    (workouts ?? []).forEach((w) => map.set(w.id, w));
    return map;
  }, [workouts]);

  const planWorkouts = planIds.map((id) => byId.get(id)).filter(Boolean) as Workout[];
  const savedWorkouts = savedIds.map((id) => byId.get(id)).filter(Boolean) as Workout[];

  const metrics = planWorkouts.reduce(
    (acc, w) => ({
      exercises: acc.exercises + 1,
      minutes: acc.minutes + w.duration,
      calories: acc.calories + w.caloriesBurned,
    }),
    { exercises: 0, minutes: 0, calories: 0 }
  );

  const activeList = activeTab === "plan" ? planWorkouts : savedWorkouts;
  const showLoading = isLoading && (activeTab === "plan" ? planIds.length > 0 : savedIds.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6">
        <MetricsSummary
          exercises={metrics.exercises}
          minutes={metrics.minutes}
          calories={metrics.calories}
        />
      </div>

      
      <div className="mt-8 flex gap-2 border-b border-white/10">
        {tabs.map((tab) => {
          const count = tab.key === "plan" ? planIds.length : savedIds.length;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                isActive ? "text-accent" : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  isActive ? "bg-accent text-ink-950" : "bg-ink-700 text-zinc-400"
                }`}
              >
                {count}
              </span>
              {isActive && (
                <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      
      <div className="mt-6">
        {showLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-white/10 border-t-accent" />
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Loading workouts…
            </p>
          </div>
        ) : activeList.length === 0 ? (
          <EmptyPlanState />
        ) : (
          <div className="flex flex-col gap-3">
            {activeList.map((workout) => (
              <PlanItemCard
                key={workout.id}
                workout={workout}
                showDoneToggle={activeTab === "plan"}
                isDone={isDone(workout.id)}
                onToggleDone={() => toggleDone(workout.id, workout.name)}
                onRemove={() =>
                  activeTab === "plan"
                    ? removeFromPlan(workout.id, workout.name)
                    : removeFromSaved(workout.id, workout.name)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
