import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink-950">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-accent transition-transform hover:scale-105"
          >
            Browse Workouts
            <ArrowRight size={16} strokeWidth={3} />
          </a>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-ink-800 lg:max-w-md">
          <Image
            src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
            alt="Athlete mid-lift"
            fill
            sizes="(max-width: 1024px) 384px, 448px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
