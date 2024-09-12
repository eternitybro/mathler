'use client';

import React, { useState, useEffect } from 'react';
import { useSolver } from '../hooks/useSolver';
import { GameBoard } from './ui/game-board';
import { Keyboard } from './ui/keyboard';
import { Position } from '@/types/position';

const EXPRESSION_LENGTH = 6;
const MAX_GUESSES = 6;

interface MathlerGameProps {
  targetNumber: number;
  solution: string;
}

export const MathlerGame: React.FC<MathlerGameProps> = ({ targetNumber, solution }) => {
  const { initialize, checkGuess } = useSolver(targetNumber, solution, EXPRESSION_LENGTH);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [usedInputs, setUsedInputs] = useState<Record<string, Position>>({});

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleInputClick = (input: string) => {
    if (currentGuess.length < EXPRESSION_LENGTH && gameState === 'playing') {
      setCurrentGuess(prev => prev + input);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (currentGuess.length === EXPRESSION_LENGTH && guesses.length < MAX_GUESSES) {
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

  const getGuessState = (guess: string, index: number): Position => {
    if (!guess) return 'absent';
    return checkGuess(guess)[index];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold mb-2">Mathler</h1>
      <p className="mb-8">Find the hidden calculation that equals <span className='font-bold'>{targetNumber}</span></p>
      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        expressionLength={EXPRESSION_LENGTH}
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
        <div className="text-2xl font-bold mt-4">
          {gameState === 'won' ? 'Congratulations! You won!' : 'Game Over. Try again!'}
        </div>
      )}
    </div>

  );
};