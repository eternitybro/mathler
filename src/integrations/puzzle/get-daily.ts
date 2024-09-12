import { getPuzzleForDate, savePuzzle, getAllPuzzles, deleteAllPuzzles } from './utils/puzzle-db';
import { generateValidEquation } from './utils/equation-generator';
import { PuzzleData, validatePuzzleData, validatePuzzleInput } from '@/types/puzzle';
import { DEFAULT_COLS } from '@/config';

export type GetDailyPuzzleParams = {
  slots?: number;
  forceRefresh?: boolean
};

export const getDailyPuzzle = async ({ slots = DEFAULT_COLS, forceRefresh }: GetDailyPuzzleParams): Promise<PuzzleData> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if(forceRefresh) await deleteAllPuzzles();
    let puzzle = await getPuzzleForDate(today);

    if (puzzle) {
      return validatePuzzleData({ result: puzzle.result, equation: puzzle.equation });
    } else {
      const allPuzzles = await getAllPuzzles();
      let newPuzzle: PuzzleData;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        const { equation, result } = generateValidEquation(slots);
        newPuzzle = validatePuzzleInput({ date: today, equation, result });
        attempts++;
      } while (
        allPuzzles.some(p => p.equation === newPuzzle.equation || p.result === newPuzzle.result) &&
        attempts < maxAttempts
      );

      if (attempts === maxAttempts) {
        throw new Error("Failed to generate a unique puzzle after maximum attempts");
      }

      puzzle = await savePuzzle(newPuzzle);

      return validatePuzzleData({ result: puzzle.result, equation: puzzle.equation });
    }
  } catch (error) {
    console.error('Error generating daily puzzle:', error);
    throw error;
  }
};