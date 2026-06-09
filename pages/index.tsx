import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ConsentBadge from "@/components/ConsentBadge";
import {
  Waveform,
  ArrowRight,
  Stethoscope,
  Pill,
  BookOpen,
  UsersThree,
  ShieldCheck,
} from "@phosphor-icons/react";

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card-skeuo paper-surface" style={{ padding: "24px 22px" }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          boxShadow:
            "0 3px 8px rgba(27,67,50,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 17,
          fontWeight: 700,
          color: "var(--forest-600)",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          color: "var(--text-secondary)",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [stepLabel, setStepLabel] = useState("Reading transcript...");

  const processingSteps = [
    "Reading transcript...",
    "Extracting medications...",
    "Building your timeline...",
    "Translating medical terms...",
  ];

  useEffect(() => {
    if (step !== 2) return;

    let i = 0;
    const labelInterval = setInterval(() => {
      i = (i + 1) % processingSteps.length;
      setStepLabel(processingSteps[i]);
    }, 550);

    const navTimeout = setTimeout(() => {
      clearInterval(labelInterval);
      router.push("/dashboard");
    }, 2400);

    return () => {
      clearInterval(labelInterval);
      clearTimeout(navTimeout);
    };
  }, [step, router]);

  function handleDemoClick() {
    if (step === 0) {
      setStep(1);
    }
  }

  function handleConfirmClick() {
    setStep(2);
  }

  return (
    <Layout title="CareSync AI — Your post-consultation companion">
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "60px 0 48px" }}>
        {/* Trust badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(45,106,79,0.08)",
            border: "1px solid rgba(45,106,79,0.2)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: 24,
          }}
        >
          <ShieldCheck size={14} color="#2D6A4F" weight="fill" />
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 12,
              color: "var(--forest-600)",
              fontWeight: 500,
            }}
          >
            Patient-first · No diagnosis · Always consult your doctor
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(32px, 6vw, 54px)",
            fontWeight: 700,
            color: "var(--forest-600)",
            lineHeight: 1.15,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          Never leave a<br />
          consultation confused.
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 19px)",
            color: "var(--text-secondary)",
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          CareSync AI turns your doctor visit into a clear, personal care
          dashboard — with your medications, follow-ups, and medical terms
          explained in plain language.
        </p>

        {/* Step 0: initial CTA */}
        {step === 0 && (
          <button
            className="btn-primary"
            style={{
              padding: "14px 32px",
              fontSize: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
            onClick={handleDemoClick}
          >
            <Waveform size={20} color="white" />
            Try the demo consultation
            <ArrowRight size={18} color="rgba(255,255,255,0.8)" />
          </button>
        )}

        {/* Step 1: consent screen */}
        {step === 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <ConsentBadge />
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setStep(0)}
                style={{
                  padding: "11px 24px",
                  fontSize: 14,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 500,
                  background: "transparent",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 10,
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                style={{
                  padding: "11px 28px",
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onClick={handleConfirmClick}
              >
                Doctor has seen this — process
                <ArrowRight size={16} color="white" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: processing spinner */}
        {step === 2 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "3px solid rgba(45,106,79,0.15)",
                borderTopColor: "#2D6A4F",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 14,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {stepLabel}
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </section>

      {/* Feature cards */}
      <section style={{ paddingBottom: 48 }}>
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text-muted)",
            textAlign: "center",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          What CareSync builds for you
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <FeatureCard
            icon={<Pill size={22} color="white" weight="duotone" />}
            title="Pill timeline"
            desc="Every medication, dose, and time of day shown clearly. Tap to mark as taken."
          />
          <FeatureCard
            icon={<BookOpen size={22} color="white" weight="duotone" />}
            title="Jargon buster"
            desc="Medical words highlighted and explained with plain-language analogies."
          />
          <FeatureCard
            icon={<Stethoscope size={22} color="white" weight="duotone" />}
            title="Follow-up tracker"
            desc="Tests, appointments and lifestyle tasks extracted and saved to your calendar."
          />
          <FeatureCard
            icon={<UsersThree size={22} color="white" weight="duotone" />}
            title="Caregiver share"
            desc="Share a read-only summary with a family member via a private link."
          />
        </div>
      </section>

      {/* Disclaimer */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(45,106,79,0.06) 0%, rgba(27,67,50,0.04) 100%)",
          border: "1px solid rgba(45,106,79,0.15)",
          borderRadius: 16,
          padding: "20px 24px",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
            color: "var(--text-secondary)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          CareSync AI does not diagnose, prescribe, or replace your doctor. It
          only translates what your doctor already told you into a format you
          can act on. Always follow your doctor&apos;s instructions.
        </p>
      </div>
    </Layout>
  );
}
