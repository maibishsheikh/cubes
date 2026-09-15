// src/components/phases/WonderPhase.jsx
import React, { useEffect } from 'react';
import './WonderPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { wonderNarration } from '../../utils/narration.js';

const PARTICLES = ['🧊', '🎲', '🍬', '📦', '🐠', '🧱', '🧩', '🏆', '📐', '✨'];

export default function WonderPhase({ state, dispatch }) {
  const { narrate, stopAll } = useAudio(state?.audioEnabled ?? true);

  useEffect(() => {
    const segs = wonderNarration();
    narrate(segs);
    return () => stopAll();
  }, [narrate, stopAll]);

  function handleInvestigate() {
    stopAll();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    dispatch({ type: 'SET_PHASE', payload: 'story' });
  }

  return (
    <div className="wonder-wrap">
      {/* Floating particles */}
      <div className="wonder-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="wonder-particle"
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${5 + (i * 7.5) % 80}%`,
              animationDelay: `${i * 0.6}s`,
              fontSize: `${1.1 + (i % 3) * 0.4}rem`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="wonder-content anim-slide-up">
        {/* Main hook card */}
        <div className="wonder-card glass-card">
          <div className="wonder-stadium-icon" aria-hidden="true">🧊</div>
          <h1 className="wonder-title headline">The Cube Craft Mystery!</h1>

          <div className="wonder-number-display">
            <span className="number-display wonder-num">Volume = 216 cm³ ➔ Edge = ∛216 = ? cm</span>
          </div>

          <div className="wonder-question-card">
            <p className="body-text wonder-q">
              Bo's Cube Craft Co. just received a rush order for a batch of precision gaming dice…
            </p>
            <p className="body-text wonder-q">
              The client only specified the total space each die takes up: a <strong className="wonder-em">volume of 216 cm³</strong>.
              How do we figure out the <span className="wonder-highlight">exact length of one edge</span> to craft the dice?
            </p>
          </div>

          {/* Mascot */}
          <div className="wonder-mascot-row">
            <Mascot mood="curious" message="Let's enter the workshop and uncover the secret of square roots and cube roots!" size="sm" />
          </div>

          <button className="btn btn-primary btn-lg wonder-cta" onClick={handleInvestigate}>
            Enter Workshop 🛠️
          </button>
        </div>
      </div>
    </div>
  );
}
