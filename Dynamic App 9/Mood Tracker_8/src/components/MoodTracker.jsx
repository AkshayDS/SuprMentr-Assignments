import { useState, useEffect } from 'react';
import { Smile, Frown, Flame, Rocket, Coffee, Wind, Meh } from 'lucide-react';

const MOODS = [
  { id: 'neutral', label: 'Neutral', icon: Meh, quote: "A blank canvas. What will you create today?" },
  { id: 'happy', label: 'Happy', icon: Smile, quote: "Happiness is not by chance, but by choice." },
  { id: 'sad', label: 'Sad', icon: Frown, quote: "Every cloud has a silver lining. Take your time." },
  { id: 'angry', label: 'Angry', icon: Flame, quote: "Take a deep breath. Focus on what you can control." },
  { id: 'excited', label: 'Excited', icon: Rocket, quote: "The best is yet to come. Keep up the energy!" },
  { id: 'relaxed', label: 'Relaxed', icon: Coffee, quote: "Peace comes from within. Enjoy the calm." },
  { id: 'anxious', label: 'Anxious', icon: Wind, quote: "One step at a time. This feeling will pass." }
];

export default function MoodTracker() {
  const [currentMood, setCurrentMood] = useState(MOODS[0]);

  useEffect(() => {
    // Update body class based on mood for global background change
    document.body.className = `mood-${currentMood.id} mood-app`;
  }, [currentMood]);

  const CurrentIcon = currentMood.icon;

  return (
    <div className="tracker-container">
      <div className="header">
        <h1>How are you feeling?</h1>
        <p>Select your current mood below</p>
      </div>

      <div className="active-mood-display">
        <div className="mood-icon-wrapper" aria-hidden="true">
          <CurrentIcon size={48} strokeWidth={1.5} />
        </div>
        <p className="mood-quote">"{currentMood.quote}"</p>
      </div>

      <div className="mood-grid">
        {MOODS.map((mood) => {
          const Icon = mood.icon;
          const isActive = currentMood.id === mood.id;
          return (
            <button
              key={mood.id}
              className={`mood-btn ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentMood(mood)}
              aria-label={`Select mood: ${mood.label}`}
              aria-pressed={isActive}
            >
              <Icon size={24} aria-hidden="true" />
              <span>{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
