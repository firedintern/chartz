export const colorSchemes = {
  gradient1: {
    name: "Ocean Blue",
    stroke: "#3B82F6",
    fill: "url(#colorBlue)",
    background: (theme) => (theme === "dark" ? "#1A1A1A" : "#FFFFFF"),
  },
  gradient2: {
    name: "Forest Green",
    stroke: "#10B981",
    fill: "url(#colorGreen)",
    background: (theme) => (theme === "dark" ? "#1A1A1A" : "#FFFFFF"),
  },
  gradient3: {
    name: "Sunset Orange",
    stroke: "#F59E0B",
    fill: "url(#colorOrange)",
    background: (theme) => (theme === "dark" ? "#1A1A1A" : "#FFFFFF"),
  },
  gradient4: {
    name: "Royal Purple",
    stroke: "#8B5CF6",
    fill: "url(#colorPurple)",
    background: (theme) => (theme === "dark" ? "#1A1A1A" : "#FFFFFF"),
  },
  gradient5: {
    name: "Rose Pink",
    stroke: "#EC4899",
    fill: "url(#colorPink)",
    background: (theme) => (theme === "dark" ? "#1A1A1A" : "#FFFFFF"),
  },
  electricCyan: {
    name: "Electric Cyan",
    stroke: "#00E5FF",
    fill: "url(#colorNeonCyan)",
    background: (theme) => (theme === "dark" ? "#0A0A0A" : "#FFFFFF"),
  },
  neonPink: {
    name: "Neon Pink",
    stroke: "#FF10F0",
    fill: "url(#colorNeonPink)",
    background: (theme) => (theme === "dark" ? "#0A0A0A" : "#FFFFFF"),
  },
  laserGreen: {
    name: "Laser Green",
    stroke: "#39FF14",
    fill: "url(#colorNeonGreen)",
    background: (theme) => (theme === "dark" ? "#0A0A0A" : "#FFFFFF"),
  },
  electricViolet: {
    name: "Electric Violet",
    stroke: "#BF00FF",
    fill: "url(#colorNeonViolet)",
    background: (theme) => (theme === "dark" ? "#0A0A0A" : "#FFFFFF"),
  },
  cyberYellow: {
    name: "Cyber Yellow",
    stroke: "#FFFF00",
    fill: "url(#colorNeonYellow)",
    background: (theme) => (theme === "dark" ? "#0A0A0A" : "#FFFFFF"),
  },
  plasmaBlue: {
    name: "Plasma Blue",
    stroke: "#00D4FF",
    fill: "url(#colorGlowBlue)",
    background: (theme) => (theme === "dark" ? "#001F3F" : "#F0F9FF"),
  },
  auroraPurple: {
    name: "Aurora Purple",
    stroke: "#D946EF",
    fill: "url(#colorGlowPurple)",
    background: (theme) => (theme === "dark" ? "#1F0A3F" : "#FAF5FF"),
  },
  radioactive: {
    name: "Radioactive",
    stroke: "#84CC16",
    fill: "url(#colorGlowRadio)",
    background: (theme) => (theme === "dark" ? "#1A2E05" : "#F7FEE7"),
  },
};

export function getColorScheme(schemeName, theme) {
  const scheme = colorSchemes[schemeName] || colorSchemes.gradient1;
  return {
    stroke: scheme.stroke,
    fill: scheme.fill,
    background:
      typeof scheme.background === "function"
        ? scheme.background(theme)
        : scheme.background,
  };
}
