"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();
  // const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-wide">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-ink-950">
            <Dumbbell size={18} strokeWidth={2.5} />
          </span>
          FIT<span className="text-accent">LOG</span>
        </Link>

        
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? "text-accent" : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        
        <div className="flex items-center gap-2.5">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-105"
          >
            Plan
            <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-ink-950 px-1 text-[11px] text-accent">
              {planIds.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
          >
            Saved
            <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full border border-white/25 px-1 text-[11px]">
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>

      
      <nav className="flex items-center justify-center gap-6 border-t border-white/10 py-2 md:hidden">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wide ${
                isActive ? "text-accent" : "text-zinc-400"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
{/* Mobile menu button */}
{/* <div className="border-t border-white/10 px-4 py-2 md:hidden">
  <button
    type="button"
    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold uppercase tracking-wide text-zinc-300 transition-colors hover:text-white"
    aria-label="Toggle navigation menu"
    aria-expanded={isMobileMenuOpen}
  >
    <span>Menu</span>

    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
  </button>

  {isMobileMenuOpen && (
    <nav className="flex flex-col gap-1 pb-2 pt-1">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-accent text-ink-950"
                : "text-zinc-300 hover:bg-ink-800 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  )}
</div> */}

    </header>
  );
}
