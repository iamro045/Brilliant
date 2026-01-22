import "./XPBar.css";

const XPBar = () => {
  const currentXP = 0;
  const maxXP = 100;

  return (
    <div className="xpbar">
      <span className="xp-label">Level 1</span>
      <div className="xp-track">
        <div
          className="xp-fill"
          style={{ width: `${(currentXP / maxXP) * 100}%` }}
        />
      </div>
      <span className="xp-value">
        {currentXP}/{maxXP} XP
      </span>
    </div>
  );
};

export default XPBar;
