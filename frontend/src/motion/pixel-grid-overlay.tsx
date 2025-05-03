"use client";

export function PixelGridOverlay() {
  return (
    <div
      className="absolute inset-0 z-0 opacity-10"
      style={{
        backgroundImage:
          "linear-gradient(#3c6e3c 1px, transparent 1px), linear-gradient(90deg, #3c6e3c 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />
  );
}
