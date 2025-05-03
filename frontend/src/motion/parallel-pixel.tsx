"use client";
import { useEffect, useState } from "react";

interface ParallaxPixelProps {
  count?: number;
}

export function ParallaxPixel({ count = 15 }: ParallaxPixelProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const depth = 0.02 + Math.random() * 0.08;
        return (
          <div
            key={i}
            className="absolute w-6 h-6 bg-[#2c582c] opacity-30 shadow-lg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`,
              transform: `translate(${mousePosition.x * depth}px, ${mousePosition.y * depth}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}
