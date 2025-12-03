export function ChartGradients() {
  return (
    <defs>
      {/* Original Gradients */}
      <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="colorPink" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1} />
      </linearGradient>

      {/* Keep existing gradients for backward compatibility */}
      <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FF8200" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#FF8200" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="gradientNeon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#00FFFF" stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="gradientSunset" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.1} />
      </linearGradient>

      {/* Neon Gradients */}
      <linearGradient id="colorNeonCyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="gradientElectricCyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="colorNeonPink" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FF10F0" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#FF10F0" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="gradientNeonPink" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FF10F0" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#FF10F0" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="colorNeonGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#39FF14" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#39FF14" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="gradientLaserGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#39FF14" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#39FF14" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="colorNeonViolet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#BF00FF" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#BF00FF" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="gradientElectricViolet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#BF00FF" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#BF00FF" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="colorNeonYellow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FFFF00" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#FFFF00" stopOpacity={0.2} />
      </linearGradient>
      <linearGradient id="gradientCyberYellow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FFFF00" stopOpacity={0.9} />
        <stop offset="95%" stopColor="#FFFF00" stopOpacity={0.2} />
      </linearGradient>

      {/* Glow Gradients */}
      <linearGradient id="colorGlowBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.95} />
        <stop offset="50%" stopColor="#0099CC" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.15} />
      </linearGradient>
      <linearGradient id="gradientPlasmaBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.95} />
        <stop offset="50%" stopColor="#0099CC" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.15} />
      </linearGradient>
      <linearGradient id="colorGlowPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D946EF" stopOpacity={0.95} />
        <stop offset="50%" stopColor="#A855F7" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#D946EF" stopOpacity={0.15} />
      </linearGradient>
      <linearGradient id="gradientAuroraPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D946EF" stopOpacity={0.95} />
        <stop offset="50%" stopColor="#A855F7" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#D946EF" stopOpacity={0.15} />
      </linearGradient>
      <linearGradient id="colorGlowRadio" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#84CC16" stopOpacity={0.95} />
        <stop offset="50%" stopColor="#65A30D" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#84CC16" stopOpacity={0.15} />
      </linearGradient>
      <linearGradient id="gradientRadioactive" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#84CC16" stopOpacity={0.95} />
        <stop offset="50%" stopColor="#65A30D" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#84CC16" stopOpacity={0.15} />
      </linearGradient>
    </defs>
  );
}
