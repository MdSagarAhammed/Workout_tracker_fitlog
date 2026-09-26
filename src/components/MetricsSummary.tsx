import { Dumbbell, Clock, Flame } from "lucide-react";

export default function MetricsSummary({
  exercises,
  minutes,
  calories,
}: {
  exercises: number;
  minutes: number;
  calories: number;
}) {
  const stats = [
    { label: "Exercises", value: exercises, icon: Dumbbell },
    { label: "Minutes", value: minutes, icon: Clock },
    { label: "Calories", value: calories, icon: Flame },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-ink-850 py-5 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-3"
        >
          <stat.icon size={18} className="text-accent" />
          <div>
            <p className="font-display text-2xl font-bold leading-none">{stat.value}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
