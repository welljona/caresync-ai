import { FollowUp } from "@/lib/types";
import { CalendarPlus, TestTube, PersonSimpleWalk, ForkKnife } from "@phosphor-icons/react";

function taskIcon(task: string) {
  const t = task.toLowerCase();
  if (t.includes("visit") || t.includes("return") || t.includes("appointment")) return <CalendarPlus size={20} weight="duotone" />;
  if (t.includes("blood") || t.includes("test") || t.includes("lab")) return <TestTube size={20} weight="duotone" />;
  if (t.includes("walk") || t.includes("exercise")) return <PersonSimpleWalk size={20} weight="duotone" />;
  if (t.includes("diet") || t.includes("food") || t.includes("salt") || t.includes("dietary")) return <ForkKnife size={20} weight="duotone" />;
  return <CalendarPlus size={20} weight="duotone" />;
}

function downloadICS(followUp: FollowUp) {
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const start = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const dtStart = start.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtEnd = new Date(start.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CareSync AI//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@caresync-ai`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${followUp.calendarTitle}`,
    `DESCRIPTION:${followUp.task} — added by CareSync AI`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${followUp.calendarTitle.replace(/\s+/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const badgeClass: Record<string, string> = {
  urgent: "badge-urgent",
  important: "badge-important",
  routine: "badge-routine",
};

const badgeLabel: Record<string, string> = {
  urgent: "Urgent",
  important: "Important",
  routine: "Routine",
};

export default function FollowUpCard({ followUp }: { followUp: FollowUp }) {
  return (
    <div
      className="card-skeuo paper-surface"
      style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "linear-gradient(135deg, #EEE9DA 0%, #DDD5C0 100%)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--forest-600)",
          flexShrink: 0,
        }}
      >
        {taskIcon(followUp.task)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>
            {followUp.task}
          </p>
          <span
            className={badgeClass[followUp.urgency]}
            style={{ fontFamily: "system-ui", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}
          >
            {badgeLabel[followUp.urgency]}
          </span>
        </div>
        <p style={{ fontFamily: "system-ui", fontSize: 13, color: "var(--text-muted)", margin: "0 0 10px" }}>
          {followUp.dueIn}
        </p>
        <button
          onClick={() => downloadICS(followUp)}
          style={{
            fontFamily: "system-ui",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--forest-600)",
            background: "rgba(45,106,79,0.08)",
            border: "1px solid rgba(45,106,79,0.2)",
            borderRadius: 6,
            padding: "5px 12px",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseOver={(e) => ((e.target as HTMLElement).style.background = "rgba(45,106,79,0.14)")}
          onMouseOut={(e) => ((e.target as HTMLElement).style.background = "rgba(45,106,79,0.08)")}
        >
          + Add to calendar
        </button>
      </div>
    </div>
  );
}
