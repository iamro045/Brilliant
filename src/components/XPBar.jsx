import { useXP } from "../context/XPContext";

const XPBar = () => {
  const { level, currentLevelXp } = useXP();

  return (
    <div style={{ minWidth: "160px" }}>
      <div style={{ fontSize: "0.8rem" }}>
        Level {level}
      </div>

      <div
        style={{
          background: "#444",
          height: "8px",
          borderRadius: "4px",
          overflow: "hidden",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            width: `${currentLevelXp}%`,
            background: "#facc15",
            height: "100%",
          }}
        />
      </div>

      <div style={{ fontSize: "0.7rem" }}>
        {currentLevelXp} / 100 XP
      </div>
    </div>
  );
};

export default XPBar;
