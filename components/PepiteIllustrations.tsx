"use client";
import React from "react";

/**
 * Two SVG illustrations used on the Pépite page.
 * They use currentColor so they respect the active accent color, and they
 * remain decorative (aria-hidden) — the surrounding copy carries the meaning.
 */

export function SnoozlyCapsuleIllustration({ color = "#FF96B3" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Illustration capsule Snoozly"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="capsuleStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <circle cx="200" cy="140" r="160" fill="url(#moonGlow)" />

      {/* ground line */}
      <line x1="40" y1="260" x2="360" y2="260" stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />

      {/* capsule pod silhouette */}
      <g>
        {/* outer shell */}
        <path
          d="M120 260 L120 130 Q120 60 200 60 Q280 60 280 130 L280 260 Z"
          fill="url(#capsuleGrad)"
          stroke="url(#capsuleStroke)"
          strokeWidth="1.5"
        />
        {/* inner padding line */}
        <path
          d="M138 250 L138 138 Q138 78 200 78 Q262 78 262 138 L262 250"
          fill="none"
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* opening seam */}
        <line x1="200" y1="78" x2="200" y2="250" stroke={color} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" />
      </g>

      {/* moon icon top right */}
      <g transform="translate(312, 70)">
        <circle r="18" fill={color} fillOpacity="0.18" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
        <path d="M -3 -7 A 9 9 0 1 0 5 7 A 11 11 0 0 1 -3 -7 Z" fill={color} fillOpacity="0.8" />
      </g>

      {/* small zZZ */}
      <g transform="translate(165, 165)" fontFamily="serif" fill={color} fillOpacity="0.7">
        <text x="0" y="0" fontSize="14">z</text>
        <text x="10" y="-8" fontSize="18">z</text>
        <text x="24" y="-18" fontSize="22">Z</text>
      </g>

      {/* base / feet */}
      <rect x="115" y="258" width="170" height="6" fill={color} fillOpacity="0.4" rx="2" />
    </svg>
  );
}

export function StudioNetworkIllustration({ color = "#FFA755" }: { color?: string }) {
  // 6 satellite nodes around a central studio node — represents the curated network
  const radius = 95;
  const cx = 200;
  const cy = 150;
  const nodeCount = 6;
  const nodes = Array.from({ length: nodeCount }).map((_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  });

  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Illustration réseau de spécialistes Rahnya Studio"
      className="w-full h-auto"
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient halo */}
      <circle cx={cx} cy={cy} r="140" fill="url(#centerGlow)" />

      {/* connection lines */}
      {nodes.map((n, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      ))}

      {/* satellite nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="20" fill="url(#nodeGlow)" />
          <circle
            cx={n.x}
            cy={n.y}
            r="11"
            fill={color}
            fillOpacity="0.15"
            stroke={color}
            strokeOpacity="0.65"
            strokeWidth="1.5"
          />
          {/* small dot inside satellite */}
          <circle cx={n.x} cy={n.y} r="3" fill={color} fillOpacity="0.7" />
        </g>
      ))}

      {/* central studio node */}
      <g>
        <circle cx={cx} cy={cy} r="32" fill={color} fillOpacity="0.18" />
        <circle cx={cx} cy={cy} r="22" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="2" />
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fontSize="14"
          fontFamily="sans-serif"
          fontWeight="600"
          fill="#fff"
        >
          R.S
        </text>
      </g>
    </svg>
  );
}
