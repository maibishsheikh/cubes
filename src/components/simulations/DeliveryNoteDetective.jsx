// src/components/simulations/DeliveryNoteDetective.jsx
// Error-Detective: Inspect a solved delivery slip, identify the erroneous line, and fix the calculation error
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../hooks/useAudio.js';

const SLIPS = [
  {
    id: 1,
    slipNumber: "SLIP-4081",
    customer: "Precision Dice Ltd",
    problem: "Die order with face area of 36 cm². Find the edge length.",
    lines: [
      { id: 'L1', label: "Given face area of square face", value: "36 cm²", isError: false },
      { id: 'L2', label: "Formula applied to find edge", value: "Edge = 36 ÷ 4", isError: true, explanation: "Error! A face is a square with Area = edge × edge. To find the edge, you must use the square root (√36), NOT divide by 4!" },
      { id: 'L3', label: "Calculated edge length", value: "9 cm", isError: false },
    ],
    correctValue: "Edge = √36 = 6 cm",
    options: [
      "Edge = √36 = 6 cm",
      "Edge = 36 ÷ 6 = 6 cm",
      "Edge = ∛36 = 3.3 cm",
      "Edge = 36 × 2 = 72 cm",
    ],
  },
  {
    id: 2,
    slipNumber: "SLIP-5192",
    customer: "Frosty Ice Depot",
    problem: "Ice cube block with volume of 125 cm³. Find the edge length.",
    lines: [
      { id: 'L1', label: "Given total cube volume", value: "125 cm³", isError: false },
      { id: 'L2', label: "Reverse operation applied", value: "Edge = √125", isError: true, explanation: "Error! Square root (√) is for face area. For volume (edge × edge × edge), you must use the cube root (∛125 = 5 cm)!" },
      { id: 'L3', label: "Calculated edge length", value: "11.18 cm", isError: false },
    ],
    correctValue: "Edge = ∛125 = 5 cm",
    options: [
      "Edge = ∛125 = 5 cm",
      "Edge = 125 ÷ 3 = 41.6 cm",
      "Edge = 125 ÷ 6 = 20.8 cm",
      "Edge = √125 = 25 cm",
    ],
  },
  {
    id: 3,
    slipNumber: "SLIP-6330",
    customer: "Aquatic Wonders Shop",
    problem: "Cube tank with edge 20 cm completely filled with water. Find capacity in litres.",
    lines: [
      { id: 'L1', label: "Tank volume in cm³", value: "20 × 20 × 20 = 8,000 cm³", isError: false },
      { id: 'L2', label: "Litres conversion used", value: "8,000 ÷ 100 = 80 Litres", isError: true, explanation: "Error! 1 litre is equal to 1,000 cm³ (not 100 cm³). So 8,000 cm³ ÷ 1,000 = 8 litres!" },
      { id: 'L3', label: "Invoice capacity recorded", value: "80 Litres", isError: false },
    ],
    correctValue: "8,000 ÷ 1,000 = 8 Litres",
    options: [
      "8,000 ÷ 1,000 = 8 Litres",
      "8,000 × 1,000 = 8,000,000 Litres",
      "8,000 ÷ 10 = 800 Litres",
      "8,000 ÷ 500 = 16 Litres",
    ],
  },
];

export default function DeliveryNoteDetective({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [slipIdx, setSlipIdx] = useState(0);
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [correctionChosen, setCorrectionChosen] = useState(null);
  const [slipSolved, setSlipSolved] = useState([false, false, false]);

  const slip = SLIPS[slipIdx] || SLIPS[0];
  const allSlipsDone = slipSolved.every(Boolean);

  function handleLineClick(line) {
    sounds.click();
    setSelectedLineId(line.id);
    setCorrectionChosen(null);

    if (line.isError) {
      narrate([
        { text: "Great eye! That is where the calculation went wrong! Now select the mathematically correct working.", style: 'instruction' }
      ]);
    } else {
      narrate([
        { text: "That line is mathematically sound. Look closely at the formulas and units in the other lines!", style: 'encouragement' }
      ]);
    }
  }

  function handleCorrectionSelect(choice) {
    setCorrectionChosen(choice);
    if (choice === slip.correctValue) {
      sounds.correct();
      const updated = [...slipSolved];
      updated[slipIdx] = true;
      setSlipSolved(updated);

      narrate([
        { text: "Spot on detective work! Packing slip corrected and audited!", style: 'celebration' }
      ]);
    } else {
      sounds.wrong();
      narrate([
        { text: "Not quite the right correction. Check the formula again!", style: 'encouragement' }
      ]);
    }
  }

  function nextSlip() {
    sounds.click();
    const nextIdx = (slipIdx + 1) % SLIPS.length;
    setSlipIdx(nextIdx);
    setSelectedLineId(null);
    setCorrectionChosen(null);
  }

  const selectedLine = slip.lines.find(l => l.id === selectedLineId);

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <div>
          <h3 className="station-title">🔍 Station D: Delivery Note Detective</h3>
          <p className="station-subtitle">Spot errors on client delivery slips and correct the mathematical calculations!</p>
        </div>
        <div className="station-target-box">
          <span className="station-target-label">Audit Slip #{slipIdx + 1}:</span>
          <span className="station-target-num">{slip.slipNumber}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Packing Slip Document */}
        <div className="station-card glass-card visual-card">
          <div className="visual-stage-header">
            <span className="badge-pill">📄 Packing Slip: {slip.customer}</span>
            <span className="readout-pill">{slipSolved[slipIdx] ? "✅ Audited & Corrected" : "⚠️ Error Detected"}</span>
          </div>

          <div className="packing-slip-paper">
            <div className="slip-watermark">CUBE CRAFT CO.</div>
            <div className="slip-meta">
              <span><strong>ORDER REF:</strong> {slip.slipNumber}</span>
              <span><strong>CLIENT:</strong> {slip.customer}</span>
            </div>

            <p className="slip-problem-text">
              <strong>Order Spec:</strong> {slip.problem}
            </p>

            <div className="slip-lines-list">
              <span className="slip-instruction-tag">👉 Tap the line containing the mathematical error:</span>
              {slip.lines.map((line, i) => {
                const isSelected = selectedLineId === line.id;
                const isFixed = slipSolved[slipIdx] && line.isError;

                return (
                  <div
                    key={line.id}
                    className={`slip-line-row ${isSelected ? 'selected' : ''} ${line.isError && isSelected ? 'error-flagged' : ''} ${isFixed ? 'fixed-green' : ''}`}
                    onClick={() => handleLineClick(line)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="line-num">Line {i + 1}:</span>
                    <span className="line-label">{line.label}:</span>
                    <span className="line-val">
                      {isFixed ? slip.correctValue : line.value}
                    </span>
                    {isSelected && (
                      <span className="line-flag-badge">
                        {line.isError ? "🚩 ERROR SPOT!" : "✓ SOUND"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedLine?.isError && (
              <div className="slip-explanation-banner anim-slide-up">
                💡 <strong>Detective Note:</strong> {selectedLine.explanation}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detective Audit Controls */}
        <div className="station-card glass-card controls-card">
          {/* Slip selector tabs */}
          <div className="control-section">
            <h4 className="section-title">Case Slips to Audit</h4>
            <div className="order-tabs-row">
              {SLIPS.map((s, idx) => (
                <button
                  key={s.id}
                  className={`order-tab-btn ${slipIdx === idx ? 'active' : ''} ${slipSolved[idx] ? 'done' : ''}`}
                  onClick={() => {
                    sounds.click();
                    setSlipIdx(idx);
                    setSelectedLineId(null);
                    setCorrectionChosen(null);
                  }}
                >
                  {slipSolved[idx] ? '✅' : '🔍'} Slip {idx + 1}: {s.slipNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Audit Action Area */}
          <div className="control-section">
            <h4 className="section-title">Audit Action</h4>
            {!selectedLineId && (
              <p className="hint-text">
                👉 Click on any line of the packing slip to the left to inspect its mathematical calculation.
              </p>
            )}

            {selectedLineId && !selectedLine?.isError && (
              <div className="station-feedback error anim-shake">
                Line {selectedLineId} is mathematically correct. Keep inspecting the other lines for roots, formulas, or unit errors!
              </div>
            )}

            {selectedLineId && selectedLine?.isError && (
              <div className="correction-container anim-fade-in">
                <p className="discovery-q">
                  You found the error in Line {selectedLineId}! Select the mathematically corrected formula:
                </p>

                <div className="quiz-options-vertical">
                  {slip.options.map(opt => (
                    <button
                      key={opt}
                      className={`quiz-opt-btn ${correctionChosen === opt ? (opt === slip.correctValue ? 'correct' : 'wrong') : ''}`}
                      onClick={() => handleCorrectionSelect(opt)}
                      disabled={slipSolved[slipIdx]}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {slipSolved[slipIdx] && (
              <div className="station-feedback success anim-fade-in">
                🎉 <strong>Audit Passed!</strong> Packing slip {slip.slipNumber} has been officially approved with corrected working!
              </div>
            )}
          </div>

          {/* Next / Complete */}
          {slipSolved[slipIdx] && !allSlipsDone && (
            <button className="btn btn-outline btn-md" onClick={nextSlip}>
              Next Audit Slip ➔
            </button>
          )}

          {allSlipsDone && (
            <div className="station-success anim-bounce-in">
              <div className="success-icon">🎖️</div>
              <div className="success-text">
                <strong>Workshop Quality Inspector Certified!</strong><br />
                All 3 delivery notes have been audited and corrected!
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
