"use client";

import { useState, useSyncExternalStore, useCallback, createContext, useContext } from "react";
import { Stethoscope, Brain, Activity, ArrowRight, X, HelpCircle } from "lucide-react";
import Button from "./ui/button";
import Badge from "./ui/badge";

const STORAGE_KEY = "pathfinder-tour-dismissed";

function useLocalStorage(key: string): [boolean, (v: boolean) => void] {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("storage", cb);
    return () => window.removeEventListener("storage", cb);
  }, []);
  const getSnapshot = () => localStorage.getItem(key) === "true";
  const getServerSnapshot = () => true;
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setValue = useCallback(
    (v: boolean) => {
      localStorage.setItem(key, String(v));
      window.dispatchEvent(new StorageEvent("storage"));
    },
    [key]
  );
  return [value, setValue];
}

// --- Context for tour visibility ---
const TourContext = createContext<{ open: () => void; nudge: boolean }>({ open: () => {}, nudge: false });

export function useTour() {
  return useContext(TourContext);
}

const steps = [
  {
    icon: Stethoscope,
    title: "PCP order entry",
    body: "Start here. A simulated EMR shows Tom Bauer's encounter note. Click \"Run Pathfinder\" to trigger a live AI analysis of the clinical text.",
    color: "var(--signal-primary)",
  },
  {
    icon: Brain,
    title: "Clinical reasoning",
    body: "See what the AI found. Evidence phrases from the note are highlighted with clinical signal explanations. Built for skeptical clinical informaticists.",
    color: "var(--positive)",
  },
  {
    icon: Activity,
    title: "Network intelligence",
    body: "The strategic surface. Capture rate, leakage by specialty, and a recommended action for the CMO. All numbers derived from 30 days of synthetic referral data.",
    color: "var(--warning)",
  },
];

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [dismissed, setDismissed] = useLocalStorage(STORAGE_KEY);
  const [manualOpen, setManualOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [nudge, setNudge] = useState(false);

  const visible = !dismissed || manualOpen;

  function dismiss() {
    setDismissed(true);
    setManualOpen(false);
    setNudge(true);
  }

  function open() {
    setStep(0);
    setManualOpen(true);
    setNudge(false);
  }

  const current = steps[step];
  const Icon = current?.icon;
  const isLast = step === steps.length - 1;

  return (
    <TourContext.Provider value={{ open, nudge }}>
      {children}
      {visible && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(15, 17, 21, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: 480,
              background: "var(--surface-raised)",
              border: "1px solid var(--border-default)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--ink-primary)",
                    color: "var(--surface-page)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stethoscope size={14} strokeWidth={1.75} />
                </div>
                <span style={{ font: "600 15px/20px var(--font-sans)", color: "var(--ink-primary)" }}>
                  Welcome to Pathfinder
                </span>
              </div>
              <button
                onClick={dismiss}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-muted)",
                  padding: 4,
                }}
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            <div style={{ padding: "0 24px" }}>
              <p style={{ font: "400 13px/20px var(--font-sans)", color: "var(--ink-muted)", margin: 0 }}>
                An AI-native referral routing prototype. Three views, one product.
              </p>
            </div>

            {/* Step content */}
            <div style={{ padding: "20px 24px" }}>
              <div
                style={{
                  padding: 20,
                  borderRadius: 8,
                  background: "var(--surface-sunken)",
                  border: "1px solid var(--border-divider)",
                  display: "flex",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: current.color,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ font: "600 14px/20px var(--font-sans)", color: "var(--ink-primary)" }}>
                      {current.title}
                    </span>
                    <Badge tone="neutral">
                      {step + 1} of {steps.length}
                    </Badge>
                  </div>
                  <p style={{ font: "400 13px/20px var(--font-sans)", color: "var(--ink-secondary)", margin: 0 }}>
                    {current.body}
                  </p>
                </div>
              </div>
            </div>

            {/* Step indicators + actions */}
            <div
              style={{
                padding: "12px 24px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {steps.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === step ? "var(--signal-primary)" : "var(--border-default)",
                      cursor: "pointer",
                      transition: "background var(--duration-fast)",
                    }}
                    onClick={() => setStep(i)}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {step > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {isLast ? (
                  <Button variant="primary" size="sm" icon={ArrowRight} onClick={dismiss}>
                    Start demo
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" iconRight={ArrowRight} onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </TourContext.Provider>
  );
}

/** Pulsing ? button for the top nav */
export function TourButton() {
  const { open } = useTour();
  return (
    <button
      onClick={open}
      className="op-focus"
      title="Product tour"
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "1px solid var(--border-default)",
        background: "var(--surface-raised)",
        color: "var(--signal-primary)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        animation: "pulse-ring 2s ease-out infinite",
      }}
    >
      <HelpCircle size={15} strokeWidth={1.75} />
    </button>
  );
}

// Keep default export for backwards compat (not used anymore)
export default function WelcomeTour() {
  return null;
}
