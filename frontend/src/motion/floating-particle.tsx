"use client";

export function FloatingParticles({ count = 50 }: { count?: number }) {
  return (
    <div className="absolute inset-0 z-0">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary-green rounded-full opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatParticle ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}