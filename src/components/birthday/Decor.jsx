import { useEffect, useState } from "react";

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

const balloonColors = [
  "oklch(0.86 0.12 350)", // Rose pink
  "oklch(0.85 0.11 310)", // Lavender
  "oklch(0.92 0.08 340)", // Soft blush
  "oklch(0.84 0.13 325)", // Radiant magenta
  "oklch(0.88 0.12 85)", // Golden glow
];

const rand = (seed, min, max) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return Number((min + (x - Math.floor(x)) * (max - min)).toFixed(2));
};

export function FloatingBalloons({ count = 12 }) {
  if (!useMounted()) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${rand(i + 1, 2, 94)}%`,
            width: `${rand(i + 3, 24, 52)}px`,
            height: `${rand(i + 3, 32, 65)}px`,
            borderRadius: "50% 50% 45% 45%",
            background: `radial-gradient(circle at 35% 28%, oklch(1 0 0 / 0.8), ${
              balloonColors[i % balloonColors.length]
            })`,
            opacity: 0.65,
            filter: "drop-shadow(0 8px 16px rgba(232, 62, 140, 0.15))",
            animation: `rise ${rand(i + 7, 18, 32)}s linear ${rand(i + 9, 0, 15)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingPetalsAndHearts({ count = 18 }) {
  if (!useMounted()) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => {
        const isHeart = i % 2 === 0;
        return (
          <span
            key={`petal-${i}`}
            className="absolute block select-none"
            style={{
              left: `${rand(i + 42, 1, 98)}%`,
              top: `-5%`,
              fontSize: `${rand(i + 15, 14, 28)}px`,
              opacity: rand(i + 22, 0.4, 0.85),
              filter: "drop-shadow(0 4px 8px rgba(214, 51, 132, 0.2))",
              animation: `petal-fall ${rand(i + 33, 12, 24)}s ease-in-out ${rand(i + 44, 0, 10)}s infinite`,
            }}
          >
            {isHeart ? "💖" : i % 4 === 1 ? "🌸" : "✨"}
          </span>
        );
      })}
    </div>
  );
}

export function Sparkles({ count = 28 }) {
  if (!useMounted()) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary animate-twinkle"
          style={{
            left: `${rand(i + 21, 1, 98)}%`,
            top: `${rand(i + 31, 2, 96)}%`,
            width: `${rand(i + 41, 3, 9)}px`,
            height: `${rand(i + 41, 3, 9)}px`,
            boxShadow: "0 0 10px oklch(0.72 0.18 350 / 0.8)",
            animationDelay: `${rand(i + 51, 0, 3.5)}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Confetti({ active }) {
  if (!active) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 85 }).map((_, i) => {
        const shapes = ["💖", "✨", "🌸", "⭐", "🎉"];
        const useSymbol = i % 4 === 0;
        return (
          <span
            key={i}
            className="absolute block select-none"
            style={{
              left: `${rand(i + 61, 0, 100)}%`,
              width: useSymbol ? "auto" : `${rand(i + 71, 7, 14)}px`,
              height: useSymbol ? "auto" : `${rand(i + 81, 9, 18)}px`,
              fontSize: useSymbol ? `${rand(i + 5, 14, 24)}px` : "auto",
              borderRadius: i % 3 === 0 ? "50%" : "3px",
              background: useSymbol ? "transparent" : balloonColors[i % balloonColors.length],
              animation: `fall ${rand(i + 91, 3, 6.5)}s linear ${rand(i + 101, 0, 2)}s infinite`,
            }}
          >
            {useSymbol ? shapes[i % shapes.length] : ""}
          </span>
        );
      })}
    </div>
  );
}
