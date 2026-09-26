export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="h-12 w-12 animate-spin-slow rounded-full border-4 border-white/10 border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
        Loading workout…
      </p>
    </div>
  );
}
