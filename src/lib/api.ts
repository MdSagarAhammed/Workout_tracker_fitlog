import { Workout } from "./types";

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";


export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getWorkoutById(id: number): Promise<Workout | null> {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.id === id) ?? null;
}
