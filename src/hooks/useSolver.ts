import { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';
import { Position } from '@/types/position';

export type UseSolverProps = {
  targetNumber: number | null;
  solution: string | null;
  slots: number;
};

export const useSolver = ({ targetNumber, solution, slots }: UseSolverProps) => {
  const [initialized, setInitialized] = useState(false);

  const initialize = useCallback(() => {
    if (targetNumber !== null && solution !== null) {
      setInitialized(true);
    }
  }, [targetNumber, solution]);

  const checkGuess = useCallback((guess: string): Position[] => {
    if (!initialized || !solution) return Array(slots).fill('absent');

    const result: Position[] = Array(slots).fill('absent');
    const solutionChars = solution.split('');
    const guessChars = guess.split('');

    for (let i = 0; i < slots; i++) {
      if (guessChars[i] === solutionChars[i]) {
        result[i] = 'correct';
        solutionChars[i] = '';
        guessChars[i] = '';
      }
    }

    for (let i = 0; i < slots; i++) {
      if (guessChars[i] && solutionChars.includes(guessChars[i])) {
        result[i] = 'present';
        solutionChars[solutionChars.indexOf(guessChars[i])] = '';
      }
    }

    return result;
  }, [initialized, solution, slots]);

  const validateGuess = useCallback((guess: string): boolean => {
    if (!initialized || targetNumber === null) return false;
    try {
      return evaluate(guess) === targetNumber;
    } catch {
      return false;
    }
  }, [initialized, targetNumber]);

  return { initialize, checkGuess, validateGuess };
};