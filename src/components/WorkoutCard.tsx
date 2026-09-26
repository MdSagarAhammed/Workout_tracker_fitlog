import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";
import { formatCalories, formatMinutes, formatRating } from "@/lib/format";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-850 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-accent"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-700">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-accent" />
            {formatMinutes(workout.duration)}
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-accent" />
            {formatCalories(workout.caloriesBurned)}
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-accent text-accent" />
            {formatRating(workout.rating)}
          </span>
        </div>
      </div>
    </Link>
  );
}
