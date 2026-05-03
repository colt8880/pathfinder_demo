"use client";

import { useState, useRef } from "react";

export default function HighlightTooltip({
  phrase,
  signal,
}: {
  phrase: string;
  signal: string;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className="relative cursor-help rounded bg-amber-100 px-0.5 font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {phrase}
      {show && (
        <span className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-normal text-zinc-700 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Clinical signal:
          </span>{" "}
          {signal}
        </span>
      )}
    </span>
  );
}
