// src/components/IntroScreen.jsx
import React from 'react';
import './IntroScreen.css';
import { generateSessionQuestions } from '../utils/shuffle.js';
import questionBank from '../data/questionBank.js';

const JOURNEY = [
  { num: '01', icon: '🔍', label: 'Wonder',   desc: 'The Dice Mystery' },
  { num: '02', icon: '📖', label: 'Story',    desc: "Dev & Xin Yi's Workshop" },
  { num: '03', icon: '🧪', label: 'Simulate', desc: '4 Interactive Labs' },
  { num: '04', icon: '🎮', label: 'Practice', desc: '10 Worlds & Bosses' },
  { num: '05', icon: '📓', label: 'Reflect',  desc: 'Recap & Scorecard' },
];

export default function IntroScreen({ state, dispatch }) {
  const hasSaved = state?.phaseComplete && Object.values(state.phaseComplete).some(Boolean);

  function startFresh() {
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'wonder' });
  }

  function resumeSession() {
    dispatch({ type: 'SET_PHASE', payload: state.savedPhase || 'wonder' });
  }

  return (
    <div className="intro-wrap">
      {/* Top Badge */}
      <div className="intro-top-badge">
        📐 Singapore MOE Aligned · Primary 6 Mathematics · Volume of Cubes
      </div>

      {/* Main Title & Subtitle */}
      <div className="intro-title-group">
        <h1 className="intro-title">
          <span className="text-orange">Cube</span> <span className="text-white">Quest</span>
        </h1>
        <h2 className="intro-subtitle">Volume, Face Area, Square Roots &amp; Cube Roots</h2>
      </div>

      {/* Mascot Row */}
      <div className="intro-mascot-row">
        <div className="intro-mascot-circle">🦫</div>
        <div className="intro-speech-bubble">
          Hi! I'm Bo the Beaver. Welcome to Cube Craft Co.! Ready to build, fold, pack, and calculate cube volumes and roots? 🧊📦
        </div>
      </div>

      {/* Short Description */}
      <p className="intro-desc">
        Master finding the volume of a cube (edge³), uncovering unknown edges with cube roots (∛) and square roots (√), liquid tank capacities, and 3D stacking!
      </p>

      {/* Single-Row 5-Phase Journey Card */}
      <div className="journey-card">
        <div className="journey-card-title">YOUR 5-PHASE LEARNING JOURNEY · CLICK ANY PHASE TO START</div>
        <div className="journey-row-single">
          {JOURNEY.map((j, i) => (
            <React.Fragment key={j.num}>
              <div
                className="journey-step-item clickable-step"
                onClick={() => dispatch({ type: 'SET_PHASE', payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase() })}
                role="button"
                tabIndex={0}
                title={`Click to open ${j.label} phase`}
              >
                <span className="journey-icon-circle">{j.icon}</span>
                <div className="journey-text-col">
                  <span className="journey-item-title">{j.num}. {j.label}</span>
                  <span className="journey-item-desc">{j.desc}</span>
                </div>
              </div>
              {i < JOURNEY.length - 1 && <span className="journey-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="intro-ctas">
        <button className="btn btn-primary btn-lg intro-cta-main" onClick={startFresh}>
          🚀 Enter Cube Craft Co.!
        </button>
        {hasSaved && (
          <button className="btn btn-outline btn-sm" onClick={resumeSession}>
            ↩ Resume Session
          </button>
        )}
      </div>

      {/* Bottom Cards */}
      <div className="intro-bottom-cards">
        <div className="bottom-card">
          <span className="bottom-card-icon">🎯</span>
          <span>100 Quests Across 10 Worlds</span>
        </div>
        <div className="bottom-card">
          <span className="bottom-card-icon">🧊</span>
          <span>Volume &amp; Roots (√ &amp; ∛)</span>
        </div>
        <div className="bottom-card">
          <span className="bottom-card-icon">🏆</span>
          <span>8 Mastery Badges &amp; Contracts</span>
        </div>
      </div>
    </div>
  );
}
