"use client";

import { useState, useEffect, useRef } from "react";

const PASSCODE = "5118";
const GATE_ENABLED = process.env.NEXT_PUBLIC_PASSCODE_ENABLED === "true";

export default function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(!GATE_ENABLED);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("site-unlocked");
      if (stored === "true") setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) inputRefs.current[0]?.focus();
  }, [unlocked]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const code = newDigits.join("");
    if (code.length === 4 && newDigits.every((d) => d !== "")) {
      if (code === PASSCODE) {
        sessionStorage.setItem("site-unlocked", "true");
        setUnlocked(true);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 500);
      }
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      const newDigits = pasted.split("");
      setDigits(newDigits);
      if (pasted === PASSCODE) {
        sessionStorage.setItem("site-unlocked", "true");
        setUnlocked(true);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 500);
      }
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl font-bold tracking-widest uppercase mb-2">
          Enter Access Code
        </h1>
        <p className="text-white/40 text-sm mb-8 tracking-wide">
          This site is currently invite-only.
        </p>

        <div
          className={`flex gap-4 justify-center ${shake ? "animate-shake" : ""}`}
          onPaste={handlePaste}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-16 h-20 text-center text-3xl font-bold text-white bg-transparent border border-[#333] rounded-xl focus:border-[#e63946] focus:outline-none transition-colors"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
