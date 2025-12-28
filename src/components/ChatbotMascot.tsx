import { useEffect } from "react";

type Props = {
  speaking: boolean;
  message?: string;
  onDone?: () => void;
  durationMs?: number;
};

export default function ChatbotMascot({
  speaking,
  message,
  onDone,
  durationMs = 2500,
}: Props) {
  useEffect(() => {
    if (!speaking) return;
    const t = window.setTimeout(() => onDone?.(), durationMs);
    return () => window.clearTimeout(t);
  }, [speaking, durationMs, onDone]);

  return (
    <div
      className="pointer-events-none absolute bottom-5 right-5 select-none"
      style={{
        width: 112,
        height: 112,
      }}
    >
      {/* Speech bubble – upper left of mascot */}
      {speaking && message && (
        <div
          className="absolute bottom-full left-0 mb-3 max-w-[280px]"
          style={{
            transform: "translateX(-35%)",
          }}
        >
          <div
            className="rounded-xl border border-white/10 px-3 py-2 text-sm"
            style={{
              background: "rgba(24, 26, 32, 0.92)",
              boxShadow: "0 0 18px rgba(96, 165, 250, 0.22)",
            }}
          >
            {message}
          </div>

          {/* bubble tail */}
          <div
            className="absolute right-6 top-full h-0 w-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "12px solid rgba(24, 26, 32, 0.92)",
              filter: "drop-shadow(0 2px 0 rgba(255,255,255,0.06))",
            }}
          />
        </div>
      )}

      {/* Mascot image (fixed position) */}
      <img
        src={speaking ? "/chat_bot_maskot.png" : "/chatbot_open.png"}
        alt="Chatbot"
        className="absolute bottom-0 right-0 h-28 w-28 opacity-95"
        draggable={false}
      />
    </div>
  );
}
