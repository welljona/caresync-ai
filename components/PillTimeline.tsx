import { useState } from "react";
import { Medication } from "@/lib/types";
import { Check, ForkKnife, Coffee, Sun, Moon } from "@phosphor-icons/react";

interface PillTimelineProps {
  medications: Medication[];
}

function timeIcon(time: string) {
  const t = time.toLowerCase();
  if (t.includes("breakfast") || t.includes("morning")) return <Coffee size={14} />;
  if (t.includes("dinner") || t.includes("evening") || t.includes("night")) return <Moon size={14} />;
  if (t.includes("any")) return <Sun size={14} />;
  return <ForkKnife size={14} />;
}

export default function PillTimeline({ medications: initial }: PillTimelineProps) {
  const [meds, setMeds] = useState(initial);

  function toggle(medIdx: number, timeIdx: number) {
    setMeds((prev) => {
      const next = prev.map((m, mi) => {
        if (mi !== medIdx) return m;
        const taken = [...m.taken];
        taken[timeIdx] = !taken[timeIdx];
        return { ...m, taken };
      });
      return next;
    });
  }

  const totalDoses = meds.reduce((s, m) => s + m.taken.length, 0);
  const takenDoses = meds.reduce((s, m) => s + m.taken.filter(Boolean).length, 0);
  const pct = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "system-ui", fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
            Today&apos;s doses
          </span>
          <span style={{ fontFamily: "system-ui", fontSize: 13, fontWeight: 600, color: "var(--forest-600)" }}>
            {takenDoses} / {totalDoses} taken
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: "rgba(0,0,0,0.08)",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "linear-gradient(90deg, #2D6A4F 0%, #4A9E7A 100%)",
              borderRadius: 4,
              transition: "width 0.4s ease",
              boxShadow: "0 1px 0 rgba(255,255,255,0.3) inset",
            }}
          />
        </div>
      </div>

      {/* Medication cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {meds.map((med, mi) => (
          <div
            key={med.name}
            className="card-skeuo paper-surface"
            style={{ padding: "16px 20px" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Pill icon */}
                  <div
                    style={{
                      width: 32,
                      height: 14,
                      borderRadius: 7,
                      background: med.color,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: 1,
                        background: "rgba(255,255,255,0.3)",
                        transform: "translateX(-50%)",
                      }}
                    />
                  </div>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "var(--forest-600)" }}>
                    {med.name}
                  </span>
                </div>
                <p style={{ fontFamily: "system-ui", fontSize: 13, color: "var(--text-muted)", margin: "4px 0 0 42px" }}>
                  {med.dose} · {med.frequency}
                </p>
              </div>
              {med.withFood && (
                <span
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 11,
                    background: "rgba(45,106,79,0.08)",
                    color: "var(--forest-600)",
                    border: "1px solid rgba(45,106,79,0.2)",
                    borderRadius: 6,
                    padding: "3px 8px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  With food
                </span>
              )}
            </div>

            {/* Time slots */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {med.times.map((time, ti) => (
                <button
                  key={time}
                  onClick={() => toggle(mi, ti)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    border: "1px solid",
                    borderColor: med.taken[ti] ? "transparent" : "rgba(0,0,0,0.1)",
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: med.taken[ti]
                      ? "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(240,236,226,0.6) 100%)",
                    boxShadow: med.taken[ti]
                      ? "0 2px 6px rgba(45,106,79,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
                      : "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                  }}
                >
                  <span style={{ color: med.taken[ti] ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                    {timeIcon(time)}
                  </span>
                  <span
                    style={{
                      fontFamily: "system-ui",
                      fontSize: 13,
                      fontWeight: 500,
                      color: med.taken[ti] ? "white" : "var(--text-secondary)",
                    }}
                  >
                    {time}
                  </span>
                  {med.taken[ti] && (
                    <div
                      className="check-done"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={10} color="white" weight="bold" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p style={{ fontFamily: "system-ui", fontSize: 12, color: "var(--text-muted)", margin: "10px 0 0", lineHeight: 1.5 }}>
              {med.duration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
