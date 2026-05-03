"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/pcp", label: "PCP View" },
  { href: "/reasoning", label: "Clinical Reasoning" },
  { href: "/network", label: "Network Intelligence" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <Link
        href="/pcp"
        className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        Pathfinder
      </Link>
      <div className="flex gap-1 overflow-x-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
