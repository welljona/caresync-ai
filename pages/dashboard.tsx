import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import PillTimeline from "@/components/PillTimeline";
import FollowUpCard from "@/components/FollowUpCard";
import JargonWord from "@/components/JargonWord";
import { DEMO_RESPONSE } from "@/data/demoResponse";
import { JargonTerm } from "@/lib/types";
import {
  Stethoscope,
  Pill,
  BookOpen,
  CalendarCheck,
  UsersThree,
  ArrowUpRight,
  Copy,
  Check,
} from "@phosphor-icons/react";

const TABS = [
  { id: "summary", label: "Summary", icon: <Stethoscope size={16} weight="duotone" /> },
  { id: "medications", label: "Medications", icon: <Pill size={16} weight="duotone" /> },
  { id: "jargon", label: "Jargon buster", icon: <BookOpen size={16} weight="duotone" /> },
  { id: "followups", label: "Follow-ups", icon: <CalendarCheck size={16} weight="duotone" /> },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

// Render summary text with jargon terms highlighted inline
function SummaryText({ text, terms }: { text: string; terms: JargonTerm[] }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let foundTerm: JargonTerm | null = null;

    for (const t of terms) {
      const idx = remaining.toLowerCase().indexOf(t.term.toLowerCase());
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        foundTerm = t;
      }
    }

    if (!foundTerm || earliest === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (earliest > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, earliest)}</span>);
    }
    parts.push(<JargonWord key={key++} term={foundTerm} />);
    remaining = remaining.slice(earliest + foundTerm.term.length);
  }

  return <>{parts}</>;
}

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("summary");
  const [copied, setCopied] = useState(false);
  const d = DEMO_RESPONSE;
  useReveal();

  function copyShareLink() {
    const url = `${window.location.origin}/share/${d.shareId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Layout title={`CareSync — ${d.patientName}`}>
      {/* Patient header */}
      <div className="reveal" style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div
          className="card-skeuo paper-surface"
          style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
        >
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: 12, color: "var(--text-muted)", margin: "0 0 6px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Consultation summary
            </p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: "var(--forest-600)", margin: "0 0 4px" }}>
              {d.patientName}
            </h1>
            <p style={{ fontFamily: "system-ui", fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
              {d.doctorName} · {d.clinic} · {d.visitDate}
            </p>
            <div
              style={{
                display: "inline-block",
                marginTop: 10,
                fontFamily: "Georgia, serif",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--forest-600)",
                background: "rgba(45,106,79,0.08)",
                border: "1px solid rgba(45,106,79,0.2)",
                borderRadius: 8,
                padding: "4px 12px",
              }}
            >
              {d.diagnosis}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={copyShareLink}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "system-ui",
                fontSize: 13,
                fontWeight: 500,
                padding: "9px 16px",
                background: copied
                  ? "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)"
                  : "linear-gradient(180deg, #FDFCF8 0%, #EEE9DA 100%)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 10,
                cursor: "pointer",
                color: copied ? "white" : "var(--text-secondary)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                transition: "all 0.2s ease",
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Share with family"}
            </button>
            <a
              href={`/share/${d.shareId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "system-ui",
                fontSize: 13,
                color: "var(--text-muted)",
                padding: "9px 12px",
                background: "linear-gradient(180deg, #FDFCF8 0%, #EEE9DA 100%)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="reveal"
        style={{
          background: "linear-gradient(180deg, #EEE9DA 0%, #DDD5C0 100%)",
          borderRadius: 14,
          padding: 5,
          display: "flex",
          gap: 4,
          marginBottom: 24,
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8)",
          overflowX: "auto",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="reveal">

        {activeTab === "summary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Diagnosis plain */}
            <div className="card-skeuo paper-surface" style={{ padding: "22px 24px" }}>
              <p style={{ fontFamily: "system-ui", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 10px" }}>
                What your doctor found
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 17, color: "var(--text-primary)", margin: 0, lineHeight: 1.7 }}>
                <SummaryText text={d.diagnosisPlain} terms={d.jargon} />
              </p>
            </div>
            {/* Full summary */}
            <div className="card-skeuo paper-surface" style={{ padding: "22px 24px" }}>
              <p style={{ fontFamily: "system-ui", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 10px" }}>
                Full summary
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "var(--text-secondary)", margin: 0, lineHeight: 1.8 }}>
                <SummaryText text={d.summary} terms={d.jargon} />
              </p>
            </div>
            {/* Tip */}
            <div style={{ background: "rgba(45,106,79,0.06)", border: "1px solid rgba(45,106,79,0.15)", borderRadius: 12, padding: "14px 18px" }}>
              <p style={{ fontFamily: "system-ui", fontSize: 13, color: "var(--forest-600)", margin: 0, lineHeight: 1.6 }}>
                Tap any <span className="jargon-word" style={{ cursor: "default" }}>underlined word</span> in the text to see a plain-language explanation.
              </p>
            </div>
          </div>
        )}

        {activeTab === "medications" && (
          <PillTimeline medications={d.medications} />
        )}

        {activeTab === "jargon" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {d.jargon.map((term) => (
              <div key={term.term} className="card-skeuo paper-surface" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: "var(--forest-600)" }}>
                    {term.term}
                  </span>
                  <span
                    style={{
                      fontFamily: "system-ui",
                      fontSize: 12,
                      color: "var(--text-muted)",
                      background: "rgba(0,0,0,0.05)",
                      borderRadius: 4,
                      padding: "2px 8px",
                      border: "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    {term.plain}
                  </span>
                </div>
                <p style={{ fontFamily: "system-ui", fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
                  {term.analogy}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "followups" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {d.followUps.map((f) => (
              <FollowUpCard key={f.task} followUp={f} />
            ))}
            {/* Share CTA */}
            <div
              className="card-skeuo paper-surface"
              style={{ padding: "20px 22px", borderLeft: "3px solid #2D6A4F", borderRadius: "0 16px 16px 0" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <UsersThree size={18} color="#2D6A4F" weight="duotone" />
                <p style={{ fontFamily: "system-ui", fontSize: 13, fontWeight: 600, color: "var(--forest-600)", margin: 0 }}>
                  Share with a family caregiver
                </p>
              </div>
              <p style={{ fontFamily: "system-ui", fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px", lineHeight: 1.5 }}>
                {d.caregiverNote}
              </p>
              <button
                onClick={copyShareLink}
                className="btn-primary"
                style={{ padding: "9px 20px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Link copied!" : "Copy caregiver link"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
