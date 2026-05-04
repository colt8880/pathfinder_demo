"use client";

import { useEffect } from "react";
import { useTour, NudgeTarget } from "./welcome-tour";

export default function NudgeAdvance({ from }: { from: NudgeTarget }) {
  const { nudgeTarget, advanceNudge } = useTour();
  useEffect(() => {
    if (nudgeTarget === from) advanceNudge();
  }, [nudgeTarget, from, advanceNudge]);
  return null;
}
