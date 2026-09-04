"use client";

import { IncidentState } from "@/app/lib/store";

interface ConfidenceGaugeProps {
  confidence: number; // 0 - 100
  state?: IncidentState;
  size?: number;
}

export function ConfidenceGauge({
  confidence,
  state = "at-risk",
  size = 56
}: ConfidenceGaugeProps) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  let strokeColor = "#ffffff";
  if (state === "failed") strokeColor = "#a1a1aa";
  if (state === "at-risk") strokeColor = "#e4e4e7";

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size / 2 + 10 }}>
        <svg
          width={size}
          height={size / 2 + strokeWidth}
          className="overflow-visible"
        >
          {/* Background Frosted Glass Arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Active Confidence Stroke */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke 300ms ease"
            }}
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute bottom-0 text-center font-mono text-micro text-white font-semibold">
          {confidence}%
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">
        Confidence
      </span>
    </div>
  );
}
