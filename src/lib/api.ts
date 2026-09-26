import { Workout } from "./types";

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches every workout from the FitLog API.
 * Used on the Home page (server-rendered) and on the My Plan page
 * (client-rendered, to hydrate saved/plan ids with full workout data).
 */
export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Fetches a single workout by id. We pull the full collection and filter
 * client/server-side so behavior stays consistent no matter what shape
 * the `/api/fitlog/:id` route happens to return.
 */
export async function getWorkoutById(id: number): Promise<Workout | null> {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.id === id) ?? null;
}
