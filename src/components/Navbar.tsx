
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-wide"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-ink-950">
            <Dumbbell size={18} strokeWidth={2.5} />
          </span>

          FIT<span className="text-accent">LOG</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-zinc-300 hover:text-white"
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5">

          {/* Plan */}
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-105"
          >
            Plan

            <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-ink-950 px-1 text-[11px] text-accent">
              {planIds.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
          >
            Saved

            <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full border border-white/25 px-1 text-[11px]">
              {savedIds.length}
            </span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-zinc-300 transition-colors hover:border-accent hover:text-accent md:hidden"
            aria-label={
              isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="border-t border-white/10 bg-ink-950 px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

