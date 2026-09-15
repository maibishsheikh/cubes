// src/components/simulations/CustomCubeBuilder.jsx
// Build-to-Target Challenge: Adjust a single edge control to match client target volume orders
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../hooks/useAudio.js';
import { calcVolume, calcFaceArea, edgeFromVolume } from '../../utils/cubeMath.js';

const ORDERS = [
  { id: 1, client: "Acme Gaming Dice", targetVolume: 64,  targetEdge: 4, hint: "Find a number where edge × edge × edge = 64" },
  { id: 2, client: "SweetSugar Co.",   targetVolume: 125, targetEdge: 5, hint: "5 × 5 = 25, 25 × 5 = 125!" },
  { id: 3, client: "Crystal Box Co.",  targetVolume: 216, targetEdge: 6, hint: "What is the cube root of 216? ∛216" },
];

export default function CustomCubeBuilder({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [orderIdx, setOrderIdx] = useState(0);
  const [edge, setEdge] = useState(3);
  const [tested, setTested] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([false, false, false]);

  const currentOrder = ORDERS[orderIdx] || ORDERS[0];
  const currentVolume = calcVolume(edge);
  const currentFaceArea = calcFaceArea(edge);
  const isMatch = currentVolume === currentOrder.targetVolume;
  const allOrdersDone = completedOrders.every(Boolean);

  function handleEdgeChange(delta) {
    sounds.click();
    setTested(false);
    setEdge(prev => Math.max(1, Math.min(10, prev + delta)));
  }

  function handleTestOrder() {
    setTested(true);
    if (isMatch) {
      sounds.correct();
      const updated = [...completedOrders];
      updated[orderIdx] = true;
      setCompletedOrders(updated);

      narrate([
        { text: `Spot on! An edge of ${edge} centimetres gives exactly ${currentVolume} cubic centimetres! Order fulfilled!`, style: 'celebration' }
      ]);
    } else {
      sounds.wrong();
      const msg = currentVolume < currentOrder.targetVolume
        ? `Too small! Current volume is ${currentVolume} cm³, but the client needs ${currentOrder.targetVolume} cm³. Increase the edge!`
        : `Too large! Current volume is ${currentVolume} cm³, but the client needs ${currentOrder.targetVolume} cm³. Decrease the edge!`;
      narrate([{ text: msg, style: 'encouragement' }]);
    }
  }

  function nextOrder() {
    sounds.click();
    const nextIdx = (orderIdx + 1) % ORDERS.length;
    setOrderIdx(nextIdx);
    setTested(false);
    setEdge(3);
  }

  // Dynamic scale for SVG (visualizing growing/shrinking cube)
  const scale = 0.5 + (edge / 10) * 0.5;

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <div>
          <h3 className="station-title">🏗️ Station B: Custom Cube Builder</h3>
          <p className="station-subtitle">Client orders specify target volumes. Adjust the edge length to craft the exact match!</p>
        </div>
        <div className="station-target-box">
          <span className="station-target-label">Target Order #{orderIdx + 1}:</span>
          <span className="station-target-num">{currentOrder.targetVolume} cm³</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Live 3D Interactive Visual */}
        <div className="station-card glass-card visual-card">
          <div className="visual-stage-header">
            <span className="badge-pill">Client: {currentOrder.client}</span>
            <span className="readout-pill">
              Volume: <strong>{currentVolume} cm³</strong>
            </span>
          </div>

          <div className="interactive-canvas">
            <svg viewBox="0 0 240 200" className="builder-svg">
              <defs>
                <linearGradient id="buildTop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="buildLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="buildRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              <g transform={`translate(120, 100) scale(${scale})`}>
                {/* Top face */}
                <polygon points="0,-60 60,-30 0,0 -60,-30" fill="url(#buildTop)" stroke="#fef3c7" strokeWidth="2" />
                {/* Left face */}
                <polygon points="-60,-30 0,0 0,60 -60,30" fill="url(#buildLeft)" stroke="#fef3c7" strokeWidth="2" />
                {/* Right face */}
                <polygon points="0,0 60,-30 60,30 0,60" fill="url(#buildRight)" stroke="#fef3c7" strokeWidth="2" />

                {/* Dimension label */}
                <text x="0" y="75" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="bold" fontFamily="var(--font-display)">
                  edge = {edge} cm
                </text>
              </g>

              {/* Status Indicator */}
              <g transform="translate(120, 185)">
                <rect x="-85" y="-12" width="170" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke={isMatch ? '#34d399' : '#f59e0b'} strokeWidth="1.5" />
                <text x="0" y="4" textAnchor="middle" fill={isMatch ? '#34d399' : '#fcd34d'} fontSize="11" fontWeight="bold">
                  {currentVolume} cm³ {isMatch ? '✅ MATCH' : `(Target: ${currentOrder.targetVolume} cm³)`}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Controls & Feedback */}
        <div className="station-card glass-card controls-card">
          {/* Order selection tabs */}
          <div className="control-section">
            <h4 className="section-title">Client Contracts</h4>
            <div className="order-tabs-row">
              {ORDERS.map((ord, idx) => (
                <button
                  key={ord.id}
                  className={`order-tab-btn ${orderIdx === idx ? 'active' : ''} ${completedOrders[idx] ? 'done' : ''}`}
                  onClick={() => {
                    sounds.click();
                    setOrderIdx(idx);
                    setTested(false);
                    setEdge(3);
                  }}
                >
                  {completedOrders[idx] ? '✅' : '📦'} Order {idx + 1}: {ord.targetVolume} cm³
                </button>
              ))}
            </div>
          </div>

          {/* Edge Length Control */}
          <div className="control-section">
            <h4 className="section-title">Adjust Edge Length (Only 1 Dimension Needed!)</h4>
            <div className="single-dimension-controller">
              <button
                className="btn-counter btn-lg"
                onClick={() => handleEdgeChange(-1)}
                disabled={edge <= 1}
                aria-label="Decrease edge length"
              >
                −
              </button>

              <div className="dimension-display">
                <span className="dimension-label">Edge Length (e):</span>
                <span className="dimension-value">{edge} cm</span>
                <span className="dimension-sub">Face Area = {currentFaceArea} cm²</span>
              </div>

              <button
                className="btn-counter btn-lg"
                onClick={() => handleEdgeChange(1)}
                disabled={edge >= 10}
                aria-label="Increase edge length"
              >
                +
              </button>
            </div>

            {/* Formula calculation box */}
            <div className="formula-box">
              <div className="formula-line">
                <span className="formula-label">Volume Formula:</span>
                <span className="formula-val">e × e × e = e³</span>
              </div>
              <div className="formula-line active-calc">
                <span className="formula-label">Current Cube:</span>
                <span className="formula-val">{edge} × {edge} × {edge} = <strong>{currentVolume} cm³</strong></span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="action-row">
            <button
              className={`btn btn-primary btn-md ${isMatch ? 'anim-pulse' : ''}`}
              onClick={handleTestOrder}
            >
              Verify Specification 🔍
            </button>
            {completedOrders[orderIdx] && !allOrdersDone && (
              <button className="btn btn-outline btn-md" onClick={nextOrder}>
                Next Order ➔
              </button>
            )}
          </div>

          {/* Test Feedback */}
          {tested && (
            <div className={`station-feedback ${isMatch ? 'success' : 'error anim-shake'}`}>
              {isMatch ? (
                <span>🎉 <strong>Target Reached!</strong> {edge}³ = {currentOrder.targetVolume} cm³. Contract specification satisfied!</span>
              ) : (
                <span>❌ {currentVolume < currentOrder.targetVolume ? 'Volume is too small!' : 'Volume is too large!'} Try another edge length. {currentOrder.hint}</span>
              )}
            </div>
          )}

          {/* Station Completion */}
          {allOrdersDone && (
            <div className="station-success anim-bounce-in">
              <div className="success-icon">🏆</div>
              <div className="success-text">
                <strong>All 3 Contracts Successfully Built!</strong><br />
                You mastered working forward and backward with cube volumes!
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
