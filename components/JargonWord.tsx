import { useState, useRef, useEffect } from "react";
import { JargonTerm } from "@/lib/types";
import { X, Lightbulb } from "@phosphor-icons/react";

interface JargonWordProps {
  term: JargonTerm;
}

export default function JargonWord({ term }: JargonWordProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline" }}>
      <span className="jargon-word" onClick={() => setOpen(!open)}>
        {term.term}
      </span>
      {open && (
        <span
          className="jargon-tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: 280,
            padding: "14px 16px",
            zIndex: 100,
            display: "block",
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              padding: 2,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Close tooltip"
          >
            <X size={12} color="rgba(255,255,255,0.7)" />
          </button>
          <p style={{ fontFamily: "system-ui", fontSize: 11, color: "#86EFAC", fontWeight: 600, margin: "0 0 4px" }}>
            {term.term}
          </p>
          <p style={{ fontFamily: "system-ui", fontSize: 13, color: "white", fontWeight: 600, margin: "0 0 8px" }}>
            {term.plain}
          </p>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
            <Lightbulb size={14} color="#FCD34D" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: "system-ui", fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>
              {term.analogy}
            </p>
          </div>
          <span
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 12,
              height: 12,
              background: "#081C15",
              border: "1px solid rgba(255,255,255,0.1)",
              borderTop: "none",
              borderLeft: "none",
              rotate: "45deg",
            }}
          />
        </span>
      )}
    </span>
  );
}
