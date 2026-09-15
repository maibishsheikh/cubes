// src/components/shared/CubeVisual.jsx
// Dynamic SVG-based mathematical visualizer for CubeQuest
// Renders: cube-3d, cube-face, tank-liquid, stacked-cubes, cube-net

import React from 'react';

export default function CubeVisual({ type, data, compact = false }) {
  if (!data) return null;

  const size = compact ? 120 : 200;

  // 1. 3D Isometric Cube Visual
  if (type === 'cube-3d') {
    const edge = data.edge || (data.volume ? Math.round(Math.cbrt(data.volume)) : 6);
    const label = data.edge ? `${data.edge} cm` : (data.volume ? `${data.volume} cm³` : '');

    return (
      <div className="cube-visual-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: compact ? '4px' : '10px' }}>
        <svg width={size} height={size * 0.9} viewBox="0 0 200 180" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          <defs>
            <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#075985" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Top Face (rhombus) */}
          <polygon points="100,20 160,50 100,80 40,50" fill="url(#topFace)" stroke="#bae6fd" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Left Face */}
          <polygon points="40,50 100,80 100,150 40,120" fill="url(#leftFace)" stroke="#7dd3fc" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Right Face */}
          <polygon points="100,80 160,50 160,120 100,150" fill="url(#rightFace)" stroke="#7dd3fc" strokeWidth="2" strokeLinejoin="round" />

          {/* Dimension indicator on front-bottom edge */}
          <path d="M 38,126 L 98,156" stroke="#fcd34d" strokeWidth="2.5" strokeDasharray="3,3" />
          <text x="64" y="152" fill="#fcd34d" fontSize="13" fontWeight="bold" fontFamily="var(--font-display)">
            {data.edge ? `${data.edge} cm` : ''}
          </text>

          {/* Height indicator */}
          <path d="M 166,54 L 166,116" stroke="#fcd34d" strokeWidth="2.5" strokeDasharray="3,3" />
          <text x="172" y="90" fill="#fcd34d" fontSize="12" fontWeight="bold" fontFamily="var(--font-display)">
            {data.edge ? `${data.edge} cm` : ''}
          </text>

          {/* Volume tag if specified */}
          {data.volume && (
            <g transform="translate(100, 75)">
              <rect x="-42" y="-12" width="84" height="24" rx="6" fill="rgba(15,23,42,0.85)" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="0" y="5" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="var(--font-display)">
                V = {data.volume} cm³
              </text>
            </g>
          )}
        </svg>
        {label && !compact && (
          <div style={{ marginTop: '4px', fontSize: '0.9rem', color: '#bae6fd', fontWeight: 600 }}>
            Cube: {label}
          </div>
        )}
      </div>
    );
  }

  // 2. Square Face Visual
  if (type === 'cube-face') {
    const edge = data.edge || (data.area ? Math.round(Math.sqrt(data.area)) : 5);
    const area = data.area || edge * edge;

    return (
      <div className="cube-visual-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: compact ? '4px' : '10px' }}>
        <svg width={size} height={size * 0.9} viewBox="0 0 160 160" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          <defs>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#be123c" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Front Face Square */}
          <rect x="30" y="30" width="100" height="100" rx="6" fill="url(#faceGrad)" stroke="#fda4af" strokeWidth="2.5" />
          
          {/* Subtle grid pattern inside */}
          <line x1="30" y1="80" x2="130" y2="80" stroke="rgba(255,255,255,0.2)" strokeDasharray="4,4" />
          <line x1="80" y1="30" x2="80" y2="130" stroke="rgba(255,255,255,0.2)" strokeDasharray="4,4" />

          {/* Area label in center */}
          <rect x="42" y="68" width="76" height="24" rx="5" fill="rgba(15,23,42,0.85)" stroke="#fda4af" strokeWidth="1" />
          <text x="80" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800" fontFamily="var(--font-display)">
            Area = {area} cm²
          </text>

          {/* Bottom dimension */}
          <path d="M 30,140 L 130,140" stroke="#fcd34d" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="80" y="154" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="bold" fontFamily="var(--font-display)">
            {data.edge ? `${data.edge} cm` : `edge = √${area}`}
          </text>

          {/* Right dimension */}
          <text x="138" y="85" fill="#fcd34d" fontSize="12" fontWeight="bold" fontFamily="var(--font-display)">
            {data.edge ? `${data.edge} cm` : ''}
          </text>
        </svg>
      </div>
    );
  }

  // 3. Tank Liquid Visual
  if (type === 'tank-liquid') {
    const edge = data.edge || 20;
    const litres = data.litres || 8;
    const isFull = data.full !== false;
    const waterHeight = isFull ? 80 : 45;

    return (
      <div className="cube-visual-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: compact ? '4px' : '10px' }}>
        <svg width={size} height={size * 0.95} viewBox="0 0 180 170">
          <defs>
            <linearGradient id="tankGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="tankWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Tank Glass Outline (isometric) */}
          <polygon points="90,15 150,45 90,75 30,45" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
          <polygon points="30,45 90,75 90,145 30,115" fill="url(#tankGlass)" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="90,75 150,45 150,115 90,145" fill="url(#tankGlass)" stroke="#38bdf8" strokeWidth="2" />

          {/* Water Fill Level */}
          <g transform={`translate(0, ${145 - waterHeight})`}>
            {/* Water Left */}
            <polygon points={`30,0 90,30 90,${waterHeight} 30,${waterHeight - 30}`} fill="url(#tankWater)" opacity="0.9" />
            {/* Water Right */}
            <polygon points={`90,30 150,0 150,${waterHeight - 30} 90,${waterHeight}`} fill="url(#tankWater)" opacity="0.75" />
            {/* Water Surface */}
            <polygon points="90,0 150,0 90,30 30,0" fill="#67e8f9" opacity="0.65" />
          </g>

          {/* Capacity readout badge */}
          <rect x="45" y="148" width="90" height="20" rx="6" fill="rgba(15,23,42,0.9)" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="90" y="162" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="800" fontFamily="var(--font-display)">
            💧 {litres} {litres === 1 ? 'Litre' : 'Litres'}
          </text>

          {/* Edge dimension */}
          <text x="14" y="85" fill="#fcd34d" fontSize="11" fontWeight="bold">
            {edge} cm
          </text>
        </svg>
      </div>
    );
  }

  // 4. Stacked Cubes / Packing Visual
  if (type === 'stacked-cubes') {
    const n = Math.min(data.n || (data.largeEdge && data.smallEdge ? Math.round(data.largeEdge / data.smallEdge) : 3), 4);
    const count = data.count || n * n * n;

    return (
      <div className="cube-visual-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: compact ? '4px' : '10px' }}>
        <svg width={size} height={size * 0.9} viewBox="0 0 180 160">
          <g transform="translate(90, 20)">
            {/* Render 3D isometric blocks for layers */}
            {Array.from({ length: n }).map((_, z) => (
              <g key={`layer-${z}`} transform={`translate(0, ${z * 18})`}>
                {Array.from({ length: n }).map((_, x) => (
                  Array.from({ length: n }).map((_, y) => {
                    const isoX = (x - y) * 16;
                    const isoY = (x + y) * 8;
                    return (
                      <g key={`${x}-${y}-${z}`} transform={`translate(${isoX}, ${isoY})`}>
                        {/* Top */}
                        <polygon points="0,-8 16,0 0,8 -16,0" fill="#34d399" stroke="#065f46" strokeWidth="0.8" />
                        {/* Left */}
                        <polygon points="-16,0 0,8 0,16 -16,8" fill="#059669" stroke="#065f46" strokeWidth="0.8" />
                        {/* Right */}
                        <polygon points="0,8 16,0 16,8 0,16" fill="#10b981" stroke="#065f46" strokeWidth="0.8" />
                      </g>
                    );
                  })
                ))}
              </g>
            ))}
          </g>

          {/* Total Badge */}
          <rect x="40" y="136" width="100" height="22" rx="6" fill="rgba(15,23,42,0.9)" stroke="#34d399" strokeWidth="1.5" />
          <text x="90" y="151" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="800" fontFamily="var(--font-display)">
            📦 {count} Unit Cubes
          </text>
        </svg>
      </div>
    );
  }

  // 5. Cube Net Visual (2D Flat Foldable Pattern)
  if (type === 'cube-net') {
    return (
      <div className="cube-visual-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: compact ? '4px' : '10px' }}>
        <svg width={size} height={size * 0.9} viewBox="0 0 160 140">
          {/* T-shaped net of 6 squares */}
          <g transform="translate(30, 10)">
            {/* Top flap */}
            <rect x="30" y="0" width="30" height="30" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Row of 3 squares */}
            <rect x="0" y="30" width="30" height="30" fill="rgba(56,189,248,0.4)" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="30" y="30" width="30" height="30" fill="rgba(56,189,248,0.6)" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="60" y="30" width="30" height="30" fill="rgba(56,189,248,0.4)" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="90" y="30" width="30" height="30" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Bottom flap */}
            <rect x="30" y="60" width="30" height="30" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
          <text x="80" y="125" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="700">
            6 Identical Faces (Net)
          </text>
        </svg>
      </div>
    );
  }

  return null;
}
