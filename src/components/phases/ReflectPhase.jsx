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
    stepTitle: "Check 1 · Cube Volume (e³)",
    shortLabel: "1. Volume (e³)",
    icon: "🧊",
    q: "If a cube has an edge length of 5 cm, how is its volume calculated?",
    concept: "Volume Formula",
    options: [
      { text: "Multiply edge × edge × edge = 5 × 5 × 5 = 125 cm³", isCorrect: true },
      { text: "Multiply edge by 3 = 5 × 3 = 15 cm³", isCorrect: false },
      { text: "Square the edge = 5 × 5 = 25 cm²", isCorrect: false },
    ],
    correct: 0,
    hint: "Volume measures 3D space: length × width × height!",
  },
  {
    stepTitle: "Check 2 · Cube Root (∛)",
    shortLabel: "2. Cube Root (∛)",
    icon: "∛",
    q: "If a cube's volume is 64 cm³, which mathematical operation reveals the length of one edge?",
    concept: "Unknown Edge from Volume",
    options: [
      { text: "Cube root: ∛64 = 4 cm (since 4 × 4 × 4 = 64)", isCorrect: true },
      { text: "Square root: √64 = 8 cm", isCorrect: false },
      { text: "Divide by 3: 64 ÷ 3 = 21.3 cm", isCorrect: false },
    ],
    correct: 0,
    hint: "Cube root ∛ reverses edge × edge × edge!",
  },
  {
    stepTitle: "Check 3 · Face Area & Volume (√ & e³)",
    shortLabel: "3. Face Area (√)",
    icon: "📐",
    q: "If one square face of a cube has an area of 36 cm², how do you find its volume?",
    concept: "2-Step Multistep Rule",
    options: [
      { text: "Find edge using √36 = 6 cm, then cube it: 6³ = 216 cm³", isCorrect: true },
      { text: "Cube the face area directly: 36³", isCorrect: false },
      { text: "Divide 36 by 6 then square it", isCorrect: false },
    ],
    correct: 0,
    hint: "First find the edge from 1 face with √, then calculate the 3D volume!",
  },
];

const JOURNAL_QUICK_CHIPS = [
  "Use √ on square face area to find the edge",
  "Use ∛ on 3D volume to find the edge",
  "Volume of a cube is edge × edge × edge (e³)",
  "1 Litre = 1,000 cm³ in liquid cube tanks",
];

export default function ReflectPhase({ state, dispatch }) {
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2 for checks; 3 for journal
  const [viewMode, setViewMode]     = useState('stepper'); // 'stepper' or 'all'
  const [answers, setAnswers]       = useState({});
  const [journal, setJournal]       = useState('');
  const [submitted, setSubmitted]   = useState(false);
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

  function handleQuickChip(chipText) {
    sounds.click();
    setJournal(prev => {
      if (!prev.trim()) return chipText;
      if (prev.includes(chipText)) return prev;
      return `${prev.trim()}; ${chipText}`;
    });
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

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === REFLECT_QUESTIONS.length;
  const earnedBadges = BADGES.filter(b => state?.badges?.includes(b.id));

  // Graduate Trophy Screen
  if (submitted) {
    return (
      <div className="reflect-wrap">
        <div className="trophy-card glass-card anim-bounce-in">
          <div className="trophy-icon">🏆</div>
          <h1 className="trophy-title headline">You're a Cube Craft Co. Graduate!</h1>
          <p className="trophy-sub subheadline">
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

          {/* Stars Display */}
          <div className="trophy-stars">
            {[...Array(Math.min(Math.max(totalStars, 3), 30))].map((_, i) => (
              <span key={i} style={{ fontSize: '1.3rem', animationDelay: `${i * 0.05}s` }} className="anim-bounce-in">
                ⭐
              </span>
            ))}
          </div>

          {/* Badges Section */}
          {earnedBadges.length > 0 && (
            <div className="trophy-badges-section">
              <h3 className="trophy-badges-title">
                Workshop Badges Earned ({earnedBadges.length}/{BADGES.length})
              </h3>
              <div className="trophy-badges-grid">
                {earnedBadges.map((b) => (
                  <div key={b.id} className="earned-badge-chip">
                    <span className="earned-badge-icon">{b.emoji || b.icon}</span>
                    <span className="earned-badge-name">{b.name || b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Journal Takeaway */}
          {journal && (
            <div className="trophy-journal-card">
              <h4 className="trophy-journal-label">Your Workshop Discovery:</h4>
              <p className="trophy-journal-quote">"{journal}"</p>
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
        {/* Compact Header */}
        <div className="reflect-header-card glass-card">
          <div className="reflect-header-top">
            <span className="reflect-header-badge">📓 Phase 05 · Review &amp; Certification</span>
            <div className="reflect-view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === 'stepper' ? 'active' : ''}`}
                onClick={() => setViewMode('stepper')}
                title="Focus on one check at a time"
              >
                Step-by-Step
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
                onClick={() => setViewMode('all')}
                title="View all cards together"
              >
                All Checks
              </button>
            </div>
          </div>

          <h1 className="reflect-title">Review Your Cube Mastery!</h1>
          <p className="reflect-subtitle">
            Verify the 3 core mathematical rules of cube craft before claiming your official graduate scorecard!
          </p>

          <div className="reflect-mascot-row">
            <Mascot mood="thinking" message="Roots, face areas, and 3D volumes — you've mastered them all!" size="sm" />
          </div>
        </div>

        {/* Stepper Navigation Bar */}
        <div className="reflect-stepper-nav" role="tablist">
          {REFLECT_QUESTIONS.map((item, idx) => {
            const isAnswered = answers[idx] !== undefined;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                role="tab"
                aria-selected={isActive}
                className={`stepper-tab ${isActive ? 'active' : ''} ${isAnswered ? 'done' : ''}`}
                onClick={() => {
                  sounds.click();
                  setActiveStep(idx);
                  setViewMode('stepper');
                }}
              >
                <span className="tab-badge">{isAnswered ? '✓' : item.icon}</span>
                <span className="tab-text">{item.shortLabel}</span>
              </button>
            );
          })}

          {/* Journal Step Tab */}
          <button
            role="tab"
            aria-selected={activeStep === 3}
            className={`stepper-tab ${activeStep === 3 ? 'active' : ''} ${journal.trim() ? 'done' : ''}`}
            onClick={() => {
              sounds.click();
              setActiveStep(3);
              setViewMode('stepper');
            }}
          >
            <span className="tab-badge">{journal.trim() ? '✓' : '💡'}</span>
            <span className="tab-text">4. Journal Takeaway</span>
          </button>
        </div>

        {/* STEP-BY-STEP VIEW MODE */}
        {viewMode === 'stepper' && (
          <div className="reflect-step-content">
            {activeStep < 3 ? (
              /* Single Question Frame */
              <div className="reflect-step-card glass-card anim-slide-up" key={activeStep}>
                <div className="step-card-header">
                  <div className="step-badge-tag">
                    <span>{REFLECT_QUESTIONS[activeStep].icon}</span>
                    <span>{REFLECT_QUESTIONS[activeStep].stepTitle}</span>
                  </div>
                  <span className="step-progress-indicator">
                    Question {activeStep + 1} of 3 {answers[activeStep] !== undefined ? '✅' : '⏳'}
                  </span>
                </div>

                <h3 className="reflect-step-question">
                  {REFLECT_QUESTIONS[activeStep].q}
                </h3>

                <p className="reflect-step-hint">
                  💡 <strong>Concept Rule:</strong> {REFLECT_QUESTIONS[activeStep].hint}
                </p>

                <div className="reflect-options-col">
                  {REFLECT_QUESTIONS[activeStep].options.map((opt, optIdx) => {
                    const isSelected = answers[activeStep] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        className={`reflect-opt-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectOption(activeStep, optIdx)}
                      >
                        <span className="opt-check">{isSelected ? '✓' : '○'}</span>
                        <span className="opt-label">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Step Card Navigation */}
                <div className="step-nav-footer">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                  >
                    ← Previous Check
                  </button>

                  <div className="step-dots">
                    {[0, 1, 2, 3].map(d => (
                      <span
                        key={d}
                        className={`step-dot ${activeStep === d ? 'active' : ''} ${d < 3 ? (answers[d] !== undefined ? 'done' : '') : (journal.trim() ? 'done' : '')}`}
                      />
                    ))}
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
                  >
                    {activeStep < 2 ? "Next Check →" : "Go to Journal →"}
                  </button>
                </div>
              </div>
            ) : (
              /* Step 4: Reflection Journal Card */
              <div className="reflect-step-card glass-card anim-slide-up" key="journal">
                <div className="step-card-header">
                  <div className="step-badge-tag journal-tag">
                    <span>💡</span>
                    <span>Master Builder Learning Discovery</span>
                  </div>
                  <span className="step-progress-indicator">Final Graduation Step 🎓</span>
                </div>

                <h3 className="reflect-step-question">
                  What is the key difference between using √ (square root) and ∛ (cube root) when working with a cube?
                </h3>

                {/* Quick-Insert Chips */}
                <div className="journal-chips-container">
                  <span className="chips-label">👉 Quick Takeaway Prompts (tap to insert):</span>
                  <div className="journal-chips-row">
                    {JOURNAL_QUICK_CHIPS.map((chip, idx) => (
                      <button
                        key={idx}
                        className="quick-chip-btn"
                        onClick={() => handleQuickChip(chip)}
                        type="button"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  className="journal-textarea"
                  rows="3"
                  placeholder="Type your personal workshop takeaway, or tap the prompt chips above..."
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                />

                <div className="step-nav-footer">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveStep(2)}
                  >
                    ← Review Check 3
                  </button>

                  <button
                    className="btn btn-primary btn-md reflect-submit-btn"
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                  >
                    {allAnswered
                      ? 'Claim Your Trophy & Graduate! 🏆'
                      : `Answer All 3 Checks (${answeredCount}/3)`}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ALL-IN-ONE VIEW MODE (Clean, Bounded, Ordered) */}
        {viewMode === 'all' && (
          <div className="reflect-all-content anim-slide-up">
            {/* 3 Questions */}
            <div className="reflect-questions-card glass-card">
              <h2 className="all-card-title">Concept Verification Checks (3/3)</h2>
              {REFLECT_QUESTIONS.map((item, qIdx) => (
                <div key={qIdx} className="reflect-q-block">
                  <div className="reflect-q-header">
                    <span className="q-badge">{item.icon} Check {qIdx + 1}</span>
                    <p className="reflect-q-text"><strong>{item.q}</strong></p>
                  </div>
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
                          <span className="opt-label">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Journal Card */}
            <div className="reflect-journal-card glass-card">
              <h2 className="all-card-title">💡 Your Master Builder Takeaway</h2>
              <p className="body-text" style={{ color: 'var(--color-text-muted)' }}>
                What is the most important difference between using √ (square root) and ∛ (cube root) when working with a cube?
              </p>

              <div className="journal-chips-row">
                {JOURNAL_QUICK_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    className="quick-chip-btn"
                    onClick={() => handleQuickChip(chip)}
                    type="button"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              <textarea
                className="journal-textarea"
                rows="3"
                placeholder="Type your takeaway or tap the prompt chips above..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
              />

              <div className="reflect-submit-row">
                <button
                  className="btn btn-primary btn-lg reflect-submit-btn"
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                >
                  {allAnswered
                    ? 'Claim Your Trophy & Graduate! 🏆'
                    : `Answer All 3 Checks (${answeredCount}/3)`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
