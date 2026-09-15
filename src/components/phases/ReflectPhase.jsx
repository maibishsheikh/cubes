// src/components/phases/ReflectPhase.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ReflectPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { BADGES } from '../../utils/badgeEngine.js';
import { calcStars } from '../../utils/scoring.js';
import { useAudio } from '../../hooks/useAudio.js';
import { reflectNarration, reflectCompleteNarration } from '../../utils/narration.js';
import { generateSessionQuestions } from '../../utils/shuffle.js';
import questionBank from '../../data/questionBank.js';

const REFLECT_QUESTIONS = [
  {
    q: "1. If a cube has an edge length of 5 cm, how is its volume calculated?",
    options: [
      "Multiply edge × edge × edge = 5 × 5 × 5 = 125 cm³",
      "Multiply edge by 3 = 5 × 3 = 15 cm³",
      "Square the edge = 5 × 5 = 25 cm²",
    ],
    correct: 0,
  },
  {
    q: "2. If a cube's volume is 64 cm³, which mathematical operation reveals the length of one edge?",
    options: [
      "Cube root: ∛64 = 4 cm",
      "Square root: √64 = 8 cm",
      "Divide by 3: 64 ÷ 3 = 21.3 cm",
    ],
    correct: 0,
  },
  {
    q: "3. If one square face of a cube has an area of 36 cm², how do you find its volume?",
    options: [
      "Find edge using √36 = 6 cm, then cube it: 6³ = 216 cm³",
      "Cube the face area directly: 36³",
      "Divide by 6 then square it",
    ],
    correct: 0,
  },
];

export default function ReflectPhase({ state, dispatch }) {
  const [answers, setAnswers]     = useState({});
  const [journal, setJournal]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { narrate, stopAll, sounds } = useAudio(state?.audioEnabled ?? true);
  const narrated = useRef(false);

  const totalCorrect = state?.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  const totalStars   = state?.districtScores?.reduce((s, sc) => {
    if (sc === null || sc === undefined) return s;
    return s + calcStars(sc);
  }, 0) || 0;

  useEffect(() => {
    if (!narrated.current) {
      narrated.current = true;
      narrate(reflectNarration());
    }
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    return () => stopAll();
  }, [dispatch, narrate, stopAll]);

  function handleSelectOption(qIdx, optIdx) {
    sounds.click();
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    setSubmitted(true);
    stopAll();
    sounds.badge();
    narrate(reflectCompleteNarration());
  }

  function playAgain() {
    dispatch({ type: 'RESET_SESSION' });
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }

  const earnedBadges = BADGES.filter(b => state?.badges?.includes(b.id));

  if (submitted) {
    return (
      <div className="reflect-wrap">
        <div className="trophy-card glass-card anim-bounce-in">
          <div className="trophy-icon">🏆</div>
          <h1 className="trophy-title headline">You're a Cube Craft Co. Graduate!</h1>
          <p className="trophy-sub subheadline" style={{ color: 'var(--gold)' }}>
            Cube Volume, Face Area, Square Roots &amp; Cube Roots Mastery Complete ✅
          </p>

          {/* Stats Breakdown */}
          <div className="trophy-stats">
            <div className="trophy-stat">
              <span className="stat-value number-display">{totalCorrect}</span>
              <span className="stat-label label-text">/ 100 Questions</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state?.xp || 0}</span>
              <span className="stat-label label-text">XP Earned ⭐</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state?.maxStreak || 0}</span>
              <span className="stat-label label-text">Best Streak 🔥</span>
            </div>
          </div>

          {/* Stars */}
          <div className="trophy-stars">
            {[...Array(Math.min(Math.max(totalStars, 3), 30))].map((_, i) => (
              <span key={i} style={{ fontSize: '1.3rem', animationDelay: `${i * 0.05}s` }} className="anim-bounce-in">
                ⭐
              </span>
            ))}
          </div>

          {/* Badges */}
          {earnedBadges.length > 0 && (
            <div className="trophy-badges-section">
              <h3 className="subheadline" style={{ color: 'var(--gold-light)', marginBottom: '8px' }}>
                Workshop Badges Earned ({earnedBadges.length}/{BADGES.length})
              </h3>
              <div className="trophy-badges-grid">
                {earnedBadges.map((b) => (
                  <div key={b.id} className="earned-badge-chip">
                    <span className="earned-badge-icon">{b.emoji || b.icon}</span>
                    <span className="earned-badge-name label-text">{b.name || b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {journal && (
            <div className="trophy-journal-card">
              <h4 className="label-text" style={{ color: 'var(--purple-light)' }}>Your Workshop Takeaway:</h4>
              <p className="body-text" style={{ fontStyle: 'italic' }}>"{journal}"</p>
            </div>
          )}

          <div className="trophy-actions">
            <button className="btn btn-primary btn-lg" onClick={playAgain}>
              Start New Workshop Session 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reflect-wrap">
      <div className="reflect-container anim-slide-up">
        {/* Header */}
        <div className="reflect-header-card glass-card">
          <div className="reflect-header-badge">📓 Phase 05 · Reflection &amp; Scorecard</div>
          <h1 className="reflect-title headline">Review Your Cube Mastery!</h1>
          <p className="body-text reflect-subtitle">
            Answer the 3 concept checks and write down your key workshop discovery before collecting your trophy!
          </p>

          <div className="reflect-mascot-row">
            <Mascot mood="thinking" message="Think back to the workshop workbench: roots, face areas, and volumes!" size="sm" />
          </div>
        </div>

        {/* 3 Conceptual Review Questions */}
        <div className="reflect-questions-card glass-card">
          <h2 className="subheadline" style={{ color: 'var(--gold)' }}>Concept Verification Check</h2>
          {REFLECT_QUESTIONS.map((item, qIdx) => (
            <div key={qIdx} className="reflect-q-block">
              <p className="reflect-q-text body-text"><strong>{item.q}</strong></p>
              <div className="reflect-options-col">
                {item.options.map((opt, optIdx) => {
                  const isSelected = answers[qIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      className={`reflect-opt-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                    >
                      <span className="opt-check">{isSelected ? '✓' : '○'}</span>
                      <span className="opt-label">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Journal Prompt */}
        <div className="reflect-journal-card glass-card">
          <h2 className="subheadline" style={{ color: 'var(--purple-light)' }}>
            💡 Your Master Builder Takeaway
          </h2>
          <p className="body-text" style={{ color: 'var(--color-text-muted)' }}>
            What is the most important difference between using √ (square root) and ∛ (cube root) when working with a cube?
          </p>
          <textarea
            className="journal-textarea"
            rows="3"
            placeholder="e.g. Use √ on a square face area to get the edge; use ∛ on the 3D volume to get the edge..."
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="reflect-submit-row">
          <button
            className="btn btn-primary btn-lg reflect-submit-btn"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < REFLECT_QUESTIONS.length}
          >
            {Object.keys(answers).length < REFLECT_QUESTIONS.length
              ? `Answer All 3 Checks (${Object.keys(answers).length}/3)`
              : 'Claim Your Trophy & Graduate! 🏆'}
          </button>
        </div>
      </div>
    </div>
  );
}
