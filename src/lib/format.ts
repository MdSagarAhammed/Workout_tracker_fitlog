export function formatMinutes(minutes: number): string {
  return `${minutes} min`;
}

export function formatCalories(calories: number): string {
  return `${calories} kcal`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
