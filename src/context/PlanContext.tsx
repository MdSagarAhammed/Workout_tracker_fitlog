"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useToast } from "./ToastContext";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const DONE_KEY = "fitlog:done";

export const PLAN_CAP = 5;

interface PlanContextValue {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  isHydrated: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isPlanFull: boolean;
  addToPlan: (id: number, name?: string) => void;
  saveForLater: (id: number, name?: string) => void;
  removeFromPlan: (id: number, name?: string) => void;
  removeFromSaved: (id: number, name?: string) => void;
  toggleDone: (id: number, name?: string) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function readIds(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { showToast } = useToast();

  // Hydrate from localStorage after mount only, to avoid SSR/client mismatch.
  useEffect(() => {
    setPlanIds(readIds(PLAN_KEY));
    setSavedIds(readIds(SAVED_KEY));
    setDoneIds(readIds(DONE_KEY));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(planIds));
  }, [planIds, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [savedIds, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [doneIds, isHydrated]);

  const isInPlan = useCallback((id: number) => planIds.includes(id), [planIds]);
  const isSaved = useCallback((id: number) => savedIds.includes(id), [savedIds]);
  const isDone = useCallback((id: number) => doneIds.includes(id), [doneIds]);
  const isPlanFull = planIds.length >= PLAN_CAP;

  const addToPlan = useCallback(
    (id: number, name?: string) => {
      setPlanIds((prev) => {
        if (prev.includes(id)) {
          showToast(`${name ?? "Workout"} is already in today's plan`);
          return prev;
        }
        if (prev.length >= PLAN_CAP) {
          showToast("Today's plan is full — cap of 5 lifts");
          return prev;
        }
        showToast(`Added ${name ?? "workout"} to today's plan`);
        return [...prev, id];
      });
    },
    [showToast]
  );

  const saveForLater = useCallback(
    (id: number, name?: string) => {
      setSavedIds((prev) => {
        if (prev.includes(id)) {
          showToast(`${name ?? "Workout"} is already saved`);
          return prev;
        }
        showToast(`Saved ${name ?? "workout"} for later`);
        return [...prev, id];
      });
    },
    [showToast]
  );

  const removeFromPlan = useCallback(
    (id: number, name?: string) => {
      setPlanIds((prev) => prev.filter((existing) => existing !== id));
      setDoneIds((prev) => prev.filter((existing) => existing !== id));
      showToast(`Removed ${name ?? "workout"} from today's plan`);
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id: number, name?: string) => {
      setSavedIds((prev) => prev.filter((existing) => existing !== id));
      showToast(`Removed ${name ?? "workout"} from saved`);
    },
    [showToast]
  );

  const toggleDone = useCallback(
    (id: number, name?: string) => {
      setDoneIds((prev) => {
        if (prev.includes(id)) {
          showToast(`${name ?? "Workout"} marked as not done`);
          return prev.filter((existing) => existing !== id);
        }
        showToast(`${name ?? "Workout"} marked as done`);
        return [...prev, id];
      });
    },
    [showToast]
  );

  const value = useMemo<PlanContextValue>(
    () => ({
      planIds,
      savedIds,
      doneIds,
      isHydrated,
      isInPlan,
      isSaved,
      isDone,
      isPlanFull,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    }),
    [
      planIds,
      savedIds,
      doneIds,
      isHydrated,
      isInPlan,
      isSaved,
      isDone,
      isPlanFull,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
