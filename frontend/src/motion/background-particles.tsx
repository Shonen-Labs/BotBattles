// ✅ Background particles
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary-green rounded-full opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatParticle ${
              5 + Math.random() * 10
            }s infinite ease-in-out ${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};
export default AnimatedBackground;

