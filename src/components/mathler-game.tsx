'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSolver } from '../hooks/useSolver';
import { GameBoard } from './ui/game-board';
import { Keyboard } from './ui/keyboard';
import { Position } from '@/types/position';
import { DEFAULT_COLS, DEFAULT_ROWS } from '@/config';
import FinalScreen from './final-screen';
import { generateShareString } from '@/lib/utils';

const MAX_GUESSES = DEFAULT_ROWS;

interface MathlerGameProps {
  targetNumber: number;
  solution: string;
  slots?: number
}

export const MathlerGame: React.FC<MathlerGameProps> = ({ targetNumber, solution, slots = DEFAULT_COLS }) => {
  const { initialize, checkGuess } = useSolver({ targetNumber, solution, slots });
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [usedInputs, setUsedInputs] = useState<Record<string, Position>>({});
  const [shareString, setShareString] = useState('')


  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleInputClick = (input: string) => {
    if (currentGuess.length < slots && gameState === 'playing') {
      setCurrentGuess(prev => prev + input);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (currentGuess.length === slots && guesses.length < MAX_GUESSES) {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      const guessResult = checkGuess(currentGuess);
      updateUsedInputs(currentGuess, guessResult);

      if (guessResult.every(pos => pos === 'correct')) {
        setGameState('won');
      } else if (newGuesses.length === MAX_GUESSES) {
        setGameState('lost');
      }

      setCurrentGuess('');
    }
  };

  const updateUsedInputs = (guess: string, result: Position[]) => {
    const newUsedInputs = { ...usedInputs };
    guess.split('').forEach((input, index) => {
      if (result[index] === 'correct') {
        newUsedInputs[input] = 'correct';
      } else if (result[index] === 'present' && newUsedInputs[input] !== 'correct') {
        newUsedInputs[input] = 'present';
      } else if (result[index] === 'absent' && !newUsedInputs[input]) {
        newUsedInputs[input] = 'absent';
      }
    });
    setUsedInputs(newUsedInputs);
  };

  const getGuessState = useCallback((guess: string, index: number): Position => {
    if (!guess) return 'absent';
    return checkGuess(guess)[index];
  }, [checkGuess]);

  useEffect(() => {
    setShareString(generateShareString(guesses, getGuessState, MAX_GUESSES, slots))
  }, [slots, guesses, getGuessState, shareString])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold mb-2">Mathler</h1>
      <p className="mb-8">Find the hidden calculation that equals <span className='font-bold'>{targetNumber}</span></p>
      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        slots={slots}
        maxGuesses={MAX_GUESSES}
        getGuessState={getGuessState}
      />
      <Keyboard
        onInputClick={handleInputClick}
        onDelete={handleDelete}
        onEnter={handleEnter}
        usedInputs={usedInputs}
      />

      {gameState !== 'playing' && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
          <FinalScreen
            won={gameState === 'won'}
            guesses={guesses}
            solution={solution}
            onClose={() => {
              setGameState('playing');
              setGuesses([]);
              setCurrentGuess('');
              setUsedInputs({});
            }}
            onShare={() => {
              navigator.clipboard.writeText(shareString)
                .then(() => alert('Result copied to clipboard!'))
                .catch(err => console.error('Failed to copy: ', err));
            }}
            onKeepPlaying={() => {
              setGameState('playing');
              setGuesses([]);
              setCurrentGuess('');
              setUsedInputs({});
            }}
          />
        </div>
      )}
    </div>

  );
};