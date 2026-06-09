import { Record, ShieldCheck } from "@phosphor-icons/react";

export default function ConsentBadge() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 4px 16px rgba(27,67,50,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Record size={20} color="#86EFAC" weight="fill" />
          <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#86EFAC", fontWeight: 600 }}>
            RECORDING
          </span>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <ShieldCheck size={14} color="#86EFAC" weight="fill" />
          <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#86EFAC", fontWeight: 600 }}>
            Consent active
          </span>
        </div>
        <p style={{ fontFamily: "system-ui", fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5 }}>
          This consultation is being recorded for your personal care notes only. Please show this to your doctor.
        </p>
      </div>
    </div>
  );
}
