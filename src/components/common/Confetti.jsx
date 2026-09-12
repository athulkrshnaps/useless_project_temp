import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useElephantFit } from '../../context/ElephantFitContext';

export default function Confetti() {
  const { confettiTrigger } = useElephantFit();

  useEffect(() => {
    if (confettiTrigger > 0) {
      // Launch celebratory particle cascade
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#2c7353', '#eab308', '#d97706', '#f43f5e']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#3d906a', '#fbbf24', '#ffffff']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [confettiTrigger]);

  return null;
}
