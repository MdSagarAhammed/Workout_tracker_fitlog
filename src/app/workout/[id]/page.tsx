import Image from "next/image";
import { notFound } from "next/navigation";
import { Dumbbell, Gauge, Repeat, Clock, Flame, Star } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    notFound();
  }

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment, icon: Dumbbell },
    { label: "Difficulty", value: workout.difficulty, icon: Gauge },
    { label: "Sets", value: String(workout.sets), icon: Repeat },
    { label: "Reps", value: workout.reps, icon: Repeat },
    { label: "Duration", value: `${workout.duration} min`, icon: Clock },
    { label: "Calories", value: `${workout.caloriesBurned} kcal`, icon: Flame },
    { label: "Rating", value: workout.rating.toFixed(1), icon: Star },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left: media */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-800 lg:aspect-auto lg:h-full lg:min-h-[420px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right: details */}
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key specs panel */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-ink-850">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-5 py-3 text-sm ${
                  i !== specs.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <span className="flex items-center gap-2 font-semibold uppercase tracking-wide text-zinc-400">
                  <spec.icon size={15} className="text-accent" />
                  {spec.label}
                </span>
                <span className="font-semibold text-white">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-700 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
