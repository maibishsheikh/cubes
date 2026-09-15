// src/components/simulations/SugarCubePackingMission.jsx
// Multi-Step / Composite Construction: Calculate volumes of both small cube and large crate to find pack count
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../hooks/useAudio.js';
import { calcVolume, packCount } from '../../utils/cubeMath.js';

const MISSIONS = [
  { id: 1, smallEdge: 2, largeEdge: 6,  sugarType: "Golden Cane Cubes", hint: "6 ÷ 2 = 3 along each edge. 3 × 3 × 3 = ?" },
  { id: 2, smallEdge: 2, largeEdge: 8,  sugarType: "Crystal White Cubes", hint: "8 ÷ 2 = 4 along each edge. 4 × 4 × 4 = ?" },
  { id: 3, smallEdge: 3, largeEdge: 9,  sugarType: "Brown Sugar Cubes", hint: "9 ÷ 3 = 3 along each edge. 3 × 3 × 3 = ?" },
];

export default function SugarCubePackingMission({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [missionIdx, setMissionIdx] = useState(0);
  const [userPackAnswer, setUserPackAnswer] = useState(null);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [completedMissions, setCompletedMissions] = useState([false, false, false]);

  const mission = MISSIONS[missionIdx] || MISSIONS[0];
  const sEdge = mission.smallEdge;
  const lEdge = mission.largeEdge;

  const smallVolume = calcVolume(sEdge);
  const largeVolume = calcVolume(lEdge);
  const targetPack = packCount(lEdge, sEdge); // (lEdge / sEdge)^3
  const ratio = lEdge / sEdge;

  const allMissionsDone = completedMissions.every(Boolean);

  function handleAnswer(choice) {
    setUserPackAnswer(choice);
    if (choice === targetPack) {
      sounds.correct();
      setAnsweredCorrect(true);
      const updated = [...completedMissions];
      updated[missionIdx] = true;
      setCompletedMissions(updated);

      narrate([
        { text: `Excellent work! Along each side, ${ratio} small cubes fit. ${ratio} times ${ratio} times ${ratio} equals ${targetPack} sugar cubes packed!`, style: 'celebration' }
      ]);
    } else {
      sounds.wrong();
      narrate([
        { text: `Not quite. Remember: ${lEdge} divided by ${sEdge} is ${ratio} boxes per edge. Cube that number!`, style: 'encouragement' }
      ]);
    }
  }

  function nextMission() {
    sounds.click();
    const nxt = (missionIdx + 1) % MISSIONS.length;
    setMissionIdx(nxt);
    setUserPackAnswer(null);
    setAnsweredCorrect(false);
  }

  // Answer choices
  const wrong1 = ratio; // misconception: only 1D division
  const wrong2 = ratio * ratio; // misconception: only 2D area
  const wrong3 = targetPack + ratio;
  const choices = [targetPack, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <div>
          <h3 className="station-title">🍬 Station C: Sugar Cube Packing Mission</h3>
          <p className="station-subtitle">Calculate small cube volume and crate volume to pack the factory shipments!</p>
        </div>
        <div className="station-target-box">
          <span className="station-target-label">Packing Mission #{missionIdx + 1}:</span>
          <span className="station-target-num">{mission.sugarType}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Visual Representation */}
        <div className="station-card glass-card visual-card">
          <div className="visual-stage-header">
            <span className="badge-pill">Crate: {lEdge} cm | Sugar Cube: {sEdge} cm</span>
            <span className="readout-pill">Ratio: {ratio} cubes per edge</span>
          </div>

          <div className="interactive-canvas">
            <svg viewBox="0 0 240 200" className="packing-svg">
              <defs>
                <linearGradient id="crateOutline" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Large Crate Outline (3D) */}
              <g transform="translate(120, 20)">
                <polygon points="0,-10 65,22 0,55 -65,22" fill="url(#crateOutline)" stroke="#fb923c" strokeWidth="2" strokeDasharray="4,4" />
                <polygon points="-65,22 0,55 0,115 -65,82" fill="url(#crateOutline)" stroke="#fb923c" strokeWidth="2" />
                <polygon points="0,55 65,22 65,82 0,115" fill="url(#crateOutline)" stroke="#fb923c" strokeWidth="2" />

                {/* Draw packing units grid */}
                {Array.from({ length: Math.min(ratio, 4) }).map((_, z) => (
                  <g key={`pz-${z}`}>
                    {Array.from({ length: Math.min(ratio, 4) }).map((_, y) => (
                      Array.from({ length: Math.min(ratio, 4) }).map((_, x) => {
                        const isoX = (x - y) * 14;
                        const isoY = (x + y) * 7 + (ratio - 1 - z) * 15 + 35;
                        return (
                          <g key={`p-${x}-${y}-${z}`} transform={`translate(${isoX}, ${isoY})`}>
                            <polygon points="0,-6 12,0 0,6 -12,0" fill="#fed7aa" stroke="#f97316" strokeWidth="0.8" />
                            <polygon points="-12,0 0,6 0,12 -12,6" fill="#fdba74" stroke="#f97316" strokeWidth="0.8" />
                            <polygon points="0,6 12,0 12,6 0,12" fill="#fb923c" stroke="#f97316" strokeWidth="0.8" />
                          </g>
                        );
                      })
                    ))}
                  </g>
                ))}
              </g>

              {/* Edge readouts */}
              <text x="35" y="160" fill="#fcd34d" fontSize="12" fontWeight="bold">Crate Edge = {lEdge} cm</text>
              <text x="145" y="160" fill="#fdba74" fontSize="12" fontWeight="bold">Sugar Cube = {sEdge} cm</text>
            </svg>
          </div>
        </div>

        {/* Right Column: Calculations & Challenge */}
        <div className="station-card glass-card controls-card">
          {/* Mission selection tabs */}
          <div className="control-section">
            <h4 className="section-title">Factory Orders</h4>
            <div className="order-tabs-row">
              {MISSIONS.map((m, idx) => (
                <button
                  key={m.id}
                  className={`order-tab-btn ${missionIdx === idx ? 'active' : ''} ${completedMissions[idx] ? 'done' : ''}`}
                  onClick={() => {
                    sounds.click();
                    setMissionIdx(idx);
                    setUserPackAnswer(null);
                    setAnsweredCorrect(false);
                  }}
                >
                  {completedMissions[idx] ? '✅' : '🍬'} Mission {idx + 1}: {m.largeEdge} cm crate
                </button>
              ))}
            </div>
          </div>

          {/* Step-by-Step Mathematical Breakdown */}
          <div className="control-section">
            <h4 className="section-title">Volume &amp; Packing Breakdown</h4>
            <div className="math-breakdown-card">
              <div className="breakdown-row">
                <span>1 Sugar Cube Volume:</span>
                <strong>{sEdge} × {sEdge} × {sEdge} = {smallVolume} cm³</strong>
              </div>
              <div className="breakdown-row">
                <span>1 Large Crate Volume:</span>
                <strong>{lEdge} × {lEdge} × {lEdge} = {largeVolume} cm³</strong>
              </div>
              <div className="breakdown-row highlight">
                <span>Cubes along 1 edge:</span>
                <strong>{lEdge} cm ÷ {sEdge} cm = {ratio} cubes</strong>
              </div>
            </div>
          </div>

          {/* Question: How many small cubes pack inside? */}
          <div className="control-section">
            <h4 className="section-title">Packing Calculation Challenge</h4>
            <p className="discovery-q">
              How many {sEdge} cm sugar cubes fit completely inside the {lEdge} cm shipping crate?
            </p>

            <div className="quiz-options-row">
              {choices.map(c => (
                <button
                  key={c}
                  className={`quiz-opt-btn ${userPackAnswer === c ? (c === targetPack ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleAnswer(c)}
                >
                  {c} cubes
                </button>
              ))}
            </div>

            {userPackAnswer && !answeredCorrect && (
              <div className="station-feedback error anim-shake">
                ❌ Not quite! Along length, width, and height, {ratio} cubes fit. Total = {ratio}³ = {targetPack}.
              </div>
            )}
            {answeredCorrect && (
              <div className="station-feedback success anim-fade-in">
                🎉 <strong>Correct!</strong> Large Volume ({largeVolume}) ÷ Small Volume ({smallVolume}) = {targetPack} cubes!
              </div>
            )}
          </div>

          {/* Next / Completion */}
          {answeredCorrect && !allMissionsDone && (
            <button className="btn btn-outline btn-md" onClick={nextMission}>
              Next Packing Mission ➔
            </button>
          )}

          {allMissionsDone && (
            <div className="station-success anim-bounce-in">
              <div className="success-icon">📦</div>
              <div className="success-text">
                <strong>All Packing Shipments Calculated!</strong><br />
                You mastered multi-step 3D volume ratios and crate packing!
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
