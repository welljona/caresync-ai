import Head from "next/head";
import { ReactNode } from "react";
import { Heart } from "@phosphor-icons/react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "CareSync AI" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen" style={{ background: "var(--cream-100)" }}>
        <nav
          style={{
            background: "linear-gradient(180deg, #FDFCF8 0%, #F4F0E6 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
          className="sticky top-0 z-50"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                style={{
                  background: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)",
                  borderRadius: 10,
                  padding: "6px 8px",
                  boxShadow: "0 2px 6px rgba(45,106,79,0.3)",
                }}
              >
                <Heart size={18} color="white" weight="fill" />
              </div>
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--forest-600)",
                  letterSpacing: "-0.02em",
                }}
              >
                CareSync AI
              </span>
            </div>
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 12,
                color: "var(--text-muted)",
                background: "rgba(45,106,79,0.08)",
                padding: "3px 10px",
                borderRadius: 20,
                border: "1px solid rgba(45,106,79,0.15)",
              }}
            >
              Demo
            </span>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 pb-16">{children}</main>
        <footer
          style={{
            borderTop: "1px solid rgba(0,0,0,0.06)",
            padding: "24px 16px",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          CareSync AI — Not a medical device. Always follow your doctor&apos;s instructions.
        </footer>
      </div>
    </>
  );
}
