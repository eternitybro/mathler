import { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';
import { Position } from '@/types/position';

// 119 - 41
// 21 / 7 + 9
// 90 / 9 + 7
// 18 + 6 – 3
// 24 * 2 – 9
// 112 – 47
// 27 * 3 – 9
// 28 – 3 + 7
// 95 / 5 + 8
// 132 – 59


export const useSolver = (targetNumber: number | null, solution: string | null, length: number) => {
  const [initialized, setInitialized] = useState(false);

  const initialize = useCallback(() => {
    if (targetNumber !== null && solution !== null) {
      setInitialized(true);
    }
  }, [targetNumber, solution]);

  const checkGuess = useCallback((guess: string): Position[] => {
    if (!initialized || !solution) return Array(length).fill('absent');

    const result: Position[] = Array(length).fill('absent');
    const solutionChars = solution.split('');
    const guessChars = guess.split('');

    // Check for correct positions
    for (let i = 0; i < length; i++) {
      if (guessChars[i] === solutionChars[i]) {
        result[i] = 'correct';
        solutionChars[i] = '';
        guessChars[i] = '';
      }
    }

    // Check for present but misplaced characters
    for (let i = 0; i < length; i++) {
      if (guessChars[i] && solutionChars.includes(guessChars[i])) {
        result[i] = 'present';
        solutionChars[solutionChars.indexOf(guessChars[i])] = '';
      }
    }

    return result;
  }, [initialized, solution, length]);

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