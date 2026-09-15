// src/components/simulations/CubeUnfoldLab.jsx
// Concept Discovery Lab: Fold a 2D Net into a 3D Cube, then fill with Unit Cubes
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../hooks/useAudio.js';

export default function CubeUnfoldLab({ onComplete, audioEnabled }) {
  const { narrate, stopAll, sounds } = useAudio(audioEnabled);
  const [foldStage, setFoldStage] = useState(0); // 0 = flat net, 1 = half folded, 2 = full 3D cube
  const [cubesFilled, setCubesFilled] = useState(0); // 0 to 27 unit cubes
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [success, setSuccess] = useState(false);

  const edge = 3;
  const totalCubes = 27; // 3 x 3 x 3

  function handleFoldChange(stage) {
    sounds.click();
    setFoldStage(stage);
    if (stage === 2 && cubesFilled === 0) {
      setCubesFilled(9); // auto-fill first layer as a hint
    }
  }

  function handleFillStep(delta) {
    sounds.click();
    setCubesFilled(prev => Math.min(totalCubes, Math.max(0, prev + delta)));
  }

  function handleAnswer(ans) {
    if (ans === totalCubes) {
      sounds.correct();
      setQuizAnswer(ans);
      setSuccess(true);
      narrate([
        { text: "Spot on! Three times three times three equals twenty-seven unit cubes! Volume is edge cubed!", style: 'celebration' }
      ]);
    } else {
      sounds.wrong();
      setQuizAnswer(ans);
      narrate([
        { text: "Not quite. Remember to multiply length times width times height: three times three times three.", style: 'encouragement' }
      ]);
    }
  }

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <div>
          <h3 className="station-title">🧊 Station A: Cube Unfold &amp; Fill Lab</h3>
          <p className="station-subtitle">Fold a 2D flat cardboard net into a 3D solid cube, then discover its volume!</p>
        </div>
        <div className="station-target-box">
          <span className="station-target-label">Cube Dimensions:</span>
          <span className="station-target-num">3 cm × 3 cm × 3 cm</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Visual Stage */}
        <div className="station-card glass-card visual-card">
          <div className="visual-stage-header">
            <span className="badge-pill">
              {foldStage === 0 ? "📐 2D Net (6 Faces)" : foldStage === 1 ? "🔄 Folding In Progress..." : "🧊 3D Solid Cube"}
            </span>
            <span className="readout-pill">
              Filled: <strong>{cubesFilled} / {totalCubes}</strong> Unit Cubes
            </span>
          </div>

          <div className="interactive-canvas">
            {foldStage === 0 && (
              /* Flat Net SVG */
              <svg viewBox="0 0 240 200" className="net-svg">
                <defs>
                  <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                {/* 6 squares net (T-cross) */}
                <g transform="translate(60, 20)">
                  {/* Top face */}
                  <rect x="40" y="0" width="40" height="40" fill="url(#netGrad)" stroke="#bae6fd" strokeWidth="2" rx="4" />
                  <text x="60" y="25" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Top</text>

                  {/* Middle row: Left, Base, Right, Back */}
                  <rect x="0" y="40" width="40" height="40" fill="url(#netGrad)" stroke="#bae6fd" strokeWidth="2" rx="4" />
                  <text x="20" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Left</text>

                  <rect x="40" y="40" width="40" height="40" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" rx="4" />
                  <text x="60" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Base</text>

                  <rect x="80" y="40" width="40" height="40" fill="url(#netGrad)" stroke="#bae6fd" strokeWidth="2" rx="4" />
                  <text x="100" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Right</text>

                  {/* Bottom face */}
                  <rect x="40" y="80" width="40" height="40" fill="url(#netGrad)" stroke="#bae6fd" strokeWidth="2" rx="4" />
                  <text x="60" y="105" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Front</text>

                  {/* Bottom extra face */}
                  <rect x="40" y="120" width="40" height="40" fill="url(#netGrad)" stroke="#bae6fd" strokeWidth="2" rx="4" />
                  <text x="60" y="145" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Back</text>
                </g>
                <text x="120" y="190" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700">
                  6 Identical Square Faces · 3 cm × 3 cm Each
                </text>
              </svg>
            )}

            {foldStage === 1 && (
              /* Partially Folded 3D Isometric View */
              <svg viewBox="0 0 240 200" className="net-svg anim-pulse">
                <g transform="translate(120, 30)">
                  {/* Base face */}
                  <polygon points="0,60 50,85 0,110 -50,85" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                  {/* Left wall tilting up */}
                  <polygon points="-50,85 0,110 -25,50 -75,25" fill="#0284c7" opacity="0.8" stroke="#bae6fd" strokeWidth="2" />
                  {/* Right wall tilting up */}
                  <polygon points="0,110 50,85 75,25 25,50" fill="#0284c7" opacity="0.8" stroke="#bae6fd" strokeWidth="2" />
                  {/* Back wall */}
                  <polygon points="-50,85 0,60 0,0 -50,25" fill="#075985" opacity="0.9" stroke="#bae6fd" strokeWidth="2" />
                  {/* Top lid folding over */}
                  <polygon points="0,60 50,85 50,25 0,0" fill="#38bdf8" opacity="0.7" stroke="#bae6fd" strokeWidth="2" />
                </g>
                <text x="120" y="180" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="bold">
                  Cardboard faces folding into 3D solid...
                </text>
              </svg>
            )}

            {foldStage === 2 && (
              /* Fully Formed 3D Cube with Unit Cubes Filling inside */
              <svg viewBox="0 0 240 200" className="net-svg">
                <defs>
                  <linearGradient id="cubeGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                {/* Outer Glass Boundary */}
                <g transform="translate(120, 25)">
                  <polygon points="0,-10 60,20 0,50 -60,20" fill="url(#cubeGlass)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                  <polygon points="-60,20 0,50 0,110 -60,80" fill="url(#cubeGlass)" stroke="#38bdf8" strokeWidth="2" />
                  <polygon points="0,50 60,20 60,80 0,110" fill="url(#cubeGlass)" stroke="#38bdf8" strokeWidth="2" />

                  {/* Render unit cubes based on cubesFilled */}
                  {Array.from({ length: 3 }).map((_, z) => {
                    return Array.from({ length: 3 }).map((_, y) => {
                      return Array.from({ length: 3 }).map((_, x) => {
                        const index = z * 9 + y * 3 + x;
                        if (index >= cubesFilled) return null;

                        const uX = (x - y) * 16;
                        const uY = (x + y) * 8 + (2 - z) * 18 + 24;

                        return (
                          <g key={`u-${index}`} transform={`translate(${uX}, ${uY})`}>
                            {/* Top */}
                            <polygon points="0,-7 14,0 0,7 -14,0" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.7" />
                            {/* Left */}
                            <polygon points="-14,0 0,7 0,14 -14,7" fill="#0369a1" stroke="#0284c7" strokeWidth="0.7" />
                            {/* Right */}
                            <polygon points="0,7 14,0 14,7 0,14" fill="#0284c7" stroke="#0284c7" strokeWidth="0.7" />
                          </g>
                        );
                      });
                    });
                  })}
                </g>

                {/* Dimensions labels */}
                <text x="40" y="150" fill="#fcd34d" fontSize="12" fontWeight="bold">length = 3</text>
                <text x="160" y="150" fill="#fcd34d" fontSize="12" fontWeight="bold">width = 3</text>
                <text x="195" y="80" fill="#fcd34d" fontSize="12" fontWeight="bold">height = 3</text>
              </svg>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Manipulators & Guided Questions */}
        <div className="station-card glass-card controls-card">
          {/* Step 1: Folding Controls */}
          <div className="control-section">
            <h4 className="section-title">Step 1: Fold the Cardboard Net</h4>
            <div className="btn-group-row">
              <button
                className={`step-btn ${foldStage === 0 ? 'active' : ''}`}
                onClick={() => handleFoldChange(0)}
              >
                1. Flat Net 📄
              </button>
              <button
                className={`step-btn ${foldStage === 1 ? 'active' : ''}`}
                onClick={() => handleFoldChange(1)}
              >
                2. Folding 🔄
              </button>
              <button
                className={`step-btn ${foldStage === 2 ? 'active' : ''}`}
                onClick={() => handleFoldChange(2)}
              >
                3. Solid Cube 🧊
              </button>
            </div>
          </div>

          {/* Step 2: Packing / Unit Cube Fill */}
          <div className="control-section">
            <h4 className="section-title">Step 2: Pack with 1 cm Unit Cubes</h4>
            <div className="fill-slider-container">
              <button
                className="btn-counter"
                onClick={() => handleFillStep(-3)}
                disabled={cubesFilled <= 0 || foldStage !== 2}
                aria-label="Remove 3 cubes"
              >
                −3
              </button>
              <button
                className="btn-counter"
                onClick={() => handleFillStep(-1)}
                disabled={cubesFilled <= 0 || foldStage !== 2}
                aria-label="Remove 1 cube"
              >
                −1
              </button>

              <div className="fill-progress-bar">
                <div
                  className="fill-bar-fill"
                  style={{ width: `${(cubesFilled / totalCubes) * 100}%` }}
                />
                <span className="fill-bar-text">
                  {cubesFilled} / {totalCubes} Unit Cubes
                </span>
              </div>

              <button
                className="btn-counter"
                onClick={() => handleFillStep(1)}
                disabled={cubesFilled >= totalCubes || foldStage !== 2}
                aria-label="Add 1 cube"
              >
                +1
              </button>
              <button
                className="btn-counter"
                onClick={() => handleFillStep(3)}
                disabled={cubesFilled >= totalCubes || foldStage !== 2}
                aria-label="Add 3 cubes"
              >
                +3
              </button>
            </div>

            {foldStage !== 2 && (
              <p className="hint-text">💡 Fold into a 3D Solid Cube first to fill it with unit cubes!</p>
            )}
          </div>

          {/* Step 3: Discovery Confirmation Question */}
          <div className="control-section">
            <h4 className="section-title">Step 3: Concept Discovery</h4>
            <p className="discovery-q">
              Since 1 edge fits <strong>3 cubes</strong>, how many total 1 cm unit cubes pack inside the entire 3 cm cube?
            </p>

            <div className="quiz-options-row">
              {[9, 18, 27, 36].map(opt => (
                <button
                  key={opt}
                  className={`quiz-opt-btn ${quizAnswer === opt ? (opt === totalCubes ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt} cubes
                </button>
              ))}
            </div>

            {quizAnswer && quizAnswer !== totalCubes && (
              <div className="station-feedback anim-shake error">
                ❌ Remember: Volume = edge × edge × edge = 3 × 3 × 3 = 27!
              </div>
            )}
          </div>

          {/* Completion Button */}
          {success && (
            <div className="station-success anim-bounce-in">
              <div className="success-icon">🎉</div>
              <div className="success-text">
                <strong>Discovery Complete!</strong><br />
                Volume of Cube = edge × edge × edge = 3³ = 27 cm³!
              </div>
              <button className="btn btn-primary btn-md complete-btn" onClick={onComplete}>
                Complete Station ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
