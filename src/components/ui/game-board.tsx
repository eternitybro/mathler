import { Position } from '@/types/position';
import React from 'react';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  expressionLength: number;
  maxGuesses: number;
  getGuessState: (guess: string, index: number) => Position;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  currentGuess,
  expressionLength,
  maxGuesses,
  getGuessState
}) => {
  return (
    <div className="grid grid-rows-6 gap-1 mb-8">
      {Array.from({ length: maxGuesses }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-1">
          {Array.from({ length: expressionLength }).map((_, j) => {
            const isCurrentGuess = i === guesses.length;
            const char = isCurrentGuess ? currentGuess[j] : guesses[i]?.[j] || '';
            const state = !isCurrentGuess && guesses[i] ? getGuessState(guesses[i], j) : null;
            return (
              <div
                key={j}
                className={`w-14 h-14 flex items-center justify-center text-2xl font-bold border border-gray-300
                  ${state === 'correct' ? 'bg-[#6aaa64] text-white' :
                    state === 'present' ? 'bg-[#c9b458] text-white' :
                      state === 'absent' ? 'bg-[#787c7e] text-white' :
                        'bg-white text-black'}`}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};