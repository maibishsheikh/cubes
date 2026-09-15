// src/components/shared/Mascot.jsx
import React from 'react';
import './Mascot.css';
import { MASCOT } from '../../config/characters.config.js';

export default function Mascot({ mood = 'curious', message, size = 'md', customEmoji }) {
  const defaultEmoji = MASCOT?.emoji || '🦫';
  const emoji = customEmoji || (mood === 'celebrate' ? '🦫' : mood === 'thinking' ? '🦫' : defaultEmoji);

  return (
    <div className={`mascot-row-wrap mascot-${size}`}>
      <div className={`mascot-avatar-circle mood-${mood}`} title={MASCOT?.name || 'Bo the Beaver'}>
        <span className="mascot-avatar-emoji">{emoji}</span>
      </div>
      {message && (
        <div className="mascot-speech-bubble anim-fade-in">
          <span className="speech-text">{message}</span>
        </div>
      )}
    </div>
  );
}
