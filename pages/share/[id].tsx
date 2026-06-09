import Layout from "@/components/Layout";
import { DEMO_RESPONSE } from "@/data/demoResponse";
import { GetServerSideProps } from "next";
import {
  Heart,
  Pill,
  CalendarCheck,
  TestTube,
  PersonSimpleWalk,
  ShieldCheck,
} from "@phosphor-icons/react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  // In a real app this would fetch from a DB. For the demo, only the known ID works.
  if (id !== DEMO_RESPONSE.shareId) {
    return { notFound: true };
  }
  return { props: { data: DEMO_RESPONSE } };
};

export default function ShareView({ data }: { data: typeof DEMO_RESPONSE }) {
  return (
    <Layout title={`Care update — ${data.patientName}`}>
      <div style={{ paddingTop: 32, maxWidth: 600, margin: "0 auto" }}>
        {/* Header */}
        <div className="card-skeuo paper-surface reveal" style={{ padding: "22px 24px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <ShieldCheck size={16} color="#2D6A4F" weight="fill" />
            <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#2D6A4F", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Caregiver summary — read only
            </span>
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "var(--forest-600)", margin: "0 0 6px" }}>
            {data.patientName}
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: 13, color: "var(--text-muted)", margin: "0 0 14px" }}>
            {data.doctorName} · {data.clinic} · {data.visitDate}
          </p>
          <p style={{ fontFamily: "system-ui", fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.7, background: "rgba(45,106,79,0.06)", borderRadius: 10, padding: "12px 16px", border: "1px solid rgba(45,106,79,0.12)" }}>
            {data.caregiverNote}
          </p>
        </div>

        {/* Medications */}
        <section style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Pill size={18} color="#2D6A4F" weight="duotone" />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "var(--forest-600)", margin: 0 }}>
              Medications prescribed
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.medications.map((med) => (
              <div key={med.name} className="card-skeuo paper-surface" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 16,
                    borderRadius: 8,
                    background: med.color,
                    flexShrink: 0,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.3)", transform: "translateX(-50%)" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "var(--forest-600)", margin: "0 0 2px" }}>
                    {med.name} {med.dose}
                  </p>
                  <p style={{ fontFamily: "system-ui", fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                    {med.frequency} · {med.times.join(", ")} {med.withFood ? "· with food" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Follow-ups */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <CalendarCheck size={18} color="#2D6A4F" weight="duotone" />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "var(--forest-600)", margin: 0 }}>
              What needs to happen
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.followUps.map((f) => (
              <div key={f.task} className="card-skeuo paper-surface" style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ color: "var(--forest-600)", paddingTop: 1 }}>
                  {f.task.toLowerCase().includes("blood") ? <TestTube size={16} weight="duotone" /> : <PersonSimpleWalk size={16} weight="duotone" />}
                </div>
                <div>
                  <p style={{ fontFamily: "system-ui", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px" }}>
                    {f.task}
                  </p>
                  <p style={{ fontFamily: "system-ui", fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                    {f.dueIn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: "center", padding: "16px 0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Heart size={14} color="#2D6A4F" weight="fill" />
            <p style={{ fontFamily: "system-ui", fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
              Shared via CareSync AI · Not a medical device
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
