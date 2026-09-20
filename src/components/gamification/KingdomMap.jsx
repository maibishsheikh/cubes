// src/components/gamification/KingdomMap.jsx
import React from 'react';
import './KingdomMap.css';
import { calcStars } from '../../utils/scoring.js';

// Crisp custom SVGs matching the reference styling
function BicycleIcon({ className = "w-8 h-7 text-[#4ade80]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '32px', height: '28px', color: '#4ade80' }}>
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L8.5 9H12l3 5 3.5-6H16" />
      <path d="M12 17.5V14l-2.5-2.5" />
    </svg>
  );
}

function GoldLockIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ width: '28px', height: '28px', display: 'inline-block' }}>
      <path
        d="M6.5 10V6.5C6.5 3.46 8.96 1 12 1C15.04 1 17.5 3.46 17.5 6.5V10"
        stroke="#cf9b4a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="9.5"
        width="16"
        height="13.5"
        rx="2.5"
        fill="#b37c2d"
        stroke="#e5b45f"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="15" r="1.3" fill="#3d2204" />
      <path d="M12 16.3V18.8" stroke="#3d2204" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PizzaIcon({ className = "w-7 h-7 text-amber-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#fbbf24' }}>
      <path d="M12 2L2 22h20L12 2z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="9" cy="17" r="1.5" fill="currentColor" />
      <circle cx="15" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className = "w-7 h-7 text-indigo-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#818cf8' }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FerrisWheelIcon({ className = "w-7 h-7 text-pink-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#f472b6' }}>
      <circle cx="12" cy="11" r="8" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 3v16" />
      <path d="M4 11h16" />
      <path d="M6.3 5.3l11.4 11.4" />
      <path d="M17.7 5.3L6.3 16.7" />
      <path d="M8 21l4-2 4 2" />
    </svg>
  );
}

function TrackIcon({ className = "w-7 h-7 text-purple-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#c084fc' }}>
      <rect x="3" y="6" width="18" height="12" rx="6" />
      <line x1="9" y1="6" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="18" />
    </svg>
  );
}

function CoinIcon({ className = "w-7 h-7 text-yellow-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#facc15' }}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h2v4H7z" />
    </svg>
  );
}

function ReefIcon({ className = "w-7 h-7 text-teal-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#2dd4bf' }}>
      <path d="M12 2v10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M5 12a7 7 0 0 0 14 0" />
      <path d="M12 15v7" />
      <path d="M9 22h6" />
    </svg>
  );
}

function FlowerIcon({ className = "w-7 h-7 text-rose-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#fb7185' }}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
    </svg>
  );
}

function SatelliteIcon({ className = "w-7 h-7 text-cyan-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#22d3ee' }}>
      <circle cx="12" cy="12" r="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
    </svg>
  );
}

function MedalIcon({ className = "w-7 h-7 text-amber-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: '28px', height: '28px', color: '#f59e0b' }}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

const WORLDS_CONFIG = [
  { id: 0, name: "Bicycle Wheels", displayName: "Bicycle Wheel...", iconType: "bike", qRange: "Q1–10" },
  { id: 1, name: "Pizza Planet", displayName: "Pizza Planet", iconType: "pizza", qRange: "Q11–20" },
  { id: 2, name: "Clockwork Tower", displayName: "Clockwork Tower", iconType: "clock", qRange: "Q21–30" },
  { id: 3, name: "Ferris Wheel", displayName: "Ferris Wheel...", iconType: "ferris", qRange: "Q31–40" },
  { id: 4, name: "Track & Field", displayName: "Track & Field...", iconType: "track", qRange: "Q41–50" },
  { id: 5, name: "Coin Vault", displayName: "Coin Vault", iconType: "coins", qRange: "Q51–60" },
  { id: 6, name: "Sunken Plate Reef", displayName: "Sunken Plate Reef", iconType: "reef", qRange: "Q61–70" },
  { id: 7, name: "Flower Bed Garden", displayName: "Flower Bed Garden", iconType: "garden", qRange: "Q71–80" },
  { id: 8, name: "Orbiting Satellites", displayName: "Orbiting Satellites", iconType: "satellite", qRange: "Q81–90" },
  { id: 9, name: "Golden Medals", displayName: "Golden Medal...", iconType: "medal", qRange: "Q91–100" }
];

function renderActiveWorldIcon(type) {
  switch (type) {
    case 'bike':
      return <BicycleIcon />;
    case 'pizza':
      return <PizzaIcon />;
    case 'clock':
      return <ClockIcon />;
    case 'ferris':
      return <FerrisWheelIcon />;
    case 'track':
      return <TrackIcon />;
    case 'coins':
      return <CoinIcon />;
    case 'reef':
      return <ReefIcon />;
    case 'garden':
      return <FlowerIcon />;
    case 'satellite':
      return <SatelliteIcon />;
    case 'medal':
      return <MedalIcon />;
    default:
      return <BicycleIcon />;
  }
}

export default function KingdomMap({
  districtScores = [],
  districtCorrect = [],
  currentDistrict = 0,
  onSelectDistrict,
  onGoReflect,
  title = "Circumference Game Worlds",
  subtitle = "10 Themed Worlds · Need 4/10 Correct to Unlock Next World",
}) {
  const totalStars = districtScores?.reduce((sum, sc) => {
    return sc !== null && sc !== undefined ? sum + calcStars(sc) : sum;
  }, 0) || 0;

  const allWorldsCompleted = districtScores.length === 10 && districtScores.every(s => s !== null && s !== undefined);

  return (
    <div className="practice-worlds-panel">
      {/* Glowing Top Center Pill Handle */}
      <div className="practice-top-pill" />

      {/* Header Row: Title & Subtitle + Star Badge */}
      <div className="practice-header-row">
        <div>
          <h2 className="practice-header-title">
            {title}
          </h2>
          <p className="practice-header-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="practice-header-right">
          <div className="practice-star-badge">
            <span className="practice-star-icon">⭐</span>
            <span>{totalStars} / 30</span>
          </div>

          {allWorldsCompleted && onGoReflect && (
            <button
              onClick={onGoReflect}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.82rem', padding: '5px 12px' }}
            >
              Go to Reflect 🌟
            </button>
          )}
        </div>
      </div>

      {/* 10 Worlds Grid (2 rows x 5 columns) */}
      <div className="practice-grid">
        {WORLDS_CONFIG.map((world, idx) => {
          const isCompleted = districtScores?.[idx] !== null && districtScores?.[idx] !== undefined;
          const isUnlocked = idx === 0 || idx <= currentDistrict || isCompleted || (districtCorrect?.[idx - 1] >= 4);
          const stars = isCompleted ? calcStars(districtScores[idx]) : 0;

          return (
            <div
              key={world.id}
              onClick={() => isUnlocked && onSelectDistrict && onSelectDistrict(idx)}
              className={`practice-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              role="button"
              tabIndex={isUnlocked ? 0 : -1}
              aria-label={`World ${idx + 1}: ${world.name}`}
            >
              {/* Card Top Row: W Badge & Q-Range */}
              <div className="practice-card-top">
                <span className="practice-card-tag">W{idx + 1}</span>
                <span className="practice-card-qrange">{world.qRange}</span>
              </div>

              {/* Card Center: Icon & Title */}
              <div className="practice-card-center">
                <div className="practice-card-icon-slot">
                  {isUnlocked ? renderActiveWorldIcon(world.iconType) : <GoldLockIcon />}
                </div>

                <span className="practice-card-title" title={world.name}>
                  {world.displayName}
                </span>
              </div>

              {/* Card Bottom: Action */}
              <div className="practice-card-bottom">
                {isUnlocked ? (
                  isCompleted && stars > 0 ? (
                    <span className="practice-card-action-stars">
                      {"⭐".repeat(stars)}
                    </span>
                  ) : (
                    <span className="practice-card-action-play">
                      Play →
                    </span>
                  )
                ) : (
                  <span className="practice-card-action-locked">
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { KingdomMap };
